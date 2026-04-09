import Navbar from "@/components/Layout/Navbar";
import PageBanner from "@/components/Common/PageBanner";
import CommonFooter from "@/components/CommonFooter/CommonFooter";
import P2pTradeMatching from "@/components/P2pTrade-Matching/P2pTrade-Matching";
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

            <P2pTradeMatching />

            <CommonFooter/>
        </>
    );
}
