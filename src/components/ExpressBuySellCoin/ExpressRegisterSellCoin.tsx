"use client";

import React, { useState, useCallback, forwardRef } from "react";
import { Dropdown, Form } from "react-bootstrap";
import Image from "next/image";
import {Formik, Form as FormikForm, Field, ErrorMessage} from "formik";
import * as Yup from "yup"
import { useRouter } from "next/navigation";

interface Currency {
    code: string;
    name: string;
    flag: string;
}

interface FormData {
    sendAmount: number;
    fromCurrency: Currency;
    toCurrency: Currency;
    receiveMethod: string;
    convertedAmount: number;
    exchangeRate: number;
}

interface CurrencyToggleProps {
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
    currency: Currency;
}

interface MethodToggleProps {
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
    method: string;
}

interface ExchangeRates {
    [key: string]: number;
}

const ExpressSellBuyCoin = () => {
    const currencies: Currency[] = [
        { code: "USDT", name: "Tether", flag: "/images/coin/tether-usdt-logo.png" },
        { code: "BTC", name: "Bitcoin", flag: "/images/coin/bitcoin-btc-logo.png" },
        { code: "XRP", name: "XRP", flag: "/images/coin/xrp-xrp-logo.png" },
    ];

    // Receive methods
    const receiveMethods: string[] = [
        "Bank Transfer",
        "Paypal Transfer",
        "Payoneer Transfer",
        "Wise Transfer",
    ];

    // State management
    const [formData, setFormData] = useState<FormData>({
        sendAmount: 0,
        fromCurrency: currencies[0],
        toCurrency: currencies[1],
        receiveMethod: receiveMethods[0],
        convertedAmount: 0,
        exchangeRate: 0.915,
    });

    // Handle currency selection
    const handleCurrencySelect = (
        currency: Currency,
        type: "fromCurrency" | "toCurrency"
    ): void => {
        setFormData((prev) => ({
            ...prev,
            [type]: currency,
        }));
    };


    const CurrencyToggle = forwardRef<HTMLButtonElement, CurrencyToggleProps>(
        ({ onClick, currency }, ref) => (
            <button
                ref={ref}
                className="dropdown-toggle bg-transparent border-0 w-100 p-0"
                onClick={(e) => {
                    e.preventDefault();
                    onClick(e);
                }}
            >
        <span className="d-flex align-items-center justify-content-between">
          <span className="d-flex align-items-center gap-2 flag">
            <Image
                src={currency.flag}
                alt={currency.code}
                width={20}
                height={15}
                style={{ objectFit: "cover" }}
            />
              {currency.code}
          </span>
        </span>
            </button>
        )
    );

    CurrencyToggle.displayName = "CurrencyToggle";

    // Custom dropdown toggle for receive method
    const MethodToggle = forwardRef<HTMLButtonElement, MethodToggleProps>(
        ({ onClick, method }, ref) => (
            <button
                ref={ref}
                className="dropdown-toggle bg-transparent border-0 w-100 p-0"
                onClick={(e) => {
                    e.preventDefault();
                    onClick(e);
                }}
            >
        <span className="d-flex align-items-center justify-content-between">
          <span>{method}</span>
        </span>
            </button>
        )
    );

    MethodToggle.displayName = "MethodToggle";

    const validationSchema = Yup.object().shape({
        coin: Yup.string().required('코인을 선택해주세요.'),
        quantity: Yup.string().required('수량을 입력해주세요.'),
        price: Yup.string().required('가격을 입력해주세요.'),
    })

    const regBuy = async () => {
        // regOtc(values).then(() => {
        //   router.push('/p2p-trade/order')
        // }).catch((error) => {
        //   alert(error.response.data.message);
        // })
    }

    const formatNumber = (value: string): string => {
        const cleaned = value.replace(/[^0-9]/g, '')
        if (!cleaned) return ''
        return cleaned.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    }

    return (
        <>
            <div className="currency-calculator-area ptb-120 bg-f7f7f7">
                <div className="container">
                    <h2 className="main-title style-two text-center mb-40 mw-1208 mx-auto">
                        Express register sell coin
                    </h2>
                    <div className="row g-4">
                        <div className="col-lg-7">
                            <div className="currency-calculator-img h-100">
                                <Image
                                    src="/images/currency-calculator-img2.jpg"
                                    className="ukiyo h-100 rounded-4"
                                    alt="currency-calculator-img"
                                    width={1520}
                                    height={854}
                                />
                            </div>
                        </div>

                        <div className="col-lg-5">
                            <form className="currency-converter-form style-two bg-primary">
                                <Formik
                                    initialValues={{coin: '', quantity: '', price: ''}}
                                    validationSchema={validationSchema}
                                    onSubmit={values => regBuy()}
                                >
                                    {({values, setFieldValue}) => (
                                        <Form>
                                            <div className="d-flex justify-content-between align-items-center mb-4">
                                                <h3 className="mb-0 text-secondary">간편 판매 등록</h3>
                                            </div>

                                            <div className="currency-input position-relative mb-3">
                                                <label className="label z-1">코인 선택</label>
                                                <div className="d-flex align-items-center gap-2">
                                                    <Form.Control
                                                        as="select"
                                                        name="coin"
                                                        value={values.coin}
                                                        onChange={(e) => setFieldValue("coin", e.target.value)}
                                                        style={{ fontSize: "12px" }}
                                                    >
                                                        <option value="">선택</option>
                                                        {currencies.map((currency) => (
                                                            <option key={currency.code} value={currency.code}>
                                                                {currency.code} - {currency.name}
                                                            </option>
                                                        ))}
                                                    </Form.Control>
                                                    <ErrorMessage
                                                        name="coin"
                                                        component="p"
                                                        className="text-danger mt-2"
                                                    />
                                                </div>
                                            </div>

                                            <div className="currency-input position-relative mb-3">
                                                <label className="label z-1">수량</label>
                                                <div className="position-relative">
                                                    <Form.Control
                                                        type="text"
                                                        value={values.quantity}
                                                        onChange={(e) => {
                                                            const formatted = formatNumber(e.target.value)
                                                            setFieldValue('quantity', formatted)
                                                        }}
                                                        className="flex-grow-1 text-end"
                                                    />
                                                    <ErrorMessage
                                                        name="quantity"
                                                        component="p"
                                                        className="text-danger mt-2"
                                                    />
                                                </div>
                                            </div>

                                            <div className="currency-input position-relative mb-3">
                                                <label className="label z-1">가격</label>
                                                <div className="d-flex align-items-center gap-2">
                                                    <Form.Control
                                                        type="text"
                                                        onChange={(e) => {
                                                            const formatted = formatNumber(e.target.value)
                                                            setFieldValue('price', formatted)
                                                        }}
                                                        value={values.price}
                                                        className="flex-grow-1 bg-light text-end"
                                                    />
                                                    <ErrorMessage
                                                        name="price"
                                                        component="p"
                                                        className="text-danger mt-2"
                                                    />
                                                </div>
                                            </div>

                                            <button className="btn btn-secondary w-100 border-secondary">
                                                등록
                                            </button>

                                        </Form>
                                    )}
                                </Formik>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ExpressSellBuyCoin;