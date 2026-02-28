import LoginForm from "@/components/Auth/LoginForm";
import PageBanner from "@/components/Common/PageBanner";
import Footer from "@/components/Layout/Footer";
import Navbar from "@/components/Layout/Navbar";
import CommonFooter from "@/components/CommonFooter/CommonFooter";

export default function Page() {
    return (
        <>
            <Navbar/>

            <PageBanner
                homePageUrl="/"
                homePageText="Home"
                pageTitle="로그인"
                phoneNumber="+44 (0506) 258 7485"
                email="support24@libor-otc.com"
            />

            <LoginForm/>

            <CommonFooter/>
        </>
    );
}
