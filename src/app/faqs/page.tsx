import PageBanner from "@/components/Common/PageBanner";
import FaqContent from "@/components/Faq/FaqContent";
import Navbar from "@/components/Layout/Navbar";
import CommonFooter from "@/components/CommonFooter/CommonFooter";
import {useTranslations} from "next-intl";

export default function Page() {
    const t = useTranslations();
    return (
        <>
            <Navbar/>

            <PageBanner
                homePageUrl="/"
                homePageText="Home"
                pageTitle="FAQ's"
                phoneNumber="+44 (0506) 258 7485"
                email="support24@libor-otc.com"
            />

            <FaqContent/>

            <CommonFooter/>
        </>
    );
}
