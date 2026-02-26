'use client'

import React, {useEffect, useState} from "react";
import {useParams} from "next/navigation";
import Link from "next/link";

const InquiryDetailForm = () => {

    const params = useParams()
    const seq = params.seq

    const [detail, setDetail] = useState({title: '', createdAt: '' ,content: '', reply: ''})

    useEffect(() => {
        const fetchData = async () => {
            // const data = await inquiryDetail(seq)

            // setDetail(data)
        }

        if (seq) fetchData()
    }, [seq])

    const detailTem = {
        title: "안녕하세요. 문의가 있습니다.",
        createdAt: "2025-03-22 15:33:21",
        content: "안녕하세요. 문의를 하겠습니다. 하나 둘 셋 넷 다섯 여섯 일곱 여덟 아홉 열까지의 문의가 있습니다.",
        reply: "네 대답입니다. 하나둘 대답 셋 넷"
    }

    return (
        <>
            <div className="build-your-career-area ptb-120">
                <div className="container">
                    <div className="row justify-content-center g-4">
                        <div className="col-lg-7">
                            <div className="contact-us-form mw-648">
                                <h3>문의내용</h3>

                                <form>
                                    <div className="currency-input position-relative z-1">
                                        <label>제목</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={detailTem.title}
                                            disabled
                                            style={{
                                                height: "60px",
                                                padding: "0 15px"
                                            }}
                                        />
                                    </div>

                                    <div className="currency-input position-relative z-1">
                                        <label>문의 일시</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={detailTem.createdAt}
                                            disabled
                                            style={{
                                                height: "60px",
                                                padding: "0 15px"
                                            }}
                                        />
                                    </div>

                                    <div className="currency-input position-relative z-1">
                                        <label>문의내용</label>
                                        <textarea
                                            rows={5}
                                            className="form-control"
                                            value={detailTem.content}
                                            disabled
                                            style={{
                                                height: "200px",
                                                lineHeight: "1.5",
                                                padding: "10px 15px"
                                            }}
                                        ></textarea>
                                    </div>

                                    <div className="currency-input position-relative z-1">
                                        <label>답변내용</label>
                                        <textarea
                                            rows={5}
                                            className="form-control"
                                            value={detailTem.reply || ''}
                                            disabled
                                            style={{
                                                height: "200px",
                                                lineHeight: "1.5",
                                                padding: "10px 15px"
                                            }}
                                        ></textarea>
                                    </div>

                                    <div className="btn btn-secondary w-100">
                                        <Link href="/inquiry">
                                            이전
                                        </Link>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default InquiryDetailForm;
