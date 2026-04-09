'use client';

import React, {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import * as Yup from 'yup';
import {Formik, Form, Field, ErrorMessage} from 'formik'
import axios from 'axios'
import {getUser, update} from "@/utils/authUtil";
import {useTranslations} from "next-intl";

const userProfile = () => {
    const t = useTranslations();
    const router = useRouter()

    // const [user, setUser] = useState({});

    const validationSchema = Yup.object().shape({
        phone_number: Yup.string()
            .matches(/^[0-9]+$/, t('numbersOnly'))
            .required(t('validationContactNumber')),
        email: Yup.string()
            .email(t('validationEmail'))
            .required(t('validationEnterEmail')),
        bank_name: Yup.string()
            .required(t('validationSelectBank')),
        bank_account: Yup.string()
            .required(t('validationAccountNumber')),
        bank_account_name: Yup.string()
            .required(t('validationEnterAccountHolder')),

    });

    const procUpdate = (values: any) => {
        const result = update(values);

        if (result) {
            result.then(() => {
                alert(t('alertUpdate'));
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
                                        <h4>{t('accountInformation')}</h4>

                                        <div className="form-group">
                                            <div>
                                                <label>{t('id')}<span>*</span></label>
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
                                                <label>{t('name')}<span>*</span></label>
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
                                                <label>{t('phoneNumber')}<span>*</span></label>
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
                                                <label>{t('email')}<span>*</span></label>
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
                                                <label>{t('bankName')}<span>*</span>:</label>
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
                                                    <option value="">{t('selectBank')}</option>
                                                    <option value="039">{t('gyeongnam')}</option>
                                                    <option value="034">{t('gwangju')}</option>
                                                    <option value="031">{t('daegu')}</option>
                                                    <option value="032">{t('busan')}</option>
                                                    <option value="064">{t('forestryCooperative')}</option>
                                                    <option value="045">{t('mg')}</option>
                                                    <option value="007">{t('suhyup')}</option>
                                                    <option value="088">{t('shinhan')}</option>
                                                    <option value="048">{t('shinhyup')}</option>
                                                    <option value="020">{t('woori')}</option>
                                                    <option value="071">{t('korea Post')}</option>
                                                    <option value="050">{t('savings Bank')}</option>
                                                    <option value="037">{t('jeonbuk')}</option>
                                                    <option value="035">{t('jeju')}</option>
                                                    <option value="090">{t('kakaoBank')}</option>
                                                    <option value="089">{t('kBank')}</option>
                                                    <option value="092">{t('tossBank')}</option>
                                                    <option value="081">{t('hana')}</option>
                                                    <option value="027">{t('citibankKorea')}</option>
                                                    <option value="001">{t('bankofKorea')}</option>
                                                    <option value="003">{t('ibk')}</option>
                                                    <option value="004">{t('KbBank')}</option>
                                                    <option value="002">{t('kDB')}</option>
                                                    <option value="011">{t('nh')}</option>
                                                    <option value="023">{t('sc')}</option>
                                                </Field>
                                                <ErrorMessage name="bank_name" component="p" className="text-danger"/>
                                            </div>
                                            <div>
                                                <label>{t('accountNumber')}<span>*</span>:</label>
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
                                                <label>{t('accountHolder')}<span>*</span>:</label>
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
                                        }}>{t('edit')}
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
