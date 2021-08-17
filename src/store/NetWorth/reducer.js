import { createSlice } from '@reduxjs/toolkit';
import { fetchShakepayRates, fetchTransactionHistory } from './actions';

/*
SAMPLE TRANSACTION HISTORY
[
        {
            "createdAt": "2020-04-20T15:49:57.741Z",
            "amount": 100,
            "currency": "CAD",
            "type": "external account",
            "direction": "credit",
            "from": {
            }
        },
        {
            "createdAt": "2020-04-09T18:31:25.776Z",
            "amount": 495,
            "currency": "CAD",
            "type": "external account",
            "direction": "credit",
            "from": {
            }
        },
      ]

SAMPLE RATES:
  {"CAD_BTC":0.0000173,"BTC_CAD":57781.52,"CAD_ETH":0.000252762640059123,"ETH_CAD":3956.28,"USD_BTC":0.00002177,"BTC_USD":45921.91,"USD_ETH":0.000318036316566988,"ETH_USD":3144.29,"BTC_ETH":14.604936468526361,"ETH_BTC":0.06847,"CAD_USD":0.79,"USD_CAD":1.25}
*/


const initialState = {
  rates: null,
  transactionHistory: null,
  loading: false,
  hasErrors: false,
  currentNetWorth: 0,
}

const netWorthSlice = createSlice({
  name: 'netWorth',
  initialState: initialState,
  reducers: {
    setCurrentNetWorth(state, { payload }) {
      state.currentNetWorth = payload;
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchTransactionHistory.pending, state => {
      state.loading = true;
    });
    builder.addCase(fetchTransactionHistory.fulfilled, (state, { payload }) => {
      state.transactionHistory = payload;
      state.loading = false;
      state.hasErrors = false;
    });
    builder.addCase(fetchTransactionHistory.rejected, (state) => {
      state.loading = false;
      // TODO: add better error handling if time.
      state.hasErrors = true;
    });
    builder.addCase(fetchShakepayRates.pending, state => {
      state.loading = true;
    });
    builder.addCase(fetchShakepayRates.fulfilled, (state, { payload }) => {
      state.rates = payload;
      state.loading = false;
      state.hasErrors = false;
    });
    builder.addCase(fetchShakepayRates.rejected, (state) => {
      state.hasErrors = true;
      // TODO: add better error handling if time.
      state.loading = false;
    });
  }
})

export const { setCurrentNetWorth } = netWorthSlice.actions;

export default netWorthSlice.reducer;