import PageBanner from "@/components/Common/PageBanner";
import Navbar from "@/components/Layout/Navbar";
import React from "react";
import ExpressRegisterBuyCoin from "@/components/ExpressBuySellCoin/ExpressRegisterBuyCoin";
import CommonFooter from "@/components/CommonFooter/CommonFooter";
import {useTranslations} from "next-intl";

export default function Page() {
    const t = useTranslations();
  return (
    <>
      <Navbar />

      <PageBanner
        homePageUrl="/"
        homePageText="Home"
        pageTitle= {t('expressRegBuy')}
        phoneNumber="+44 (0506) 258 7485"
        email="support24@libor-otc.com"
      />
        <ExpressRegisterBuyCoin />

        <CommonFooter/>
    </>
  );
}
