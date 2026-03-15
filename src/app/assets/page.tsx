import Navbar from "@/components/Layout/Navbar";
import PageBanner from "@/components/Common/PageBanner";
import Footer from "@/components/Layout/Footer";
import Assets from "@/components/Assets/Assets";

export default function Page() {
    return (
        <>
            <Navbar/>

            <PageBanner
                homePageUrl="/"
                homePageText="Home"
                pageTitle="내 자산"
                phoneNumber="+44 (0506) 258 7485"
                email="support24@libor-otc.com"
            />

            <Assets />

            <Footer/>
        </>
    );
}
