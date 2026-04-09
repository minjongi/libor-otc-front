"use client";

import React, {useState, useEffect} from "react";
import {cancelOtcTransaction, getOtcTransactionList} from "@/utils/otcUtil";
import Link from "next/link";
import {usePathname, useRouter} from "next/navigation";
import {useTranslations} from "next-intl";

const P2pTradeOrder = () => {
    const t = useTranslations();
    const router = useRouter()
    const pathname = usePathname();
    const [isLoading, setIsLoading] = useState(false);
    const [list, setList] = useState([]);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(20);

    const getList = () => {
        setIsLoading(false)
        getOtcList();
    }

    const getOtcList = async () => {
        const data = await getOtcTransactionList(page, limit, '', 1, 1)
        setList(data.data)
        setIsLoading(true)
    }

    const cancelOtc = async (id: string) => {
        if (!confirm(t('cautionCancelAlert'))) {
            return;
        }

        try {
            await cancelOtcTransaction(id);
            getList();
        } catch (err) {
            console.error(err);
        }
    };

    const actionBtn = (item: any) => {
        if (item.status === 1) {
            return (
                <span><Link href={'javascript:;'}
                            onClick={() => {cancelOtc(item.id)}}
                            className="btn"
                            style={{
                                padding: "8px 16px",
                                fontSize: "14px",
                                borderRadius: "20px",
                                minWidth: "80px",
                                textAlign: "center",
                                display: "inline-block"
                            }}>{t('cancel')}</Link></span>
            );
        } else {
            return '';
        }
    }

    const amount = (item: any) => {
        return parseFloat(item.remainAmount).toLocaleString();
    }

    const transactionType = (item: any) => {
        return (item.type === 1) ? t('sell') : t('buy');
    }

    const statusTitle = (status: any) => {
        switch (status) {
            case 1:
                return t('inProgress');
            case 2:
                return t('completed');
            case 3:
                return t('cancel');
        }
    }

    useEffect(() => {
        getList()
    }, [])

    const getBuyList = [
        {
            seq: 1,
            price: "10,312,132",
            status: 1,
            createdAt: "2025-02-17 12:33:15",
            type: 1
        },
        {
            seq: 2,
            price: "31,412,565",
            status: 1,
            createdAt: "2025-02-28 12:33:15",
            type: 2
        },
        {
            seq: 3,
            price: "135,123,111",
            status: 1,
            createdAt: "2025-06-17 11:33:15",
            type: 1
        },
        {
            seq: 4,
            price: "35,202",
            status: 1,
            createdAt: "2025-10-02 22:03:22",
            type: 2
        },
        {
            seq: 5,
            price: "845,110,696",
            status: 1,
            createdAt: "2025-01-02 22:51:02",
            type: 1
        },
    ]

    return (
        <>
            <div className="pt-120">
                <div className="container">
                    <div className="table-border">
                        <div
                            style={{
                                display: "flex",
                                marginBottom: "20px",
                            }}
                        >
                            <div
                                onClick={() => router.push("/p2pTrade/matching")}
                                style={{
                                    padding: "12px 24px",
                                    cursor: "pointer",
                                    fontWeight: pathname?.includes("/p2pTrade/matching") ? "600" : "400",
                                    borderBottom: pathname?.includes("/p2pTrade/matching")
                                        ? "2px solid #228B22"
                                        : "2px solid transparent",
                                    color: pathname?.includes("/p2pTrade/matching")
                                        ? "#228B22"
                                        : "#9ca3af",
                                    transition: "all 0.2s ease",
                                }}
                            >
                                {t('matchingHistory')}
                            </div>

                            <div
                                onClick={() => router.push("/p2pTrade/order")}
                                style={{
                                    padding: "12px 24px",
                                    cursor: "pointer",
                                    fontWeight: pathname?.includes("/p2pTrade/order") ? "600" : "400",
                                    borderBottom: pathname?.includes("/p2pTrade/order")
                                        ? "2px solid #228B22"
                                        : "2px solid transparent",
                                    color: pathname?.includes("/p2pTrade/order")
                                        ? "#228B22"
                                        : "#9ca3af",
                                    transition: "all 0.2s ease",
                                }}
                            >
                                {t('orderHistory')}
                            </div>
                        </div>
                        <div className="exchange-table table-responsive">
                            <table className="table align-middle table-striped mb-0">
                                <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">{t('coinName')}</th>
                                    <th scope="col">{t('price')}</th>
                                    <th scope="col">{t('remainingQuantity')}</th>
                                    <th scope="col">{t('type')}</th>
                                    <th scope="col">{t('status')}</th>
                                    <th scope="col">{t('registerdDate')}</th>
                                    <th scope="col"></th>
                                </tr>
                                </thead>
                                <tbody>
                                {!getBuyList.length && (
                                    <tr>
                                        <td className="center" colSpan={7}>
                                            <span>{t('noData')}</span>
                                        </td>
                                    </tr>
                                )}
                                {!!getBuyList.length && getBuyList.map((item, index) => (
                                    <tr key={index}>
                                        <td className="number center">
                                            <span>{item.seq}</span>
                                        </td>
                                        <td className="center">
                                            <img
                                                src="/images/coin/tether-usdt-logo.png"
                                                alt="Tether"
                                                style={{
                                                    width: "20px",
                                                    height: "20px",
                                                    marginRight: "6px",
                                                    verticalAlign: "middle"
                                                }}
                                            />
                                            <span className="ms-1">
                                                                    {'Tether'}
                                                                </span>
                                        </td>
                                        <td className="center">
                                            <span>{parseFloat(item.price).toLocaleString()}</span>
                                        </td>
                                        <td className="center">
                                            <span>{amount(item)}</span>
                                        </td>
                                        <td className="center">
                                            <span>{transactionType(item)}</span>
                                        </td>
                                        <td className="center">
                                            <span>{statusTitle(item.status)}</span>
                                        </td>
                                        <td className="center">
                                            <span>{item.createdAt}</span>
                                        </td>
                                        <td className="center">
                                            {actionBtn(item)}
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                            <nav>
                                <ul className="pagination justify-content-center mt-4">
                                    <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
                                        <button
                                            className="page-link"
                                            onClick={() => setPage(prev => prev - 1)}
                                            disabled={page === 1}
                                        >
                                            {t('prev')}
                                        </button>
                                    </li>

                                    <li className="page-item active">
                                                            <span className="page-link">
                                                                {page}
                                                            </span>
                                    </li>

                                    <li className="page-item">
                                        <button
                                            className="page-link"
                                            onClick={() => setPage(prev => prev + 1)}
                                        >
                                            {t('next')}
                                        </button>
                                    </li>
                                </ul>
                            </nav>

                            <div className="table-bottom"></div>
                        </div>
                    </div>
                    <div className="d-flex justify-content-end mb-2 mt-5">
                        <select
                            className="form-select w-auto"
                            value={limit}
                            onChange={(e) => {
                                setLimit(Number(e.target.value));
                                setPage(1);
                            }}
                        >
                            <option value={10}>10</option>
                            <option value={20}>20</option>
                            <option value={50}>50</option>
                            <option value={100}>100</option>
                        </select>
                    </div>
                </div>
            </div>
        </>
    );
};

export default P2pTradeOrder;
