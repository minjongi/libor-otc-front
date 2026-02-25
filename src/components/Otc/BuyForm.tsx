'use client';

import {useEffect, useRef, useState} from "react"
import Link from "next/link";
import {useRouter, useSearchParams} from "next/navigation"
import * as Yup from 'yup';
import {Formik, Form, Field, ErrorMessage, FormikValues} from 'formik';
import axios from 'axios';
import {NumericFormat} from 'react-number-format';
import {getEasyTradeInfo, regEasyTradeInfo, bankName, sendAuthCode, confirmAuthCode} from "@/utils/otcUtil";

const BuyForm = () => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const formRef = useRef(null);
    const [isLoading, setIsLoading] = useState(false);
    const [easyTradeInfo, setEasyTradeInfo] = useState({
      assetTypeId: "",
      assetSymbol: "",
      assetMarketPrice: "",
      sellerBank: "",
      sellerAccountName: "",
      sellerAccount: "",
      buyerUserId: "",
      buyerBank: "",
      buyerAccountName: "",
      buyerPhoneNumber: ""
    });
    const [step, setStep] = useState(true);
    const [isSendAuthCode, setIsSendAuthCode] = useState(false);
    const [isConfirmAuthCode, setIsConfirmAuthCode] = useState(false);
    const [isProcess, setIsProcess] = useState(false);

    const validationSchema = Yup.object().shape({
        phoneNumber: Yup.string()
            .matches(/^[0-9]+$/, '숫자만 입력 가능합니다.')
            .required('연락처를 입력해주세요.'),
        authNum: Yup.string()
            .matches(/^[0-9]+$/, '숫자만 입력 가능합니다.')
            .required('인증번호를 입력해주세요.'),
        amount: Yup.number()
          .transform((value, originalValue) => {
            return typeof originalValue === 'string'
              ? Number(originalValue.replace(/,/g, ''))
              : value;
          })
          .min(10000, '최소 구매금액은 10,000원 입니다')
          .required('구매금액을 입력해주세요.'),
        termsAgreement: Yup.boolean()
            .oneOf([true], '(필수) OTC 매매 동의를 해주세요'),
    });

    const sendAuthCodeAct = async () => {
      if (!formRef || !formRef.current) {
        return;
      }

      const params = {
        type: 2,
        agentId: searchParams.get('agId') || '',
        userId: searchParams.get('userId') || '',
        phoneNumber: formRef.current.values.phoneNumber.replace(/\s/g, ''),
      }

      const result = await sendAuthCode(params);

      if (result.data.status === 'success') {
        setIsSendAuthCode(true);
        alert('인증코드가 발송되었습니다\n인증코드 확인후 인증해 주세요');
      } else {
        alert('인증코드 발송에 실패하였습니다\n잠시후 다시 이용해 주세요');
      }
    }

    const confirmAuthCodeAct = async () => {
      if (!formRef || !formRef.current) {
        return;
      }

      const params = {
        type: 2,
        agentId: searchParams.get('agId') || '',
        userId: searchParams.get('userId') || '',
        code: formRef.current.values.authNum,
      }

      const result = await confirmAuthCode(params);

      if (result.data.status === 'success') {
        setIsConfirmAuthCode(true);
        alert('인증되었습니다');
      } else {
        alert('인증에 실패하였습니다\n인증코드 확인후 다시 시도해 주세요');
      }
    }

    const procEasyTrade = (values: FormikValues) => {
      if (!isConfirmAuthCode) {
        alert('인증코드 인증을 완료해 주세요');
        return;
      }

      if (isProcess) {
        return;
      }

      setIsProcess(true);

      const data = {
        agentId: searchParams.get('agId') || '',
        userId: searchParams.get('userId') || '',
        assetTypeId: easyTradeInfo.assetTypeId,
        amount: values.amount,
        phoneNumber: values.phoneNumber,
      }

      regEasyTradeInfo(data).then(() => {
        alert('입금정보 SMS가 발송되었습니다');
        setStep(false);
      }).catch(() => {
        alert('오류가 발생하였습니다\n창을 닫고 다시 시도해 주세요');
      });
    }

    const calcAmount = (amount: string, addAmount: number) => {
      amount = amount || '0';
      addAmount = addAmount || 0;

      return (Number(amount) + addAmount) || '';
    }

    const getEasyTrade = async () => {
      const info = await getEasyTradeInfo(searchParams.get('agId') || '', searchParams.get('userId') || '', searchParams.get('symbol') || '')

      if (info.status === 'signup') {
        router.push('/otc/kyc?agId=' + searchParams.get('agId') + '&userId=' + searchParams.get('userId') + '&symbol=' + searchParams.get('symbol'));
        return;
      }

      info.buyerPhoneNumber = info.buyerPhoneNumber.replace(/[^0-9]/g, "")

      console.log(info);

      setEasyTradeInfo(info);
      setIsLoading(true);
    }

    useEffect(() => {
      getEasyTrade();
    }, [])

    return isLoading && (
        <>
            <Formik
                initialValues={{
                  formattedAmount: '', amount: '', phoneNumber: easyTradeInfo.buyerPhoneNumber || '', termsAgreement: false, authNum: '',
                }}
                validationSchema={validationSchema}
                onSubmit={values => {
                  procEasyTrade(values)
                }}
                innerRef={formRef}
            >
                {({setFieldValue, values}) => (
                    <div className="my-account-area pt-3">
                        <div className="container">
                            <div className="my-account-form">
                                <div className="text-center mb-4">
                                    <h3>OTC 구매 계약 동의</h3>
                                </div>

                                <Form>
                                    <div className="currency-input position-relative z-1">
                                      <label className="label">대상 코인</label>
                                      <Field name="targetCoin" className="form-control" value={easyTradeInfo.assetSymbol} disabled/>
                                      <ErrorMessage name="targetCoin" component="p" className="text-danger"/>
                                    </div>

                                    <div className="currency-input position-relative z-1">
                                        <label className="label">단가</label>
                                        <Field name="unitPrice" className="form-control" value={parseFloat(easyTradeInfo.assetMarketPrice || 0).toLocaleString()}
                                               disabled/>
                                        <ErrorMessage name="unitPrice" component="p" className="text-danger"/>
                                    </div>

                                    <div className="currency-input position-relative z-1">
                                      <label className="label">구매자 아이디</label>
                                      <Field name="buyerId" className="form-control" value={easyTradeInfo.buyerUserId} disabled/>
                                      <ErrorMessage name="buyerId" component="p" className="text-danger"/>
                                    </div>

                                    <div className="currency-input position-relative z-1">
                                      <label className="label">입금 은행명</label>
                                      <Field name="depositBank" className="form-control" value={bankName(easyTradeInfo.buyerBank)} disabled/>
                                      <ErrorMessage name="depositBank" component="p" className="text-danger"/>
                                    </div>

                                    <div className="currency-input position-relative z-1">
                                      <label className="label">입금자명</label>
                                      <Field name="depositName" className="form-control" value={easyTradeInfo.buyerAccountName} disabled/>
                                      <ErrorMessage name="depositName" component="p" className="text-danger"/>
                                    </div>

                                    <div className="currency-input position-relative z-1">
                                        <label className="label">휴대폰번호(숫자만 입력)</label>
                                        <Field name="phoneNumber" className="form-control" autoComplete="off" disabled={isSendAuthCode}/>
                                        <ErrorMessage name="phoneNumber" component="p" className="text-danger"/>
                                        <button type="button" className="btn w-100 mt-2" disabled={isSendAuthCode} onClick={() => sendAuthCodeAct()}>
                                          인증번호 발송
                                        </button>
                                    </div>

                                    <div className="currency-input position-relative z-1">
                                        <label className="label">인증번호</label>
                                        <Field name="authNum" className="form-control" autoComplete="off"/>
                                        <ErrorMessage name="authNum" component="p" className="text-danger"/>
                                        <button type="button" className="btn w-100 mt-2" disabled={isConfirmAuthCode} onClick={() => confirmAuthCodeAct()}>
                                          인증하기
                                        </button>
                                    </div>

                                    <div className="currency-input position-relative z-1">
                                      <label className="label">구매 금액</label>
                                      <Field name="formattedAmount">
                                        {({ field }) => (
                                          <NumericFormat
                                            className="form-control"
                                            {...field}
                                            thousandSeparator={true}
                                            onValueChange={(values) => {
                                              setFieldValue('amount', values.value);
                                            }}
                                            placeholder="0"
                                          />
                                        )}
                                      </Field>
                                      <ErrorMessage name="amount" component="p" className="text-danger"/>
                                      <div className="d-flex gap-1">
                                        <button type="button" className="btn btn-amount" onClick={() => {
                                          setFieldValue('formattedAmount', calcAmount(values.formattedAmount, 10000));
                                        }}>1만원
                                        </button>
                                        <button type="button" className="btn btn-amount" onClick={() => {
                                          setFieldValue('formattedAmount', calcAmount(values.formattedAmount, 50000));
                                        }}>5만원
                                        </button>
                                        <button type="button" className="btn btn-amount" onClick={() => {
                                          setFieldValue('formattedAmount', calcAmount(values.formattedAmount, 100000));
                                        }}>10만원
                                        </button>
                                        <button type="button" className="btn btn-amount" onClick={() => {
                                          setFieldValue('formattedAmount', calcAmount(values.formattedAmount, 500000));
                                        }}>50만원
                                        </button>
                                        <button type="button" className="btn btn-amount" onClick={() => {
                                          setFieldValue('formattedAmount', calcAmount(values.formattedAmount, 1000000));
                                        }}>100만원
                                        </button>
                                        <button type="button" className="btn btn-amount" onClick={() => {
                                          setFieldValue('formattedAmount', '')
                                        }}>초기화
                                        </button>
                                      </div>
                                    </div>

                                    <div className="otc-buy-desc">
                                        <div className="title">OTC 매매 계약서</div>
                                        <div className="content">
                                          구매자 본인은 LIBOR OTC 거래소의 개인간 매매 규정을 준수하며, 본인의 귀책사유에 따른 손실, 손해, 피해에 대하여<br/>
                                          본사나 거래 상대방에게 일체의 이의 제기나 법적사항의 사법적 조치를 하지 않는다.<br/>
                                          본인의 KYC 정보가 정확해야 하며, 구매자 정보, 구매금액, 입금자명, 입금 금액이 정확해야 OTC 구매가 정상적으로 처리됩니다.<br/>
                                          잘못된 정보로 인하여 발생되는 문제는 귀책사유가 됩니다.<br/>
                                          이에 대한 동의 서명으로써, 본 OTC 매매 계약서에 인증 서명을 합니다.
                                        </div>
                                        <label>
                                          <Field
                                            type="checkbox"
                                            name="termsAgreement"
                                            className="form-check-input"
                                          />
                                          (필수) OTC 매매 동의
                                        </label>
                                        <ErrorMessage name="termsAgreement" component="p" className="text-danger"/>
                                    </div>

                                    {(step) && (
                                      <button type="submit" className="btn btn-secondary w-100 mt-4" disabled={isProcess}>
                                        {isProcess ? '처리중...' : '구매'}
                                      </button>
                                    )}

                                    {(!step) && (
                                      <div className="otc-buy-desc mt-3">
                                        <div className="title">
                                          ※ 입금정보 SMS가 발송되었습니다<br/>
                                          ※ 입금확인이 완료되면 매매가 완료됩니다
                                        </div>
                                        <button type="button" className="btn btn-secondary w-100 mt-4" onClick={() => {self.close()}}>닫기</button>
                                      </div>
                                    )}
                                </Form>
                            </div>
                        </div>
                    </div>
                )}
            </Formik>
        </>
    );
};

export default BuyForm;
