import PageBanner from "@/components/Common/PageBanner";
import ContactForm from "@/components/ContactUs/ContactForm";
import {useTranslations} from "next-intl";
import Navbar from "@/components/Layout/Navbar";
import CommonFooter from "@/components/CommonFooter/CommonFooter";

export default function Page() {
    const t = useTranslations();
    return (
        <>
            <Navbar/>

            <PageBanner
                homePageUrl="/"
                homePageText="Home"
                pageTitle= {t('contact')}
                phoneNumber="+44 (0506) 258 7485"
                email="information@libor.com"
            />

            <ContactForm/>

            <CommonFooter/>
        </>
    );
}
