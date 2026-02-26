"use client";

import React from "react";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {regInquiry} from "@/utils/customerUtil";
import * as Yup from "yup";

const InquiryWriteForm = () => {

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('이름을 입력해주세요.'),
        title: Yup.string().required('제목을 입력해주세요.'),
        content: Yup.string().required('내용을 입력해주세요.'),
    })

    return (
        <>
            <div className="contact-us-area-two ptb-120">
                <div className="container">
                    <Formik
                        initialValues={{name: '', title: '', content: ''}}
                        validationSchema={validationSchema}
                        onSubmit={async (values, {setSubmitting}) => {
                            setSubmitting(true)
                            await regInquiry(values)
                            setSubmitting(false)
                        }}
                    >
                        {({values}) => (
                            <Form>
                                <div className="row g-4">
                                    <div className="col-lg-6">
                                        <div className="contact-us-info">
                                            <div className="d-flex justify-content-between gap-20 mb-40">
                                                <div>
                                                    <h3>Phone Support</h3>
                                                    <a
                                                        href="tel:+44(0506)2587485"
                                                        className="text-decoration-none"
                                                    >
                                                        +44 (0506) 258 7485
                                                    </a>
                                                    <span className="d-block">Monday-Friday: 8am-8pm</span>
                                                    <span className="d-block">Saturday: 9am-6pm</span>
                                                </div>
                                                <div>
                                                    <h3>Email Us</h3>
                                                    <a
                                                        href="mailto:info@libor.com"
                                                        className="text-decoration-none"
                                                    >
                                                        info@libor.com
                                                    </a>
                                                    <a
                                                        href="mailto:support@libor.com"
                                                        className="text-decoration-none"
                                                    >
                                                        support@libor.com
                                                    </a>
                                                    <span className="d-block">We respond within 24 hours</span>
                                                </div>
                                            </div>
                                            <h3>Office Hours</h3>
                                            <div className="d-flex justify-content-between gap-20 mb-40">
                                                <div>
                                                    <span className="d-block">Monday - Friday</span>
                                                    <span className="d-block">Saturday</span>
                                                    <span className="d-block">Sunday</span>
                                                    <span className="d-block">Public Holidays</span>
                                                </div>
                                                <div>
                                                    <span className="d-block text-body"> 8:00 AM - 8:00 PM</span>
                                                    <span className="d-block text-body"> 9:00 AM - 6:00 PM</span>
                                                    <span className="d-block text-body"> 10:00 AM - 4:00 PM</span>
                                                    <span className="d-block text-body">Closed</span>
                                                </div>
                                            </div>

                                            <img
                                                src="/images/service1.jpg"
                                                style={{
                                                    border: "0",
                                                    width: "100%",
                                                    height: "310px",
                                                    borderRadius: "16px",
                                                }}
                                            ></img>
                                        </div>
                                    </div>

                                    <div className="col-lg-6">
                                        <div className="contact-us-form h-100">
                                            <h3>문의 작성</h3>
                                            <div className="currency-input position-relative z-1">
                                                <label className="label">이름</label>
                                                <Field
                                                    name="name"
                                                    className="form-control"
                                                    placeholder="이름을 입력하세요."
                                                >
                                                </Field>
                                                <ErrorMessage
                                                    name="name"
                                                    component="p"
                                                    className="text-danger mt-2"
                                                />
                                            </div>
                                            <div className="currency-input position-relative z-1">
                                                <label className="label">제목</label>
                                                <Field
                                                    name="title"
                                                    className="form-control"
                                                    placeholder="제목을 입력하세요."
                                                >
                                                </Field>
                                                <ErrorMessage
                                                    name="title"
                                                    component="p"
                                                    className="text-danger mt-2"
                                                />
                                            </div>

                                            <div className="currency-input position-relative z-1">
                                                <label className="label">내용</label>

                                                <Field
                                                    as="textarea"
                                                    name="content"
                                                    className="form-control"
                                                    placeholder="문의 내용을 입력하세요."
                                                    style={{height: "300px"}}
                                                />

                                                <ErrorMessage
                                                    name="content"
                                                    component="p"
                                                    className="text-danger mt-2"
                                                />
                                            </div>
                                            <button type="submit" className="btn btn-secondary w-100">
                                                문의 등록
                                            </button>

                                        </div>
                                    </div>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </>
    );
};

export default InquiryWriteForm;
