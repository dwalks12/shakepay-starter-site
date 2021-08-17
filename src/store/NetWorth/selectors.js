export const selectIsLoading = (state) => state.netWorth.loading;
export const selectRates = (state) => state.netWorth.rates;
export const selectTransactionHistory = (state) => state.netWorth.transactionHistory;
export const selectCurrentNetWorth = (state) => state.netWorth.currentNetWorth;
export const selectActualEthRates = (state) => state.netWorth.ethRates;
export const selectActualBtcRates = (state) => state.netWorth.btcRates;
// TODO: handle errors