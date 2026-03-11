"use client";

import { useState, useEffect} from "react";
import { Card, Col, Container, Form, Row, Stack,} from "react-bootstrap";
import {
    bankName,
    cancelOtcMatching,
    completeDepositOtcMatching,
    confirmDepositOtcMatching,
    getOtcTransactionMatching
} from "@/utils/otcUtil";
import {getUser} from "@/utils/authUtil";

interface Seller {
    bank_account_name: string;
    bank_name: string;
    bank_account: string;
}

interface TransactionMatchingData {
    id: string;
    transactionId: string;
    sellWalletAddress: string;
    buyWalletAddress: string;
    amount: string;
    totalAmount: string;
    status: number;
    userType: 'buyer' | 'seller' | null;
    selfTrading: boolean;
    seller: Seller;
}

export default function P2pTradeMatchingDetail(searchParams: any) {
    const [isMounted, setIsMounted] = useState(false);
    const [user, setUser] = useState({});
    const [transactionMatchingData, setTransactionMatchingData] =
        useState<TransactionMatchingData>({
            id:"",
            transactionId: "",
            sellWalletAddress: "",
            buyWalletAddress: "",
            amount: "0",
            totalAmount: "0",
            status: 0,
            userType: null,
            selfTrading: false,
            seller: {
                bank_account_name: "",
                bank_name: "",
                bank_account: ""
            }
        });

    const fetchTransactionDetail = async (id: any) => {
        try {
            const result = await getOtcTransactionMatching(id);
            setTransactionMatchingData(result);

            console.log(result);
        } catch (err) {
            console.error("API call failed:", err);
            alert('오류가 발생했습니다.');
        }
    }

    useEffect(() => {
        fetchTransactionDetail(searchParams.params.id).then(response => {
            setIsMounted(true)
        })
        setUser(getUser())
    }, [])

    const cancelOtc = async () => {
        let confirmed = confirm('취소 처리 하시겠습니까?')
        if (!confirmed) return

        try {
            const result = await cancelOtcMatching(transactionMatchingData.id);
            await fetchTransactionDetail(searchParams.params.id);
        } catch(err) {
            console.error('API Call Failed', err)
            alert('취소 중 오류가 발생했습니다.')
        }
    }

    const completeDeposit = async () => {
        let confirmed = confirm('처리 하시겠습니까?')
        if (!confirmed) return

        try {
            const result = await completeDepositOtcMatching(transactionMatchingData.id);
            await fetchTransactionDetail(searchParams.params.id);
        } catch(err) {
            console.error('API Call Failed', err)
            alert('확인 중 오류가 발생했습니다.')
        }
    }

    const confirmDeposit = async () => {
        let confirmed = confirm('처리 하시겠습니까?')
        if (!confirmed) return

        try {
            const result = await confirmDepositOtcMatching(transactionMatchingData.id);
            await fetchTransactionDetail(searchParams.params.id);
        } catch(err) {
            console.error('API Call Failed', err)
            alert('확인 중 오류가 발생했습니다.')
        }
    }

    const btn = () => {
        if (!transactionMatchingData.status || transactionMatchingData.status === 5 || transactionMatchingData.status === 4) {
            return '';
        }

        if (transactionMatchingData.status === 1) {
            if (
                transactionMatchingData.userType === 'buyer' || transactionMatchingData.selfTrading
            ) {
                return (
                    <>
                        <button className="cancel btn-action-3"
                                type="button"
                                onClick={() => cancelOtc()}>{'취소'}
                        </button>
                        <button className="submit btn-action"
                                type="button"
                                onClick={() => completeDeposit()}>{'입금 완료'}
                        </button>
                    </>
                )
            }
        } else if (transactionMatchingData.status === 2) {
            if (
                transactionMatchingData.userType === 'seller' || transactionMatchingData.selfTrading
            ) {
                return (
                    <>
                        <button className="submit btn-action"
                                type="button"
                                onClick={() => confirmDeposit()}>{'입금 확인'}
                        </button>
                    </>
                )
            }
        }
    };

    const statusTitle = () => {
        if (!transactionMatchingData.status) {
            return '';
        }

        if (transactionMatchingData.status === 5) {
            return '거래 취소 완료'
        } else if (transactionMatchingData.status === 4) {
            return '거래 완료'
        }

        if (transactionMatchingData.userType === 'buyer') {
            if (transactionMatchingData.status === 1) {
                return '입금 대기'
            } else {
                return '입금 확인 대기'
            }
        } else {
            if (transactionMatchingData.status === 2) {
                return '입금 확인 대기'
            } else {
                return '입금 대기'
            }
        }
    };

    const statusProcessTitle = () => {
        if (transactionMatchingData.status === 5) {
            return '취소 처리'
        } else if (transactionMatchingData.status === 4) {
            return '완료'
        }

        return '진행 중'
    }


    return (
        <div className="send-money-area ptb-120">
            <Container>
                <Row className="g-4 justify-content-center">
                    <Col lg={8} xl={7}>
                        <Card className="smcc-form bg-primary border-0">
                            <Card.Body className="p-0">
                                <Form>

                                    <h3 className="mb-4 text-secondary text-center">
                                        입금 확인 대기
                                    </h3>
                                    <Stack gap={3}>
                                        <Form.Group>
                                            <Form.Label className="small text-black">
                                                처리 상태
                                            </Form.Label>
                                            <Form.Control
                                                placeholder="Recipient's full name"
                                                value={statusProcessTitle()}
                                            />
                                        </Form.Group>

                                        <Form.Group>
                                            <Form.Label className="small text-black">
                                                거래 ID
                                            </Form.Label>
                                            <Form.Control
                                                type="email"
                                                placeholder="Recipient's email address"
                                                value={transactionMatchingData.transactionId}
                                            />
                                        </Form.Group>

                                        <Form.Group>
                                            <Form.Label className="small text-black">
                                                거래 ID
                                            </Form.Label>
                                            <Form.Control
                                                type="email"
                                                placeholder="Recipient's email address"
                                                value={transactionMatchingData.sellWalletAddress}
                                            />
                                        </Form.Group>

                                        <Form.Group>
                                            <Form.Label className="small text-black">
                                                거래 ID
                                            </Form.Label>
                                            <Form.Control
                                                type="email"
                                                placeholder="Recipient's email address"
                                                value={transactionMatchingData.buyWalletAddress}
                                            />
                                        </Form.Group>

                                        <Form.Group>
                                            <Form.Label className="small text-black">
                                                거래 ID
                                            </Form.Label>
                                            <Form.Control
                                                type="email"
                                                placeholder="Recipient's email address"
                                                value={'USDT'}
                                            />
                                        </Form.Group>

                                        <Form.Group>
                                            <Form.Label className="small text-black">
                                                거래 ID
                                            </Form.Label>
                                            <Form.Control
                                                type="email"
                                                placeholder="Recipient's email address"
                                                value={parseFloat(transactionMatchingData.amount).toLocaleString()}
                                            />
                                        </Form.Group>
                                    </Stack>

                                    <h3 className="mb-4 mt-5 text-secondary">Payment Details</h3>
                                    <Stack gap={3}>
                                        <Form.Group>
                                            <Form.Label className="small text-black">
                                                Reference (Optional)
                                            </Form.Label>
                                            <Form.Control
                                                placeholder="e.g., Invoice number, purpose of transfer"
                                                value={transactionMatchingData.seller.bank_account_name}
                                            />
                                        </Form.Group>

                                        <Form.Group>
                                            <Form.Label className="small text-black">
                                                Reference (Optional)
                                            </Form.Label>
                                            <Form.Control
                                                placeholder="e.g., Invoice number, purpose of transfer"
                                                value={bankName(transactionMatchingData.seller.bank_name)}
                                            />
                                        </Form.Group>

                                        <Form.Group>
                                            <Form.Label className="small text-black">
                                                Reference (Optional)
                                            </Form.Label>
                                            <Form.Control
                                                placeholder="e.g., Invoice number, purpose of transfer"
                                                value={transactionMatchingData.seller.bank_account}
                                            />
                                        </Form.Group>

                                        <Form.Group>
                                            <Form.Label className="small text-black">
                                                Reference (Optional)
                                            </Form.Label>
                                            <Form.Control
                                                placeholder="e.g., Invoice number, purpose of transfer"
                                                value={parseFloat(transactionMatchingData.totalAmount ?? "0").toLocaleString() + ' KRW'}
                                            />
                                        </Form.Group>
                                    </Stack>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}