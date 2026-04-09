import Navbar from "@/components/Layout/Navbar";
import PageBanner from "@/components/Common/PageBanner";
import CommonFooter from "@/components/CommonFooter/CommonFooter";
import P2pTradeOrder from "@/components/P2pTrade-order/P2pTrade-Order";
import {useTranslations} from "next-intl";

export default function Page() {
    const t = useTranslations();
    return (
        <>
            <Navbar/>

            <PageBanner
                homePageUrl="/"
                homePageText="Home"
                pageTitle={t('transactionHistory')}
                phoneNumber="+44 (0506) 258 7485"
                email="support24@libor-otc.com"
            />

            <P2pTradeOrder />

            <CommonFooter/>
        </>
    );
}
