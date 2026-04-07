"use client";

import React, { useState, useEffect, useMemo, ChangeEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { Dropdown } from "react-bootstrap";
import {useTranslations} from "use-intl";

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

  const t = useTranslations();

  return (
    <>
      <div
          className="banner-area bg-any-bg position-relative z-1"
          style={{
            position: "relative",
            minHeight: "1200px",   // 🔥 이거 추가
            overflow: "hidden"
          }}
      >
        <div className="container mw-1680">
          <div
              className="banner-content position-relative z-1"
              style={{
                position: "relative",
                minHeight: "900px"
              }}
          >
            <h1>
              LIBOR에서 안전하게{" "} <button onClick={() => alert('성공')}>TEST</button>
              <Image
                  src="/images/money-exchange.gif"
                  className="money-exchange d-none d-xxl-inline-block"
                  alt="money-exchange"
                  width={217}
                  height={217}
              />
            </h1>

            <h1 className="text-align pt-2">거래하세요</h1>

            <div className="banner-info p-5"
                 style={{ maxWidth: "650px", marginLeft: "650px"}}
            >
              <p>
                <span style={{fontWeight: "bold"}}>신뢰 위에서 거래하다</span> <br />
                대량 자산을 위한 프리미엄 OTC 마켓
                기관 수준의 보안 시스템과 신속한 체결로
                안정적이고 조용한 거래 환경을 제공합니다.
              </p>
              <p>
                <span style={{fontWeight: "bold"}}>대량 거래를 더 안전하게</span> <br />
                가격 충격 없이, 슬리피지 없이 전문 트레이딩 데스크를 통해
                최적의 조건으로 체결하세요.
              </p>
              <p>
                <span style={{fontWeight: "bold"}}>시장 밖에서 움직이는 자금</span> <br />
                보이지 않는 곳에서 이뤄지는
                프라이빗 대량 거래
                진짜 자금은 OTC에서 움직입니다.
              </p>
              <p>
                <span style={{fontWeight: "bold"}}>LIBOR와 함께하는 프리미엄 OTC</span> <br />
                대량 코인 거래를 위한 전문 플랫폼
                강력한 보안 체계와 전담 매니저 지원으로
                더 안전하고 빠른 거래를 경험하세요.
              </p>

              <div className="d-flex align-items-center gap-30 gap-2 info-btn">
                <Link
                    href="/services/regBuyCoin"
                    className="btn d-flex align-items-center"
                >
                  시작하기
                  <i className="ri-arrow-left-right-line"></i>
                </Link>
                <div>
                  <span className="d-block">Call us.</span>
                  <a
                      href="tel:+1(444)2587485"
                      className="text-decoration-none call"
                  >
                    +1 (444) 258 7485
                  </a>
                </div>
              </div>
            </div>
            <Image
                src="/images/banner-img.jpg"
                className="banner-img"
                alt="banner-img"
                width={613}
                height={813}
                style={{
                  position: "absolute",
                  left: 0,
                  bottom: "-50px",
                  zIndex: -1
                }}
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
