export const selectIsLoading = (state) => state.netWorth.loading;
export const selectRates = (state) => state.netWorth.rates;
export const selectTransactionHistory = (state) => state.netWorth.transactionHistory;
export const selectCurrentNetWorth = (state) => state.netWorth.currentNetWorth;
// TODO: handle errors