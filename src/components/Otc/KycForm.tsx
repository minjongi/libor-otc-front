'use client';

import {useEffect, useRef, useState} from "react"
import Link from "next/link";
import {useRouter, useSearchParams} from "next/navigation"
import * as Yup from 'yup';
import {Formik, Form, Field, ErrorMessage, FormikValues} from 'formik';
import axios from 'axios';
import {getEasyTradeClientUserInfo, kyc, bankName, sendAuthCode, confirmAuthCode, getEasyTradeInfo} from "@/utils/otcUtil";

const BuyForm = () => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const formRef = useRef(null);
    const [isLoading, setIsLoading] = useState(false);
    const [easyTradeInfo, setEasyTradeInfo] = useState({
      assetTypeId: ''
    });
    const [isSendAuthCode, setIsSendAuthCode] = useState(false);
    const [isConfirmAuthCode, setIsConfirmAuthCode] = useState(false);
    const [user, setUser] = useState({
      agentId: '',
      loginId: '',
      password: '',
      name: '',
      bank_name: '',
      bank_account: '',
      bank_account_name: '',
      phone_number: ''
    });

    const validationSchema = Yup.object().shape({
        phoneNumber: Yup.string()
            .matches(/^[0-9]+$/, '숫자만 입력 가능합니다.')
            .required('연락처를 입력해주세요.'),
        authNum: Yup.string()
            .matches(/^[0-9]+$/, '숫자만 입력 가능합니다.')
            .required('인증번호를 입력해주세요.'),
        termsAgreement: Yup.boolean()
            .oneOf([true], '(필수) OTC 매매 동의를 해주세요'),
    });

    const sendAuthCodeAct = async () => {
      if (!formRef || !formRef.current) {
        return;
      }

      setIsSendAuthCode(true);

      const params = {
        type: 2,
        agentId: searchParams.get('agId') || '',
        userId: searchParams.get('userId') || '',
        phoneNumber: formRef.current.values.phoneNumber.replace(/\s/g, ''),
      }

      const result = await sendAuthCode(params);

      if (result.data.status === 'success') {
        alert('인증코드가 발송되었습니다\n인증코드 확인후 인증해 주세요');
      } else {
        setIsSendAuthCode(false);
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

    const procSignUp = async (values) => {
      if (!isConfirmAuthCode) {
        alert('인증코드 인증을 완료해 주세요');
        return;
      }

      user.phone_number = values.phoneNumber.replace(/\s/g, '');

      console.log(user);

      kyc(user).then((result) => {
        alert('등록이 완료되었습니다\n구매 페이지로 이동합니다');
        router.push('/otc?agId=' + searchParams.get('agId') + '&userId=' + searchParams.get('userId') + '&symbol=' + searchParams.get('symbol'));
      }).catch((err) => {
        alert('오류가 발생하였습니다\n창을 닫고 다시 시도해 주세요');
      });
    }

    const getUserInfo = async () => {
      const agentId = searchParams.get('agId');
      const userId = searchParams.get('userId');
      const symbol = searchParams.get('symbol');

      const info = await getEasyTradeInfo(agentId, userId, symbol);

      if (info.status === 'success') {
        router.push('/otc?agent_id=' + agentId + '&user_id=' + userId + '&symbol=' + symbol);
        return;
      }

      const result = await getEasyTradeClientUserInfo(searchParams.get('agId') || '', searchParams.get('userId') || '')
      setUser({
        agentId: result.agent_id,
        loginId: result.user_id,
        password: result.user_pw || '',
        name: result.user_name,
        bank_name: result.bank_code,
        bank_account: result.bank_account,
        bank_account_name: result.user_name,
        phone_number: result.user_phone.replace(/[^0-9]/g, "")
      });
      setIsLoading(true);
    }

    useEffect(() => {
      getUserInfo();
    }, [])

    return isLoading && (
        <>
            <Formik
                initialValues={{
                  loginId: user.loginId, bankName: user.bank_name, bankAccountName: user.bank_account_name, phoneNumber: user.phone_number, termsAgreement: false, authNum: '',
                }}
                validationSchema={validationSchema}
                onSubmit={values => {
                  console.log(values);
                  procSignUp(values)
                }}
                innerRef={formRef}
            >
                {({setFieldValue, values}) => (
                    <div className="my-account-area pt-3">
                        <div className="container">
                            <div className="my-account-form">
                                <div className="text-center mb-4">
                                    <h3>LIBOR OTC 가입</h3>
                                </div>

                                <Form>
                                    <div className="currency-input position-relative z-1">
                                      <label className="label">아이디</label>
                                      <Field name="loginId" className="form-control" disabled/>
                                      <ErrorMessage name="loginId" component="p" className="text-danger"/>
                                    </div>

                                    <div className="currency-input position-relative z-1">
                                      <label className="label">은행명</label>
                                      <Field name="bankName" className="form-control" disabled/>
                                      <ErrorMessage name="bankName" component="p" className="text-danger"/>
                                    </div>

                                    <div className="currency-input position-relative z-1">
                                      <label className="label">입금자명</label>
                                      <Field name="bankAccountName" className="form-control" disabled/>
                                      <ErrorMessage name="bankAccountName" component="p" className="text-danger"/>
                                    </div>

                                    <div className="currency-input position-relative z-1">
                                        <label className="label">휴대폰번호(숫자만 입력)</label>
                                        <Field name="phoneNumber" className="form-control" autoComplete="off"/>
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

                                    <div className="otc-buy-desc">
                                        <div className="title">LIBOR KYC 동의</div>
                                        <div className="content">
                                          LIBOR OTC 의 KYC 규정을 준수하여 회원가입에 동의 합니다.<br/>
                                          잘못된 정보로 인하여 발생되는 문제는 귀책사유가 됩니다.<br/>
                                          이에 대한 동의 서명으로써, KYC 인증 회원가입에 인증 서명을 합니다.
                                        </div>
                                        <label>
                                          <Field
                                            type="checkbox"
                                            name="termsAgreement"
                                            className="form-check-input"
                                          />
                                          (필수) 약관 동의
                                        </label>
                                        <ErrorMessage name="termsAgreement" component="p" className="text-danger"/>
                                    </div>

                                    <button type="submit" className="btn btn-secondary w-100 mt-4">
                                      회원가입
                                    </button>
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
