import Navbar from "@/components/Layout/Navbar";
import InquiryWriteForm from "@/components/Inquiry-Write/Inquiry-write";
import PageBanner from "@/components/Common/PageBanner";
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
                pageTitle= {t('wirteInquiry')}
                phoneNumber="+44 (0506) 258 7485"
                email="support24@libor-otc.com"
            />

            <InquiryWriteForm />

            <CommonFooter/>
        </>
    );
}
