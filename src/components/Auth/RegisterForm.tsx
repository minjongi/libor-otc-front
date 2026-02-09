'use client';

import React from "react";
import Link from "next/link";
import {useRouter} from "next/navigation";
import * as Yup from 'yup';
import {Formik, Form, Field, ErrorMessage} from 'formik'
import axios from 'axios'

const RegisterForm = () => {
    const router = useRouter()

    const validationSchema = Yup.object().shape({
        loginId: Yup.string()
            .required('아이디를 입력해주세요.'),
        password: Yup.string()
            .min(8, '비밀번호는 8글자 이상이어야 합니다.')
            .required('비밀번호를 입력해주세요.'),
        passwordConfirm: Yup.string()
            .oneOf([Yup.ref('password'), undefined], '비밀번호가 일치하지 않습니다.')
            .required('비밀번호를 다시 입력해주세요.'),
        name: Yup.string()
            .required('이름을 입력해주세요.'),
        phone_number: Yup.string()
            .matches(/^[0-9]+$/, '숫자만 입력 가능합니다.')
            .required('연락처를 입력해주세요.'),
        email: Yup.string()
            .email('이메일 형식으로 입력해 주세요.')
            .required('이메일을 입력해주세요.'),
        termsAgreement: Yup.boolean()
            .oneOf([true], '(필수) 약관에 동의해야 가입할 수 있습니다.'),
    });

    // TODO 추후 API 호출 로직 구성
    // const procSignUp = async (values) => {
    //   console.log(values);
    //   signUp(values)
    //       .then(() => {
    //         alert('회원가입이 완료되었습니다.')
    //         router.push('/login');
    //       })
    //       .catch((e: unknown) => {
    //           if (axios.isAxiosError(e)) {
    //               alert(e.response?.data?.message)
    //           } else {
    //               alert('알 수 없는 오류가 발생했습니다.')
    //           }
    //       })
    // }

    return (
        <>
            <Formik
                initialValues={{
                    loginId: '',
                    password: '',
                    passwordConfirm: '',
                    name: '',
                    phone_number: '',
                    email: '',
                    termsAgreement: false,
                    marketingAgreement: false,
                }}
                validationSchema={validationSchema}
                onSubmit={values => {
                    // procSignUp(values)
                }}
            >
                {({}) => (
                    <div className="my-account-area ptb-120">
                        <div className="container">
                            <div className="my-account-form">
                                <div className="text-center mb-4">
                                    <h3>회원가입</h3>
                                    <p>
                                        Already have an account? <Link href="/login">로그인</Link>
                                    </p>
                                </div>

                                <form>
                                    <div className="currency-input position-relative z-1">
                                        <label className="label">아이디</label>
                                        <Field name="loginId" className="form-control"/>
                                        <ErrorMessage name="loginId" component="p" className="text-danger"/>
                                    </div>

                                    <div className="currency-input position-relative z-1">
                                        <label className="label">비밀번호</label>
                                        <Field type="password" name="password" className="form-control"/>
                                        <ErrorMessage name="password" component="p" className="text-danger"/>
                                    </div>

                                    <div className="currency-input position-relative z-1">
                                        <label className="label">비밀번호 재입력</label>
                                        <Field type="password" name="passwordConfirm" className="form-control"/>
                                        <ErrorMessage name="passwordConfirm" component="p" className="text-danger"/>
                                    </div>

                                    <div className="currency-input position-relative z-1">
                                        <label className="label">이름</label>
                                        <Field name="name" className="form-control"/>
                                        <ErrorMessage name="name" component="p" className="text-danger"/>
                                    </div>

                                    <div className="currency-input position-relative z-1">
                                        <label className="label">전화번호</label>
                                        <Field name="phone_number" className="form-control"/>
                                        <ErrorMessage name="phone_number" component="p" className="text-danger"/>
                                    </div>

                                    <div className="currency-input position-relative z-1">
                                        <label className="label">이메일</label>
                                        <Field name="email" className="form-control" placeholder="id@libor-otc.com"/>
                                        <ErrorMessage name="email" component="p" className="text-danger"/>
                                    </div>

                                    <div>
                                        <Field
                                            type="checkbox"
                                            name="termsAgreement"
                                            className="form-check-input"
                                        />
                                        (필수) 이메일 가입 및 이용약관 동의

                                        <ErrorMessage name="termsAgreement" component="p" className="text-danger"/>
                                    </div>

                                    <div className="mt-2">
                                        <Field
                                            type="checkbox"
                                            name="marketingAgreement"
                                            className="form-check-input"
                                        />
                                        (선택) 광고 마케팅 동의

                                        <ErrorMessage name="marketingAgreement" component="p" className="text-danger"/>
                                    </div>

                                    <button type="submit" className="btn btn-secondary w-100 mt-4">
                                        회원가입
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                )}
            </Formik>
        </>
    );
};

export default RegisterForm;
