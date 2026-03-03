import Navbar from "@/components/Layout/Navbar";
import PageBanner from "@/components/Common/PageBanner";
import Footer from "@/components/Layout/Footer";
import P2pTradeMatchingDetail from "@/components/P2pTrade-Matching/P2pTrade-Matching-detail";

export default function Page() {
    return (
        <>
            <Navbar/>

            <PageBanner
                homePageUrl="/"
                homePageText="Home"
                pageTitle="거래정보"
                phoneNumber="+44 (0506) 258 7485"
                email="support24@libor-otc.com"
            />

            <P2pTradeMatchingDetail />

            <Footer/>
        </>
    );
}
