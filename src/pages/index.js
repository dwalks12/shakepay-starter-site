import React, { useEffect, useMemo, useState } from "react"
import styles from '../styles/Home.module.scss';
import Charts from "../components/Charts";
import { useAppDispatch } from "../store";
import { fetchShakepayRates, fetchTransactionHistory } from "../store/NetWorth/actions";
import { useSelector } from "react-redux";
import { selectCurrentNetWorth, selectIsLoading, selectRates, selectTransactionHistory } from "../store/NetWorth/selectors";
import Loading from "../components/Loading";

const IndexPage = () => {
  const dispatch = useAppDispatch();
  const isLoading = useSelector((state) => selectIsLoading(state));
  
  const transactionHistory = useSelector((state) => selectTransactionHistory(state));
  const rates = useSelector((state) => selectRates(state));
  const currentNetWorth = useSelector((state) => selectCurrentNetWorth(state));
  useEffect(() => {
    // Calculate current net worth
    if (rates && transactionHistory) {
      // const currentNetWorth = CAD_NetWorth()
    }
  }, [rates, transactionHistory])

  useEffect(() => {
    // FETCH Info
    dispatch(fetchShakepayRates());
    dispatch(fetchTransactionHistory());
  }, [])

  return (
    <main className={styles.homePageContainer}>
      <h1>Shakepay UI</h1>
      <p><strong>Current Net Worth: </strong> <span className={styles.currency}>${currentNetWorth.toFixed(2)}</span></p>
      <div className={styles.graphContainer}>
        <Charts />
      </div>
      {isLoading && (<Loading />)}
    </main>
  )
}

export default IndexPage
