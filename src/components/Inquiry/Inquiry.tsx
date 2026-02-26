"use client";

import React, {useState, useEffect} from "react";
import Link from "next/link";


const inquiry = () => {
    const [list, setList] = useState([]);
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(50)

    const getInquiryList = async () => {
        // const data = await InquiryList(page, limit)

        // setList(data.data)
    }

    const jsonInquiryList = [
        {
            seq: 1,
            title: '안녕하세요',
            createdAt: '2025-12-25 01:23:14'
        },
        {
            seq: 2,
            title: '문의가 있습니다.',
            createdAt: '2025-12-25 03:23:14'
        },
        {
            seq: 3,
            title: '확인 부탁합니다.',
            createdAt: '2025-12-27 11:23:14'
        }
    ]

    useEffect(() => {
        getInquiryList()
    }, [page, limit]);

    return (
        <>
            <div className="ptb-120">
                <div className="container">
                    <div className="table-border">
                        <div className="exchange-table table-responsive">
                            <table className="table align-middle table-striped mb-0">
                                <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">제목</th>
                                    <th scope="col">작성일시</th>
                                </tr>
                                </thead>
                                <tbody>
                                {jsonInquiryList && jsonInquiryList.map((item, index) => (
                                    <tr key={index}>
                                        <td className="number center">
                                            <span>{item.seq}</span>
                                        </td>
                                        <td className="asset">
                                            <Link href={'/inquiry-detail/' + item.seq}>{item.title}</Link>
                                        </td>
                                        <td className="center">
                                            {item.createdAt}
                                        </td>
                                    </tr>

                                ))}
                                </tbody>
                            </table>
                            <div className="d-flex justify-content-end p-3">
                                <Link href="/inquiry-write" className="btn btn-primary">
                                    글쓰기
                                </Link>
                            </div>
                        </div>
                        <div className="table-bottom"></div>
                    </div>

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
                    <div className="d-flex justify-content-end mb-2">
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

export default inquiry;
