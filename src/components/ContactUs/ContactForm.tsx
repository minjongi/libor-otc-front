"use client";

import React from "react";
import * as Yup from "yup";
import {regContact} from "@/utils/customerUtil";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {useTranslations} from "next-intl";

const ContactForm = () => {
    const t = useTranslations();
    const validationSchema = Yup.object().shape({
        name: Yup.string().required(t('validationEnterName')),
        email: Yup.string().required(t('validationEnterEmail')),
        title: Yup.string().required(t('validationEnterTitle')),
        content: Yup.string().required(t('validationEnterContent')),
    })

    return (
        <>
            <div className="contact-us-area-two ptb-120">
                <div className="container">
                    <Formik
                        initialValues={{name: '', email: '', title: '', content: ''}}
                        validationSchema={validationSchema}
                        onSubmit={async (values, {setSubmitting}) => {
                            setSubmitting(true)
                            await regContact(values)
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
                                                    <h3>{t('phoneSupport')}</h3>
                                                    <a
                                                        href="tel:+44(0506)2587485"
                                                        className="text-decoration-none"
                                                    >
                                                        +44 (0506) 258 7485
                                                    </a>
                                                    <span className="d-block">{t('phoneSupport_explain1')}</span>
                                                    <span className="d-block">{t('phoneSupport_explain2')}</span>
                                                </div>
                                                <div>
                                                    <h3>{t('emailUs')}</h3>
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
                                                    <span className="d-block">{t('response24')}</span>
                                                </div>
                                            </div>
                                            <h3>{t('officeHour')}</h3>
                                            <div className="d-flex justify-content-between gap-20 mb-40">
                                                <div>
                                                    <span className="d-block">{t('monToFri')}</span>
                                                    <span className="d-block">{t('sat')}</span>
                                                    <span className="d-block">{t('sun')}</span>
                                                    <span className="d-block">{t('publicHoliday')}</span>
                                                </div>
                                                <div>
                                                    <span className="d-block text-body">8:00 AM - 8:00 PM</span>
                                                    <span className="d-block text-body">9:00 AM - 6:00 PM</span>
                                                    <span className="d-block text-body">10:00 AM - 4:00 PM</span>
                                                    <span className="d-block text-body">{t('offday')}</span>
                                                </div>
                                            </div>

                                            <iframe
                                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d46830151.11795828!2d-119.8093025!3d44.24236485!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54eab584e432360b%3A0x1c3bb99243deb742!2sUnited%20States!5e0!3m2!1sen!2sbd!4v1759916893549!5m2!1sen!2sbd"
                                                style={{
                                                    border: "0",
                                                    width: "100%",
                                                    height: "310px",
                                                    borderRadius: "16px",
                                                }}
                                                allowFullScreen
                                                loading="lazy"
                                                referrerPolicy="no-referrer-when-downgrade"
                                            ></iframe>
                                        </div>
                                    </div>

                                    <div className="col-lg-6">
                                        <div className="contact-us-form">

                                            <div className="currency-input position-relative z-1">
                                                <label className="label">{t('name')}</label>
                                                <Field
                                                    name="name"
                                                    className="form-control"
                                                    placeholder={t('placeHolderName')}
                                                >
                                                </Field>
                                                <ErrorMessage
                                                    name="name"
                                                    component="p"
                                                    className="text-danger mt-2"
                                                />
                                            </div>

                                            <div className="currency-input position-relative z-1">
                                                <label className="label">{t('email')}</label>
                                                <Field
                                                    name="email"
                                                    className="form-control"
                                                    placeholder={t('validationEnterEmail')}
                                                >
                                                </Field>
                                                <ErrorMessage
                                                    name="email"
                                                    component="p"
                                                    className="text-danger mt-2"
                                                />
                                            </div>
                                            <div className="currency-input position-relative z-1">
                                                <label className="label">{t('title')}</label>
                                                <Field
                                                    name="title"
                                                    className="form-control"
                                                    placeholder={t('placeHolerTitle')}
                                                >
                                                </Field>
                                                <ErrorMessage
                                                    name="title"
                                                    component="p"
                                                    className="text-danger mt-2"
                                                />
                                            </div>

                                            <div className="currency-input position-relative z-1">
                                                <label className="label">{t('content')}</label>
                                                <Field
                                                    as="textarea"
                                                    name="content"
                                                    className="form-control"
                                                    placeholder={t('placeHolderContent')}
                                                    style={{height: "300px"}}
                                                />

                                                <ErrorMessage
                                                    name="content"
                                                    component="p"
                                                    className="text-danger mt-2"
                                                />
                                            </div>

                                            <button type="submit" className="btn btn-secondary w-100">
                                                {t('sendMessage')}
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

export default ContactForm;
