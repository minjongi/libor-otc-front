"use client";

import React, {useState, useEffect} from "react";
import {getUserAssetInfo} from "@/utils/otcUtil";
import Link from "next/link";
import {useTranslations} from "next-intl";

const Assets = () => {
    const t = useTranslations();
    const [list, setList] = useState([])
    const [page , setPage] = useState(1)
    const [limit, setLimit] = useState(50)

    const setListAct = async () => {
        const list = await getUserAssetInfo();
        console.log(list);
        setList(list);
    }

    useEffect(() => {
        setListAct();
    }, [])

    const getOtcListTemp = [
        {
            seq: 1,
            amount: "131521"
        },
        {
            seq: 2,
            amount: "45152"
        }
    ]

    return (
        <>
            <div className="pt-120">
                <div className="container">
                    <div className="table-border">
                        <div className="exchange-table table-responsive">
                            <table className="table align-middle table-striped mb-0">
                                <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">{t('coinName')}</th>
                                    <th scope="col">{t('holdingQuantity')}</th>
                                    <th scope="col">{t('estimatedValue')}</th>

                                </tr>
                                </thead>
                                <tbody>
                                {getOtcListTemp && getOtcListTemp.map((item, index) => (
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
                                            <span>{parseFloat(item.amount).toLocaleString()}</span>
                                        </td>
                                        <td className="center">
                                            <span>{(parseFloat(item.amount) * 1500).toLocaleString()}</span>
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

export default Assets;
