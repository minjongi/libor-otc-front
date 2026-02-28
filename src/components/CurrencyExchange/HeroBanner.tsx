"use client";

import React, { useState, useEffect, useMemo, ChangeEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { Dropdown } from "react-bootstrap";

// Define types for better type safety
type Currency = {
  name: string;
  code: string;
  flag: string;
};

type ExchangeRates = {
  [key: string]: number;
};

const HeroBanner = () => {
  // Currency data with explicit typing
  const currencies: Currency[] = [
    { name: "US Dollar", code: "USD", flag: "/images/flags/united-states.png" },
    { name: "Euro", code: "EUR", flag: "/images/flags/round.png" },
    {
      name: "British Pound Sterling",
      code: "GBP",
      flag: "/images/flags/united-kingdom.png",
    },
    { name: "Japanese Yen", code: "JPY", flag: "/images/flags/japan.png" },
    {
      name: "Australian Dollar",
      code: "AUD",
      flag: "/images/flags/australia.png",
    },
    { name: "Chinese Yuan", code: "CNY", flag: "/images/flags/china.png" },
    { name: "Indian Rupee", code: "INR", flag: "/images/flags/india.png" },
    {
      name: "Brazilian Real",
      code: "BRL",
      flag: "/images/flags/brazil-flag.png",
    },
    {
      name: "South African Rand",
      code: "ZAR",
      flag: "/images/flags/south-africa.png",
    },
    { name: "Mexican Peso", code: "MXN", flag: "/images/flags/mexico.png" },
    {
      name: "UAE Dirham",
      code: "AED",
      flag: "/images/flags/united-arab-emirates.png",
    },
    {
      name: "Saudi Riyal",
      code: "SAR",
      flag: "/images/flags/saudi-arabia.png",
    },
    { name: "Swiss Franc", code: "CHF", flag: "/images/flags/switzerland.png" },
    {
      name: "Singapore Dollar",
      code: "SGD",
      flag: "/images/flags/singapore.png",
    },
  ];

  // Memoize exchange rates to prevent unnecessary re-renders
  const exchangeRates = useMemo<ExchangeRates>(
    () => ({
      USD: 1,
      EUR: 0.93,
      GBP: 0.79,
      JPY: 147.65,
      AUD: 1.53,
      CNY: 7.29,
      INR: 83.28,
      BRL: 5.07,
      ZAR: 18.78,
      MXN: 17.14,
      AED: 3.67,
      SAR: 3.75,
      CHF: 0.88,
      SGD: 1.34,
    }),
    []
  );

  // State for selected currencies and amount with explicit typing
  const [fromCurrency, setFromCurrency] = useState<Currency>(currencies[0]);
  const [toCurrency, setToCurrency] = useState<Currency>(currencies[4]); // Australian Dollar
  const [amount, setAmount] = useState<string>("10.00");
  const [convertedAmount, setConvertedAmount] = useState<string>("");
  const [exchangeRate, setExchangeRate] = useState<string>("");
  const [lastUpdated, setLastUpdated] = useState<string>("");

  // Calculate conversion when currencies or amount change
  useEffect(() => {
    const calculateConversion = () => {
      // Parse amount to float, default to 0 if invalid
      const parsedAmount = parseFloat(amount) || 0;

      // Calculate exchange rate
      const rate =
        exchangeRates[toCurrency.code] / exchangeRates[fromCurrency.code];
      setExchangeRate(rate.toFixed(5));

      // Calculate converted amount
      const result = parsedAmount * rate;
      setConvertedAmount(result.toFixed(6));

      // Set last updated time (in a real app, this would come from the API)
      const now = new Date();
      setLastUpdated(
        now.toLocaleString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    };

    calculateConversion();
  }, [amount, fromCurrency, toCurrency, exchangeRates]);

  // Handle amount input change with proper typing
  const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Allow only numbers and one decimal point
    if (/^\d*\.?\d*$/.test(value) || value === "") {
      setAmount(value);
    }
  };

  // Swap currencies
  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  return (
    <>
      <div className="banner-area bg-any-bg position-relative z-1">
        <div className="container mw-1680">
          <div className="banner-content position-relative z-1">
            <h1> LIBOR에서 디지털 자산을 안전하게 거래하세요 </h1>

            <Image
                src="/images/money-exchange.gif"
                className="money-exchange d-none d-xxl-inline-block"
                alt="money-exchange"
                width={217}
                height={217}
            />

          </div>
        </div>

        <Image
          src="/images/banner-shape.png"
          className="banner-shape"
          alt="banner-shape"
          width={1920}
          height={800}
        />
        <Image
          src="/images/shape3.png"
          className="position-absolute top-0 end-0 d-none d-lg-inline-block"
          alt="shape3"
          width={485}
          height={480}
        />
      </div>
    </>
  );
};

export default HeroBanner;
