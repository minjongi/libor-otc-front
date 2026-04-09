"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {useTranslations} from "next-intl";

// Define TypeScript interface for FAQ items
interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

const FaqContent = () => {
  const t = useTranslations();
  const [openAccordionId, setOpenAccordionId] = useState<number>(1);

  const faqItems: FAQItem[] = [
    {
      id: 1,
      question: t('faq_h1'),
      answer: t('faq_p1'),
    },
    {
      id: 2,
      question: t('faq_h2'),
      answer: t('faq_p2'),
    },
    {
      id: 3,
      question: t('faq_h3'),
      answer: t('faq_p3'),
    },
    {
      id: 4,
      question: t('faq_h4'),
      answer: t('faq_p4'),
    },
    {
      id: 5,
      question: t('faq_h5'),
      answer: t('faq_p5'),
    },
  ];

  // Toggle accordion function
  const toggleAccordion = (id: number) => {
    setOpenAccordionId(openAccordionId === id ? 0 : id);
  };

  return (
    <>
      <div className="faq-area ptb-120">
        <div className="container">
          <div className="row">
            <div className="col-lg-4">
              <div className="faq-img">
                <Image
                  src="/images/faq.jpg"
                  className="mb-4 ukiyo"
                  alt="faq"
                  width={848}
                  height={900}
                />
                <p>
                  Do you still need help?{" "}
                  <Link
                    href="/contact-us"
                    className="text-primary text-decoration-none"
                  >
                    Contact our specialists
                  </Link>{" "}
                  - we&apos;re happy to help!
                </p>
              </div>
            </div>

            <div className="col-lg-8">
              <div className="faq-content">
                <div className="mb-40">
                  <h1 className="main-title style-two ms-0">
                    {t('frequentlyAskedQuestions')}
                  </h1>
                </div>

                <div className="accordion faq-wrapper">
                  {faqItems.map((item) => (
                    <div key={item.id} className="accordion-item border-0">
                      <h2 className="accordion-header">
                        <button
                          className={`accordion-button text-secondary ${
                            openAccordionId === item.id ? "" : "collapsed"
                          }`}
                          type="button"
                          onClick={() => toggleAccordion(item.id)}
                        >
                          {item.question}
                        </button>
                      </h2>
                      <div
                        className={`accordion-collapse collapse ${
                          openAccordionId === item.id ? "show" : ""
                        }`}
                      >
                        <div className="accordion-body">
                          <p>
                            <span className="fw-semibold text-secondary">
                              Ans:
                            </span>{" "}
                            {item.answer}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FaqContent;
