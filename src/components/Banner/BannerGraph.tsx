"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {useTranslations} from "next-intl";

interface ExchangeRate {
    id: number;
    pair: string;
    name: string;
    rate: number;
    change: number;
    isPositive: boolean;
    chart: string;
}

const LiveExchangeRates = () => {
    const t = useTranslations();
    const [exchangeRates, setExchangeRates] = useState<ExchangeRate[]>([]);
    const [lastUpdated, setLastUpdated] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const mockExchangeRates: ExchangeRate[] = [
        {
            id: 1,
            pair: "BTC",
            name: "BitCoin",
            rate: 1.0942,
            change: 2.12,
            isPositive: true,
            chart: "/images/chart1.png",
        },
        {
            id: 2,
            pair: "USDT",
            name: "Tether",
            rate: 1.2758,
            change: 0.28,
            isPositive: true,
            chart: "/images/chart1.png",
        },
        {
            id: 3,
            pair: "ETH",
            name: "Ethereum",
            rate: 143.67,
            change: 1.05,
            isPositive: false,
            chart: "/images/chart1.png",
        },
        {
            id: 4,
            pair: "XRP",
            name: "XRP",
            rate: 0.8784,
            change: 3.15,
            isPositive: true,
            chart: "/images/chart1.png",
        },
        {
            id: 5,
            pair: "SOL",
            name: "Solana",
            rate: 0.6713,
            change: 5.21,
            isPositive: false,
            chart: "/images/chart1.png",
        },
    ];

    const fetchExchangeRates = async (): Promise<void> => {
        try {
            setLoading(true);

            // For now, using mock data with a delay to simulate API call
            await new Promise<void>((resolve) => setTimeout(resolve, 1000));

            setExchangeRates(mockExchangeRates);
            setLastUpdated(
                new Date().toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                })
            );
            setError(null);
        } catch (err) {
            const errorMessage =
                err instanceof Error ? err.message : "Failed to fetch exchange rates";
            setError(errorMessage);
            console.error("Error fetching exchange rates:", err);
        } finally {
            setLoading(false);
        }
    };

    // Initial data fetch
    useEffect(() => {
        fetchExchangeRates();

        // Set up interval to refresh data every 60 seconds
        const interval = setInterval(fetchExchangeRates, 60000);

        return () => clearInterval(interval);
    }, []);

    const handleRefresh = (): void => {
        fetchExchangeRates();
    };

    const handleExchange = (currencyPair: string): void => {
        // Handle exchange action
        console.log(`Exchange clicked for: ${currencyPair}`);
        // You can implement navigation to exchange page or open a modal
    };

    if (loading && exchangeRates.length === 0) {
        return (
            <div className="pt-120">
                <div className="container">d
                    <span className="exchange-title">
            <span>{t('banner_graph_1')}</span>
          </span>
                    <div className="text-center py-5">{t('banner_graph_2')}...</div>
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="pt-120">
                <div className="container">
          <span className="exchange-title">
            <span>{t('banner_graph_1')}</span>
          </span>

                    <div className="table-border">
                        <div className="d-flex justify-content-between align-items-center table-info">
              <span className="text-body">
                {t('banner_graph_3')}: {lastUpdated}
                  {loading && <span className="ms-2">(Updating...)</span>}
              </span>
                            <button
                                type="button"
                                className="bg-transparent p-0 border-0 fw-semibold"
                                onClick={handleRefresh}
                                disabled={loading}
                            >
                                {loading ? "Refreshing..." : "Refresh Rates"}
                            </button>
                        </div>

                        {error && (
                            <div className="alert alert-danger text-center" role="alert">
                                {error}
                            </div>
                        )}

                        <div className="exchange-table table-responsive">
                            <table className="table align-middle table-striped mb-0">
                                <thead>
                                <tr>
                                    <th scope="col">{t('coinName')}</th>
                                    <th scope="col">{t('price')}</th>
                                    <th scope="col">{t('banner_graph_5')} (24h)</th>
                                    <th scope="col">{t('banner_graph_6')}</th>
                                    <th scope="col">{t('banner_graph_7')}</th>
                                </tr>
                                </thead>
                                <tbody>
                                {exchangeRates.map((currency: ExchangeRate) => (
                                    <tr key={currency.id}>
                                        <td>
                                            <div>
                                                <h3>{currency.pair}</h3>
                                                <span>{currency.name}</span>
                                            </div>
                                        </td>
                                        <td>{currency.rate}</td>
                                        <td
                                            className={
                                                currency.isPositive ? "text-success" : "text-danger"
                                            }
                                        >
                                            <i
                                                className={`ri-arrow-${
                                                    currency.isPositive ? "up" : "down"
                                                }-s-fill`}
                                            ></i>
                                            {currency.change}%
                                        </td>
                                        <td>
                                            <Image
                                                src={currency.chart}
                                                alt={`${currency.pair} chart`}
                                                width={202}
                                                height={25}
                                            />
                                        </td>
                                        <td>
                                            <button
                                                className="btn btn-primary"
                                                onClick={() => handleExchange(currency.pair)}
                                            >
                                                {t('buy')}
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="table-bottom"></div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LiveExchangeRates;
