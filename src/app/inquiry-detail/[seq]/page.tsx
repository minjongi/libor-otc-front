import PageBanner from "@/components/Common/PageBanner";
import Footer from "@/components/Layout/Footer";
import Navbar from "@/components/Layout/Navbar";
import InquiryDetailForm from "@/components/Inquiry-detail/Inquiry-detail";
import CommonFooter from "@/components/CommonFooter/CommonFooter";


export default function Page() {
    return (
        <>
            <Navbar/>

            <PageBanner
                homePageUrl="/"
                homePageText="Home"
                pageTitle="문의내용"
                phoneNumber="+44 (0506) 258 7485"
                email="support24@libor-otc.com"
            />

            <InquiryDetailForm />

            <CommonFooter/>
        </>
    );
}
