import PageBanner from "@/components/Common/PageBanner";
import Footer from "@/components/Layout/Footer";
import Navbar from "@/components/Layout/Navbar";
import ServicesLists from "@/components/Services/ServicesLists";
import MoneyTransferRoutes from "@/components/Common/MoneyTransferRoutes";
import CurrencyConverter from "@/components/MoneyTransfer/CurrencyConverter";
import React from "react";
import BusinessPayments from "@/components/Business/BusinessPayments";
import ExpressRegisterBuyCoin from "@/components/ExpressBuySellCoin/ExpressRegisterBuyCoin";
import CommonFooter from "@/components/CommonFooter/CommonFooter";

export default function Page() {
  return (
    <>
      <Navbar />

      <PageBanner
        homePageUrl="/"
        homePageText="Home"
        pageTitle="간편 구매 등록"
        phoneNumber="+44 (0506) 258 7485"
        email="support24@libor-otc.com"
      />
        <ExpressRegisterBuyCoin />

        <CommonFooter/>
    </>
  );
}
