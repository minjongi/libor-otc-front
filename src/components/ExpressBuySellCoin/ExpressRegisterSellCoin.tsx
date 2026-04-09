"use client";

import {Form} from "react-bootstrap";
import Image from "next/image";
import {Formik, ErrorMessage} from "formik";
import * as Yup from "yup"
import {useTranslations} from "next-intl";

interface Currency {
    code: string;
    name: string;
    flag: string;
}

const ExpressSellBuyCoin = () => {
    const t = useTranslations();

    const currencies: Currency[] = [
        {code: "USDT", name: "Tether", flag: "/images/coin/tether-usdt-logo.png"},
        {code: "BTC", name: "Bitcoin", flag: "/images/coin/bitcoin-btc-logo.png"},
        {code: "XRP", name: "XRP", flag: "/images/coin/xrp-xrp-logo.png"},
    ];

    const validationSchema = Yup.object().shape({
        coin: Yup.string().required(t('cautionSelectCoin')),
        quantity: Yup.string().required(t('cautionEnterQuantity')),
        price: Yup.string().required(t('cautionEnterPrice')),
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
                        {t('expressRegSell_p')}
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
                            <div className="currency-converter-form style-two bg-primary">
                                <Formik
                                    initialValues={{coin: '', quantity: '', price: ''}}
                                    validationSchema={validationSchema}
                                    onSubmit={values => regBuy()}
                                >
                                    {({values, setFieldValue, handleSubmit}) => (
                                        <Form onSubmit={handleSubmit}>
                                            <div className="justify-content-between align-items-center mb-4">
                                                <h3 className="mb-0 text-secondary">{t('expressRegSell')}</h3>
                                            </div>

                                            <div className="currency-input position-relative mb-3">
                                                <label className="label z-1">{t('selectCoin')}</label>
                                                <Form.Control
                                                    as="select"
                                                    name="coin"
                                                    value={values.coin}
                                                    onChange={(e) => setFieldValue("coin", e.target.value)}
                                                    style={{fontSize: "12px"}}
                                                >
                                                    <option value="">{t('select')}</option>
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

                                            <div className="currency-input position-relative mb-3">
                                                <label className="label z-1">{t('quantity')}</label>
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

                                            <div className="currency-input position-relative mb-3">
                                                <label className="label z-1">{t('price')}</label>
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

                                            <button
                                                type="submit"
                                                className="btn btn-secondary w-100 border-secondary"
                                            >
                                                {t('create')}
                                            </button>

                                        </Form>
                                    )}
                                </Formik>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ExpressSellBuyCoin;