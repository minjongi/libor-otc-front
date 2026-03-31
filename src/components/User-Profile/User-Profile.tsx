'use client';

import React, {useEffect, useState} from "react";
import Link from "next/link";
import {useRouter} from "next/navigation";
import * as Yup from 'yup';
import {Formik, Form, Field, ErrorMessage} from 'formik'
import axios from 'axios'
import {getUser, update} from "@/utils/authUtil";

const userProfile = () => {
    const router = useRouter()

    // const [user, setUser] = useState({});

    const validationSchema = Yup.object().shape({
        phone_number: Yup.string()
            .matches(/^[0-9]+$/, '숫자만 입력 가능합니다.')
            .required('연락처를 입력해주세요.'),
        email: Yup.string()
            .email('이메일 형식으로 입력해 주세요.')
            .required('이메일을 입력해주세요.'),
        bank_name: Yup.string()
            .required('은행을 선택해 주세요.'),
        bank_account: Yup.string()
            .required('계좌번호를 입력해주세요.'),
        bank_account_name: Yup.string()
            .required('예금주를 입력해주세요.'),

    });

    const procUpdate = (values: any) => {
        const result = update(values);

        if (result) {
            result.then(() => {
                alert('수정되었습니다.');
            });
        }
    }

    // useEffect(() => {
    //     setUser(getUser())
    // }, [])

    const user = {
        id: 'testAccount',
        phone_number: '010-3343-3331',
        email: 'test@google.com',
        bank_name: '신한은행',
        bank_account: '113-3333-2141',
        bank_account_name: '홍길동',
        loginId: 'testAccount',
        name: '홍길동'
    }


    return !!user.id && (
        <>
            <Formik
                initialValues={{
                    phone_number: user.phone_number.replace(/[^0-9]/g, ""),
                    email: user.email,
                    bank_name: user.bank_name,
                    bank_account: user.bank_account,
                    bank_account_name: user.bank_account_name
                }}
                validationSchema={validationSchema}
                onSubmit={values => {
                    procUpdate(values)
                }}
            >
                {({}) => (
                    <div className="my-account-area ptb-120">
                        <div className="profile-wrapper">
                            <div className="profile-container">
                                <div
                                    className="profile-image"
                                    style={{
                                        backgroundImage: 'url("/images/banner-img.jpg")'
                                    }}
                                ></div>

                                <div className="my-account-form" style={{
                                    flex: 1,
                                    display: "flex",
                                    flexDirection: "column",
                                    height:"100%"
                                }}>
                                    <Form
                                        style={{
                                            display: "flex",
                                            flexDirection: "column",
                                            flex: 1,
                                            height:"100%"
                                        }}
                                    >
                                        <h4>회원정보</h4>

                                        <div className="form-group">
                                            <div>
                                                <label>아이디<span>*</span></label>
                                                <Field name="loginId" className="form-control"
                                                       disabled
                                                       value={user.loginId}
                                                       style={{
                                                           height: '50px',
                                                           borderRadius: '8px',
                                                           fontSize: '18px'
                                                       }}
                                                />
                                            </div>
                                            <div>
                                                <label>이름<span>*</span></label>
                                                <Field name="name" className="form-control"
                                                       disabled
                                                       value={user.name}
                                                       style={{
                                                           height: '50px',
                                                           borderRadius: '8px',
                                                           fontSize: '18px'
                                                       }}
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <div>
                                                <label>전화번호<span>*</span></label>
                                                <Field name="phone_number" className="form-control"
                                                       style={{
                                                           height: '50px',
                                                           borderRadius: '8px',
                                                           fontSize: '18px'
                                                       }}
                                                />
                                                <ErrorMessage name="phone_number" component="p"
                                                              className="text-danger"/>
                                            </div>
                                            <div>
                                                <label>이메일<span>*</span></label>
                                                <Field name="email" className="form-control"
                                                       style={{
                                                           height: '50px',
                                                           borderRadius: '8px',
                                                           fontSize: '18px'
                                                       }}
                                                />
                                                <ErrorMessage name="email" component="p" className="text-danger"/>
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <div>
                                                <label>은행명<span>*</span>:</label>
                                                <Field as="select" name="bank_name" id="bank_name"
                                                       className="form-control"
                                                       style={{
                                                           height: '50px',
                                                           borderRadius: '8px',
                                                           fontSize: '17px',
                                                           margin: '0',
                                                           width: '100%'
                                                       }}
                                                >
                                                    <option value="">은행 선택</option>
                                                    <option value="039">경남</option>
                                                    <option value="034">광주</option>
                                                    <option value="031">대구</option>
                                                    <option value="032">부산</option>
                                                    <option value="064">산림조합</option>
                                                    <option value="045">새마을금고</option>
                                                    <option value="007">수협</option>
                                                    <option value="088">신한</option>
                                                    <option value="048">신협</option>
                                                    <option value="020">우리</option>
                                                    <option value="071">우체국</option>
                                                    <option value="050">저축은행</option>
                                                    <option value="037">전북</option>
                                                    <option value="035">제주</option>
                                                    <option value="090">카카오뱅크</option>
                                                    <option value="089">케이뱅크</option>
                                                    <option value="092">토스뱅크</option>
                                                    <option value="081">하나</option>
                                                    <option value="027">한국씨티</option>
                                                    <option value="001">한국은행</option>
                                                    <option value="003">IBK기업</option>
                                                    <option value="004">KB국민</option>
                                                    <option value="002">KDB산업</option>
                                                    <option value="011">NH농협</option>
                                                    <option value="023">SC제일</option>
                                                </Field>
                                                <ErrorMessage name="bank_name" component="p" className="text-danger"/>
                                            </div>
                                            <div>
                                                <label>계좌번호<span>*</span>:</label>
                                                <Field name="bank_account" className="form-control"
                                                       style={{
                                                           height: '50px',
                                                           borderRadius: '8px',
                                                           fontSize: '18px'
                                                       }}
                                                />
                                                <ErrorMessage name="bank_account" component="p"
                                                              className="text-danger"/>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <div>
                                                <label>예금주<span>*</span>:</label>
                                                <Field name="bank_account_name" className="form-control"
                                                       style={{
                                                           height: '50px',
                                                           borderRadius: '8px',
                                                           fontSize: '18px'
                                                       }}
                                                />
                                                <ErrorMessage name="bank_account_name" component="p"
                                                              className="text-danger"/>
                                            </div>
                                            <div></div>
                                        </div>
                                        <button type="submit" className="btn btn-secondary w-100 mt-4" style={{
                                            marginTop: "auto"
                                        }}>수정
                                        </button>
                                    </Form>
                                </div>
                            </div>


                        </div>
                    </div>
                )}
            </Formik>
        </>
    );
};

export default userProfile;
