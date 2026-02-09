"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";

interface Currency {
  code: string;
  name: string;
  flag: string;
}

// Move exchangeRates outside the component to prevent recreation on every render
const exchangeRates: Record<string, Record<string, number>> = {
  USD: {
    USD: 1,
    EUR: 0.93,
    GBP: 0.79,
    AUD: 1.52,
    JPY: 149.32,
    INR: 83.12,
    CAD: 1.36,
    CHF: 0.9,
  },
  EUR: {
    USD: 1.07,
    EUR: 1,
    GBP: 0.85,
    AUD: 1.63,
    JPY: 160.21,
    INR: 89.21,
    CAD: 1.46,
    CHF: 0.97,
  },
  GBP: {
    USD: 1.27,
    EUR: 1.18,
    GBP: 1,
    AUD: 1.92,
    JPY: 188.76,
    INR: 105.12,
    CAD: 1.72,
    CHF: 1.14,
  },
  AUD: {
    USD: 0.66,
    EUR: 0.61,
    GBP: 0.52,
    AUD: 1,
    JPY: 98.37,
    INR: 54.59,
    CAD: 0.89,
    CHF: 0.59,
  },
  JPY: {
    USD: 0.0067,
    EUR: 0.0062,
    GBP: 0.0053,
    AUD: 0.0102,
    JPY: 1,
    INR: 0.56,
    CAD: 0.0091,
    CHF: 0.006,
  },
  INR: {
    USD: 0.012,
    EUR: 0.011,
    GBP: 0.0095,
    AUD: 0.0183,
    JPY: 1.8,
    INR: 1,
    CAD: 0.016,
    CHF: 0.011,
  },
  CAD: {
    USD: 0.74,
    EUR: 0.68,
    GBP: 0.58,
    AUD: 1.12,
    JPY: 109.88,
    INR: 61.18,
    CAD: 1,
    CHF: 0.66,
  },
  CHF: {
    USD: 1.11,
    EUR: 1.03,
    GBP: 0.88,
    AUD: 1.69,
    JPY: 166.13,
    INR: 92.42,
    CAD: 1.51,
    CHF: 1,
  },
};

