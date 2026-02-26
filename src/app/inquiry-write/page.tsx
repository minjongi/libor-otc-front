
import Footer from "@/components/Layout/Footer";
import Navbar from "@/components/Layout/Navbar";
import InquiryWriteForm from "@/components/Inquiry-Write/Inquiry-write";
import PageBanner from "@/components/Common/PageBanner";


export default function Page() {
    return (
        <>
            <Navbar/>

            <PageBanner
                homePageUrl="/"
                homePageText="Home"
                pageTitle="문의 작성"
                phoneNumber="+44 (0506) 258 7485"
                email="support24@libor-otc.com"
            />

            <InquiryWriteForm />

            <Footer/>
        </>
    );
}
