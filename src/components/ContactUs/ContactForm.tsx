"use client";

import React from "react";
import * as Yup from "yup";
import {regContact} from "@/utils/customerUtil";
import {ErrorMessage, Field, Form, Formik} from "formik";

const ContactForm = () => {

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('이름을 입력해주세요.'),
    email: Yup.string().required('이메일을 입력해주세요.'),
    title: Yup.string().required('제목을 입력해주세요.'),
    content: Yup.string().required('내용을 입력해주세요.'),
  })

  return (
    <>
      <div className="contact-us-area-two ptb-120">
        <div className="container">
          <Formik
              initialValues={{name: '', email: '',title: '', content: ''}}
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
                            <span className="d-block text-body">8:00 AM - 8:00 PM</span>
                            <span className="d-block text-body">9:00 AM - 6:00 PM</span>
                            <span className="d-block text-body">
                      10:00 AM - 4:00 PM
                    </span>
                            <span className="d-block text-body">Closed</span>
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
                          <label className="label">이메일</label>
                          <Field
                              name="email"
                              className="form-control"
                              placeholder="이메일을 입력하세요."
                          >
                          </Field>
                          <ErrorMessage
                              name="email"
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
                            보내기
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