const CurrencyConverter = () => {
  // Currency data
  const currencies: Currency[] = [
    {
      code: "USD",
      name: "US Dollar",
      flag: "/images/flags/united-states1.png",
    },
    { code: "EUR", name: "Euro", flag: "/images/flags/round.png" },
    {
      code: "GBP",
      name: "British Pound",
      flag: "/images/flags/united-kingdom.png",
    },
    {
      code: "AUD",
      name: "Australian Dollar",
      flag: "/images/flags/australia.png",
    },
    { code: "JPY", name: "Japanese Yen", flag: "/images/flags/japan.png" },
    { code: "INR", name: "Indian Rupee", flag: "/images/flags/india.png" },
    { code: "CAD", name: "Canadian Dollar", flag: "/images/flags/canada.png" },
    { code: "CHF", name: "Swiss Franc", flag: "/images/flags/switzerland.png" },
  ];

  // State management
  const [amount, setAmount] = useState<string>("10.00");
  const [fromCurrency, setFromCurrency] = useState<string>("AUD");
  const [toCurrency, setToCurrency] = useState<string>("INR");
  const [convertedAmount, setConvertedAmount] = useState<string>("");
  const [exchangeRate, setExchangeRate] = useState<string>("");
  const [lastUpdated, setLastUpdated] = useState<string>("");
  const [isFromOpen, setIsFromOpen] = useState<boolean>(false);
  const [isToOpen, setIsToOpen] = useState<boolean>(false);

  // Refs for dropdown containers
  const fromDropdownRef = useRef<HTMLDivElement>(null);
  const toDropdownRef = useRef<HTMLDivElement>(null);

  // Memoize convertCurrency function to prevent unnecessary re-renders
  const convertCurrency = useCallback(() => {
    const amountNum = parseFloat(amount);
    if (isNaN(amountNum) || amountNum <= 0) {
      setConvertedAmount("Invalid amount");
      setExchangeRate("");
      return;
    }

    if (fromCurrency === toCurrency) {
      setConvertedAmount(amountNum.toFixed(2));
      setExchangeRate("1.000");
      return;
    }

    const rate = exchangeRates[fromCurrency][toCurrency];
    const result = amountNum * rate;

    setConvertedAmount(result.toFixed(2));
    setExchangeRate(rate.toFixed(3));
    setLastUpdated(new Date().toLocaleTimeString());
  }, [amount, fromCurrency, toCurrency]); // exchangeRates is constant, so no need to include

  // Swap currencies
  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  // Initialize conversion on component mount
  useEffect(() => {
    convertCurrency();
  }, [convertCurrency]); // Include convertCurrency in dependencies

  // Auto-convert when inputs change
  useEffect(() => {
    convertCurrency();
  }, [convertCurrency]); // Include convertCurrency in dependencies

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        fromDropdownRef.current &&
        !fromDropdownRef.current.contains(event.target as Node) &&
        isFromOpen
      ) {
        setIsFromOpen(false);
      }

      if (
        toDropdownRef.current &&
        !toDropdownRef.current.contains(event.target as Node) &&
        isToOpen
      ) {
        setIsToOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isFromOpen, isToOpen]);

  // Get currency object by code
  const getCurrency = (code: string) => {
    return (
      currencies.find((currency) => currency.code === code) || currencies[0]
    );
  };

  // Custom currency select component
  const CurrencySelect = ({
    value,
    onChange,
    isOpen,
    setIsOpen,
    label,
    dropdownRef,
  }: {
    value: string;
    onChange: (code: string) => void;
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
    label: string;
    dropdownRef: React.RefObject<HTMLDivElement | null>;
  }) => {
    const selectedCurrency = getCurrency(value);

    return (
      <div className="mb-4" ref={dropdownRef}>
        <label className="label">{label}</label>
        <div className="custom-select">
          <div
            className="custom-select-trigger d-flex justify-content-between align-items-center"
            onClick={() => setIsOpen(!isOpen)}
          >
            <div className="d-flex align-items-center gap-2">
              <Image
                src={selectedCurrency.flag}
                alt={selectedCurrency.name}
                width={20}
                height={20}
              />
              <span>
                {selectedCurrency.code} - {selectedCurrency.name}
              </span>
            </div>
            <span className={`dropdown-arrow ${isOpen ? "open" : ""}`}>▼</span>
          </div>

          {isOpen && (
            <div className="custom-select-options">
              {currencies.map((currency) => (
                <div
                  key={currency.code}
                  className={`custom-select-option ${
                    currency.code === value ? "selected" : ""
                  }`}
                  onClick={() => {
                    onChange(currency.code);
                    setIsOpen(false);
                  }}
                >
                  <Image
                    src={currency.flag}
                    alt={currency.name}
                    width={20}
                    height={20}
                  />
                  <span>
                    {currency.code} - {currency.name}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="ptb-120">
        <div className="container">
          <div className="currency-converter">
            <h1>Currency Converter</h1>

            <div className="mb-4">
              <label htmlFor="amount" className="label">
                Amount
              </label>
              <input
                type="number"
                id="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                min="0"
                step="0.01"
                className="form-control"
              />
            </div>

            <CurrencySelect
              value={fromCurrency}
              onChange={setFromCurrency}
              isOpen={isFromOpen}
              setIsOpen={setIsFromOpen}
              label="From Currency"
              dropdownRef={fromDropdownRef}
            />

            <div className="swap-button">
              <button onClick={swapCurrencies} type="button">
                ⇅
              </button>
            </div>

            <CurrencySelect
              value={toCurrency}
              onChange={setToCurrency}
              isOpen={isToOpen}
              setIsOpen={setIsToOpen}
              label="To Currency"
              dropdownRef={toDropdownRef}
            />

            <div className="result">
              <div className="conversion-result">
                {amount} {fromCurrency} = {convertedAmount} {toCurrency}
              </div>
              <div className="exchange-rate">
                1 {fromCurrency} = {exchangeRate} {toCurrency}
              </div>
            </div>

            <div className="last-updated">
              Last updated: {lastUpdated || "Just now"}
            </div>

            <button
              className="convert btn w-100"
              type="button"
              onClick={convertCurrency}
            >
              Convert Currency ↩
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CurrencyConverter;
