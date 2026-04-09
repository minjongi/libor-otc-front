import Navbar from "@/components/Layout/Navbar";
import PageBanner from "@/components/Common/PageBanner";
import Footer from "@/components/Layout/Footer";
import UserProfile from "@/components/User-Profile/User-Profile";
import {useTranslations} from "next-intl";

export default function Page() {
    const t = useTranslations();
    return (
        <>
            <Navbar/>

            <PageBanner
                homePageUrl="/"
                homePageText="Home"
                pageTitle={t('myInfo')}
                phoneNumber="+44 (0506) 258 7485"
                email="support24@libor-otc.com"
            />

            <UserProfile />

            <Footer/>
        </>
    );
}
