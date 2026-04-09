import React from "react";
import Image from "next/image";
import Link from "next/link";
import {useTranslations} from "next-intl";

const Footer = () => {
    const t = useTranslations();
    const contactInfo = [
        {
            id: 1,
            type: "address",
            value: "123 Financial Street, London, EC2A 4AB, United Kingdom",
        },
        {
            id: 2,
            type: "phone",
            value: "+44 (0506) 258 7485",
            link: "tel:+44(0506)2587485",
        },
        {
            id: 3,
            type: "email",
            value: "support24@libor-otc.com",
            link: "support24@libor-otc.com",
        },
    ];

    // Define company links data
    const companyLinks = [
        { id: 1, text: t('expressRegBuy'), href: "/services/regBuyCoin" },
        { id: 2, text: t('expressRegSell'), href: "/services/regSellCoin" },
        { id: 3, text: t('p2pTrading') , href: "/p2pTrade" },
        { id: 4, text: t('transactionHistory'), href: "/pricing/matching" },
    ];

    // Define explore links data
    const exploreLinks = [
        { id: 1, text: t('notice'), href: "/notice" },
        { id: 2, text: t('faq'), href: "/faqs" },
        { id: 3, text: t('inquiry'), href: "/inquiry" },
        { id: 4, text: t('contact'), href: "/contact-us" }
    ];

    return (
        <>
            <div className="footer-area pt-120 pb-4">
                <div className="container">
                    <div className="row g-4">
                        <div className="col-lg-3 col-sm-6">
                            <div className="footer-single-widget">
                                <div className="logo-wrap">
                                    <Image
                                        src="/images/libor-logo-black.png"
                                        className="d-block"
                                        alt="logo-black"
                                        width={232}
                                        height={50}
                                    />
                                    <Image
                                        src="/images/libor-logo.png"
                                        className="d-none"
                                        alt="logo"
                                        width={232}
                                        height={50}
                                    />
                                </div>

                                <p>{t('footer_explain_1')}</p>
                            </div>
                        </div>

                        <div className="col-lg-3 col-sm-6">
                            <div className="footer-single-widget">
                                <h3>{t('footer_contactInfo')}</h3>

                                <ul className="p-0 m-0 list-unstyled contact-list">
                                    {contactInfo.map((info) => (
                                        <li key={info.id}>
                                            {info.type === "address" ? (
                                                <p>{info.value}</p>
                                            ) : (
                                                <>
                                                    <p className="mb-0">
                                                        {info.type === "phone" ? "Call us" : "Email"}
                                                    </p>
                                                    <a
                                                        href={info.link}
                                                        className="text-decoration-none fw-bold"
                                                    >
                                                        {info.value}
                                                    </a>
                                                </>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className="col-lg-3 col-sm-6">
                            <div className="footer-single-widget">
                                <h3>{t('myPage')}</h3>

                                <ul className="p-0 m-0 list-unstyled import-link">
                                    {companyLinks.map((link) => (
                                        <li key={link.id}>
                                            <Link
                                                href={link.href}
                                                className="d-flex align-items-center text-decoration-none"
                                            >
                                                <i className="ri-arrow-right-double-line"></i>
                                                <span>{link.text}</span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className="col-lg-3 col-sm-6">
                            <div className="footer-single-widget">
                                <h3>{t('customerSupport')}</h3>

                                <ul className="p-0 m-0 list-unstyled import-link">
                                    {exploreLinks.map((link) => (
                                        <li key={link.id}>
                                            <Link
                                                href={link.href}
                                                className="d-flex align-items-center text-decoration-none"
                                            >
                                                <i className="ri-arrow-right-double-line"></i>
                                                <span>{link.text}</span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="pt-110"></div>


                    <p className="copyright-content mb-0 text-center">
                        Copyright @<span>LIBOR</span>. All Rights Reserved by{" "}
                        <a
                            href="https://envytheme.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            EnvyTheme
                        </a>
                    </p>
                </div>
            </div>
        </>
    );
};

export default Footer;
