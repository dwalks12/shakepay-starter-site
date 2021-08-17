import React, { useEffect, useMemo, useState } from "react"
import styles from '../styles/Home.module.scss';
import Charts from "../components/Charts";
import { useAppDispatch } from "../store";
import { fetchActualBTCRates, fetchActualETHRates, fetchShakepayRates, fetchTransactionHistory } from "../store/NetWorth/actions";
import { useSelector } from "react-redux";
import { selectCurrentNetWorth, selectIsLoading, selectRates, selectTransactionHistory } from "../store/NetWorth/selectors";
import Loading from "../components/Loading";

const IndexPage = () => {
  const dispatch = useAppDispatch();
  const isLoading = useSelector((state) => selectIsLoading(state));
  const [loading, setLoading] = useState(false);
  const transactionHistory = useSelector((state) => selectTransactionHistory(state));
  const rates = useSelector((state) => selectRates(state));
  const currentNetWorth = useSelector((state) => selectCurrentNetWorth(state));
  
  useEffect(() => {
    // Calculate current net worth
    if (rates && transactionHistory) {
      setLoading(false);
      // const currentNetWorth = CAD_NetWorth()
    }
  }, [rates, transactionHistory])

  useEffect(() => {
    // FETCH Info
    setLoading(true);
    dispatch(fetchShakepayRates());
    dispatch(fetchTransactionHistory());
    dispatch(fetchActualETHRates());
    dispatch(fetchActualBTCRates());
  }, [])

  return (
    <main className={styles.homePageContainer}>
      <h1>Shakepay NetWorth UI</h1>
      <p><strong>Current Net Worth: </strong> <span className={styles.currency}>${currentNetWorth ? currentNetWorth.toFixed(2) : 0}</span></p>
      <div className={styles.graphContainer}>
        <Charts />
      </div>
      <div className={styles.graphContainer}>
        <Charts realTimeData />
      </div>
      {(isLoading || loading) && (<Loading />)}
    </main>
  )
}

export default IndexPage
