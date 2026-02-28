"use client";

import React, {useState, useEffect} from "react";
import {getOtcTransactionList} from "@/utils/otcUtil";
import Link from "next/link";

const P2pTrade = () => {
    const [flatTabs, setFlatTabs] = useState(1);
    const [list, setList] = useState([]);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(50);

    const getOtcList = async (type) => {
        const data = await getOtcTransactionList(page, limit, type, '', 1)
        setList(data.data)
    }

    useEffect(() => {
        getOtcList(flatTabs);
    }, [page, limit, flatTabs]);

    const btnTitle = (type: number) => {
        return type === 1 ? "구매" : "판매";
    };

    const getBuyList = [
        {
            seq: 1,
            price: "10,312,132",
            remainAmount: "13",
            createdAt: "2025-02-17 12:33:15",
            type: 1
        },
        {
            seq: 2,
            price: "31,412,565",
            remainAmount: "167",
            createdAt: "2025-02-28 12:33:15",
            type: 1
        },
        {
            seq: 3,
            price: "135,123,111",
            remainAmount: "11133",
            createdAt: "2025-06-17 11:33:15",
            type: 1
        },
        {
            seq: 4,
            price: "35,202",
            remainAmount: "5",
            createdAt: "2025-10-02 22:03:22",
            type: 1
        },
        {
            seq: 5,
            price: "845,110,696",
            remainAmount: "5248",
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
                                onClick={() => {
                                    setFlatTabs(1);
                                    setPage(1);
                                }}
                                style={{
                                    padding: "12px 24px",
                                    cursor: "pointer",
                                    fontWeight: flatTabs === 1 ? "600" : "400",
                                    borderBottom:
                                        flatTabs === 1
                                            ? "2px solid #228B22"
                                            : "2px solid transparent",
                                    color: flatTabs === 1 ? "#228B22" : "#9ca3af",
                                    transition: "all 0.2s ease",
                                }}
                            >
                                구매
                            </div>

                            <div
                                onClick={() => {
                                    setFlatTabs(2);
                                    setPage(1);
                                }}
                                style={{
                                    padding: "12px 24px",
                                    cursor: "pointer",
                                    fontWeight: flatTabs === 2 ? "600" : "400",
                                    borderBottom:
                                        flatTabs === 2
                                            ? "2px solid #228B22"
                                            : "2px solid transparent",
                                    color: flatTabs === 2 ? "#228B22" : "#9ca3af",
                                    transition: "all 0.2s ease",
                                }}
                            >
                                판매
                            </div>
                        </div>
                        <div className="exchange-table table-responsive">
                            <table className="table align-middle table-striped mb-0">
                                <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">코인명</th>
                                    <th scope="col">가격</th>
                                    <th scope="col">수량</th>
                                    <th scope="col">등록일시</th>
                                    <th scope="col"></th>
                                </tr>
                                </thead>
                                <tbody>
                                {!getBuyList.length && (
                                    <tr>
                                        <td className="center" colSpan={7}>
                                            <span>{'데이터 없음'}</span>
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
                                            <span>{parseFloat(item.remainAmount).toLocaleString()}</span>
                                        </td>
                                        <td className="center">
                                            <span>{item.createdAt}</span>
                                        </td>
                                        <td className="center">
                                            <span>
                                                <Link
                                                href={'/otc/' + item.seq}
                                                className="btn"
                                                style={{
                                                    padding: "8px 16px",
                                                    fontSize: "14px",
                                                    borderRadius: "20px",
                                                    minWidth: "80px",
                                                    textAlign: "center",
                                                    display: "inline-block"
                                                }}
                                            >
                                                {btnTitle(flatTabs)}
                                                </Link>
                                            </span>
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
                                            {'이전'}
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
                                            {'다음'}
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

export default P2pTrade;
