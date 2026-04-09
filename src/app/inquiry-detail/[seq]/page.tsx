import PageBanner from "@/components/Common/PageBanner";
import Navbar from "@/components/Layout/Navbar";
import InquiryDetailForm from "@/components/Inquiry-detail/Inquiry-detail";
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
                pageTitle={t('inQuiryDetails')}
                phoneNumber="+44 (0506) 258 7485"
                email="support24@libor-otc.com"
            />

            <InquiryDetailForm />

            <CommonFooter/>
        </>
    );
}
