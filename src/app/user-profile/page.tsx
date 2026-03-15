
import Navbar from "@/components/Layout/Navbar";
import PageBanner from "@/components/Common/PageBanner";
import Footer from "@/components/Layout/Footer";
import UserProfile from "@/components/User-Profile/User-Profile";

export default function Page() {
    return (
        <>
            <Navbar/>

            <PageBanner
                homePageUrl="/"
                homePageText="Home"
                pageTitle="내 정보"
                phoneNumber="+44 (0506) 258 7485"
                email="support24@libor-otc.com"
            />

            <UserProfile />

            <Footer/>
        </>
    );
}
