import PageBanner from "@/components/Common/PageBanner";
import Footer from "@/components/Layout/Footer";
import Navbar from "@/components/Layout/Navbar";
import Notice from "@/components/Notice/Notice";

export default function Page() {
    return (
        <>
            <Navbar/>

            <PageBanner
                homePageUrl="/"
                homePageText="Home"
                pageTitle="공지사항"
                phoneNumber="+44 (0506) 258 7485"
                email="support24@libor-otc.com"
            />

            <Notice/>

            <Footer/>
        </>
    );
}
