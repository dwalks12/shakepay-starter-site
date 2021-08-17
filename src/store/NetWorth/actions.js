import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const TransactionHistoryEndpoint = 'https://shakepay.github.io/programming-exercise/web/transaction_history.json';
const ShakepayRatesEndpoint = 'https://api.shakepay.co/rates';

export const fetchTransactionHistory = createAsyncThunk(
  'netWorth/fetchTransactionHistory',
  async () => {
    const response = await axios.get(TransactionHistoryEndpoint)
    return response.data;
  }
)

/// For now just use const
// BTC_CAD_rate
// ETH_CAD_rate

export const fetchShakepayRates = createAsyncThunk(
  'netWorth/fetchShakepayRates',
  async () => {
    // CORS ERROR With endpoint so use const for now
    // const response = await axios.get(ShakepayRatesEndpoint)
    // return response.data;
    return {
      BTC_CAD: 58154.55,
      CAD_BTC: 0.00001719,
      CAD_ETH: 0.000251610837114408,
      ETH_CAD: 3974.39,
      USD_BTC: 0.00002165,
      BTC_USD: 46180.61,
      USD_ETH: 0.000316846741231266,
      ETH_USD: 3156.1,
      BTC_ETH: 14.63271875914545,
      ETH_BTC: 0.06834,
      CAD_USD: 0.79,
      USD_CAD: 1.25,
    }
  }
)

export const fetchActualBTCRates = createAsyncThunk(
  'netWorth/fetchActualBTCRates',
  async () => {
    const response = await axios.get(`https://shakepay.github.io/programming-exercise/web/rates_CAD_BTC.json`);
    return response.data;
  }
)

export const fetchActualETHRates = createAsyncThunk(
  'netWorth/fetchActualETHRates',
  async () => {
    const response = await axios.get(`https://shakepay.github.io/programming-exercise/web/rates_CAD_ETH.json`);
    return response.data;
  }
)