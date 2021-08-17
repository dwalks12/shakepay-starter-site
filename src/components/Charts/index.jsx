import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { format, isSameDay } from 'date-fns';
import { useSelector } from 'react-redux';
import { selectRates, selectTransactionHistory } from '../../store/NetWorth/selectors';
import styles from './Chart.module.scss';
import { CAD_NetWorth } from '../../helpers/helpers';
import { useAppDispatch } from '../../store';
import { setCurrentNetWorth } from '../../store/NetWorth/reducer';

const testOptions = {
  maintainAspectRatio: true,
  legend: {
    display: false,
  },
  showLines: false,
  tooltips: {
    backgroundColor: '#f5f5f5',
    titleFontColor: '#333',
    bodyFontColor: '#666',
    bodySpacing: 4,
    xPadding: 12,
    mode: 'nearest',
    intersect: 0,
    position: 'nearest',
  },
  responsive: true,
  scales: {
    yAxes: [{
      barPercentage: 1.6,
      gridLines: {
        drawBorder: false,
        color: 'rgba(29,140,248,0.0)',
        zeroLineColor: 'transparent',
      },
      ticks: {
        min: 0,
        precision: 1,
        padding: 20,
        fontColor: '#9a9a9a',
      },
    }],

    xAxes: [{
      barPercentage: 1.6,
      gridLines: {
        drawBorder: false,
        color: 'rgba(225,78,202,0.1)',
        zeroLineColor: 'transparent',
      },
      ticks: {
        padding: 20,
        fontColor: '#9a9a9a',
      },
    }],
  },
};

const lineOptions = {
  scales: {
    xAxes: [
      {
        type: 'time',
        time: {
          unit: 'day',
          tooltipFormat: 'lll',
        },
        ticks: {
          maxTicksLimit: 12,
        },
      },
    ],
    yAxes: [
      {
        stacked: true,
        gridLines: {
          display: false,
        },
        ticks: {
          suggestedMin: 100,
          suggestedMax: 0,
        },
      },
    ],
  },
  legend: {
    display: false,
  },
  tooltips: {
    enabled: true,
  },
};

const Charts = () => {
  const dispatch = useAppDispatch();
  const transactionHistory = useSelector((state) => selectTransactionHistory(state));
  const rates = useSelector((state) => selectRates(state));
  const [data, setData] = useState({});

  useEffect(() => {
    if (transactionHistory && rates) {
      // Starting from the very beginning. Calculate net worth
      let lastCADAmount = 0;
      let lastBTCAmount = 0;
      let lastETHAmount = 0;
      let netWorthData = [];
      // In order to reverse need a mutable copy
      const transactionHistoryCopy = [...transactionHistory]
      // Reverse data to start from beginning
      const reversedArray = transactionHistoryCopy.reverse();
      reversedArray.forEach((data) => {
        if (!data.direction && data.type === "conversion") {
          // CONVERSION
          switch (data.from.currency) {
            case "CAD":
              lastCADAmount -= data.from.amount;
              break;
            case "BTC":
              lastBTCAmount -= data.from.amount;
              break;
            default:
              lastETHAmount -= data.from.amount;
              break;
          }
          switch (data.to.currency) {
            case "CAD":
              lastCADAmount += data.to.amount;
              break;
            case "BTC":
              lastBTCAmount += data.to.amount;
              break;
            default:
              lastETHAmount += data.to.amount;
              break;
          }

          // Net worth = CAD_balance + (BTC_balance * BTC_CAD_rate) + (ETH_balance * ETH_CAD_rate)
          const dataValuePoint = {
            actualDate: new Date(data.createdAt),
            createdAt: format(new Date(data.createdAt), 'MMM dd, yyyy'),
            netWorth: CAD_NetWorth(lastCADAmount, lastBTCAmount, rates.BTC_CAD, lastETHAmount, rates.ETH_CAD),
          }
          netWorthData.push(dataValuePoint);
          // netWorthData = netWorthData.filter((data) => !isSameDay(data.actualDate, new Date(data.createdAt)));

        } else if (data.direction === "credit") {
          // ADD
          switch (data.currency) {
            case "CAD":
              lastCADAmount += data.amount;
              break;
            case "BTC":
              lastBTCAmount += data.amount;
              break;
            default:
              lastETHAmount += data.amount;
              break;
          }

          // Net worth = CAD_balance + (BTC_balance * BTC_CAD_rate) + (ETH_balance * ETH_CAD_rate)
          const dataValuePoint = {
            actualDate: new Date(data.createdAt),
            createdAt: format(new Date(data.createdAt), 'MMM dd, yyyy'),
            netWorth: CAD_NetWorth(lastCADAmount, lastBTCAmount, rates.BTC_CAD, lastETHAmount, rates.ETH_CAD),
          }

          netWorthData.push(dataValuePoint);
          // netWorthData = netWorthData.filter((data) => !isSameDay(data.actualDate, new Date(data.createdAt)));

        } else if (data.direction === "debit") {
          // SUBTRACT
          switch (data.currency) {
            case "CAD":
              lastCADAmount -= data.amount;
              break;
            case "BTC":
              lastBTCAmount -= data.amount;
              break;
            default:
              lastETHAmount -= data.amount;
              break;
          }
          // Net worth = CAD_balance + (BTC_balance * BTC_CAD_rate) + (ETH_balance * ETH_CAD_rate)
          const dataValuePoint = {
            actualDate: new Date(data.createdAt),
            createdAt: format(new Date(data.createdAt), 'MMM dd, yyyy'),
            netWorth: CAD_NetWorth(lastCADAmount, lastBTCAmount, rates.BTC_CAD, lastETHAmount, rates.ETH_CAD),
          }
          netWorthData.push(dataValuePoint);
        }
      });

      const netWorthTransactionHistory = [...netWorthData]
      
      
      // Convert to data
      const labels = netWorthTransactionHistory.map((val) => val.createdAt)
      // Handle Net worth calc here
      const data = netWorthTransactionHistory.map((val) => val.netWorth);

      const newData = {
        labels: labels,
        datasets: [
          {
            showLines: false,
            label: 'Net Worth Per Day',
            fill: false,
            lineTension: 0.4,
            borderColor: '#00d6b4',
            borderCapStyle: 'butt',
            borderWidth: 2,
            borderDash: [],
            borderDashOffset: 0.0,
            pointBorderColor: 'rgba(255, 255, 255, 0)',
            pointBackgroundColor: '#00d6b4',
            pointBorderWidth: 2,
            pointHoverRadius: 4,
            pointHoverBackgroundColor: '#00d6b4',
            pointHoverBorderColor: 'rgba(255, 255, 255, 0)',
            pointHoverBorderWidth: 15,
            pointRadius: 4,
            pointHitRadius: 10,
            data: data,
          }
        ]
      }
      setData(newData);
      dispatch(setCurrentNetWorth(data[data.length - 1]))
    }
  }, [transactionHistory, rates])

  return (
    <div className={styles.chartContainer}>
      <h3>Net Worth</h3>
      <Line id="netWorthChart" data={data} options={testOptions} />
    </div>
  )
}

export default Charts;