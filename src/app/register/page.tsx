import RegisterForm from "@/components/Auth/RegisterForm";
import PageBanner from "@/components/Common/PageBanner";
import Footer from "@/components/Layout/Footer";
import Navbar from "@/components/Layout/Navbar";

export default function Page() {
  return (
    <>
      <Navbar />

      <PageBanner
        homePageUrl="/"
        homePageText="Home"
        pageTitle="회원가입"
        phoneNumber="+44 (0506) 258 7485"
        email="support24@libor-otc.com"
      />

      <RegisterForm />

      <Footer />
    </>
  );
}
