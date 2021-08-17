const CAD_NetWorth = (CAD_balance, BTC_balance, BTC_CAD_rate, ETH_balance, ETH_CAD_rate) => {
  return CAD_balance + (BTC_balance * BTC_CAD_rate) + (ETH_balance * ETH_CAD_rate)
}

export {
  CAD_NetWorth,
}

