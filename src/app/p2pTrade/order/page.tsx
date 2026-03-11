import Navbar from "@/components/Layout/Navbar";
import PageBanner from "@/components/Common/PageBanner";
import Footer from "@/components/Layout/Footer";
import P2pTradeOrder from "@/components/P2pTrade-order/P2pTrade-Order";

export default function Page() {
    return (
        <>
            <Navbar/>

            <PageBanner
                homePageUrl="/"
                homePageText="Home"
                pageTitle="내역"
                phoneNumber="+44 (0506) 258 7485"
                email="support24@libor-otc.com"
            />

            <P2pTradeOrder />

            <Footer/>
        </>
    );
}
