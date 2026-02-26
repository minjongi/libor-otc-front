import PageBanner from "@/components/Common/PageBanner";
import Footer from "@/components/Layout/Footer";
import Navbar from "@/components/Layout/Navbar";
import Inquiry from "@/components/Inquiry/Inquiry";

export default function Page() {
    return (
        <>
            <Navbar/>

            <PageBanner
                homePageUrl="/"
                homePageText="Home"
                pageTitle="문의사항"
                phoneNumber="+44 (0506) 258 7485"
                email="support24@libor-otc.com"
            />

            <Inquiry/>

            <Footer/>
        </>
    );
}
