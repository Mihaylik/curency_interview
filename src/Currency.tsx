import React, { FC, useEffect, useState } from "react";
import s from "./Page.module.css";
import { convert } from "./utils/convertor";
import { setStore, store } from "./utils/store";

export const Currency: FC = () => {
    const [usd, setUsd] = useState(0)
    const [eur, setEur] = useState(0)  
    const [usdToEur, setUsdToEur] = useState(0)  

    
    useEffect(()=>{
        convert(setUsd, 'USD')
        convert(setEur, 'EUR')
        convert(setUsdToEur, 'USD', 'EUR')
    }, [])

    useEffect(()=>{
        setStore({
            courses:{
                USDtoUAH: usd,
                EURtoUAH: eur,
                USDtoEUR: usdToEur
            }
        })
    }, [usd, eur, usdToEur])

  return (
    <>
      <div className={s.currency_container}>
        <div className={s.currency}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/206/206626.png"
            width={20}
            height={20}
            className={s.icon}
          />
          {usd.toFixed(2)}
        </div>
        <div className={s.currency}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/5111/5111601.png"
            width={20}
            height={20}
            className={s.icon}
          />
          {eur.toFixed(2)}
        </div>
      </div>
    </>
  );
};
