"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import MobileMenuModal from "@/components/Layout/MobileMenuModal";
import { menusData } from "@/components/Layout/MenusData";
import { useTranslations } from "use-intl";
import { getCookie, setCookie } from "cookies-next";

// Define menu item types
type MenuItem = {
  title: string;
  href?: string;
  dropdown?: MenuItem[];
};

interface MenuItemsProps {
  items: MenuItem[];
  pathname: string;
  level?: number;
}

function MenuItems({ items, pathname, level = 0 }: MenuItemsProps) {
  return (
      <ul className={level === 0 ? "navbar-nav m-auto" : "dropdown-menu"}>
        {items.map((item, index) => {
          const isActive = item.href === pathname;

          if (item.dropdown) {
            return (
                <li key={index} className={level === 0 ? "nav-item dropdown" : undefined}>
                  <Link
                      className={`${level === 0 ? "nav-link" : "dropdown-item"} dropdown-toggle`}
                      href="#"
                      onClick={(e) => e.preventDefault()}
                  >
                    {item.title}
                  </Link>

                  <MenuItems
                      items={item.dropdown}
                      pathname={pathname}
                      level={level + 1}
                  />
                </li>
            );
          }

          return (
              <li key={index} className={level === 0 ? "nav-item" : undefined}>
                <Link
                    href={item.href ?? "#"}
                    className={`${level === 0 ? "nav-link" : "dropdown-item"} ${
                        isActive ? "active" : ""
                    }`}
                >
                  {item.title}
                </Link>
              </li>
          );
        })}
      </ul>
  );
}

function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations();

  const [isSticky, setIsSticky] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [locale, setLocaleState] = useState("en");

  useEffect(() => {
    const cookieLocale = getCookie("locale") as string;
    setLocaleState(cookieLocale || "en");
  }, []);

  function changeLocale(newLocale: string) {
    setCookie("locale", newLocale, { path: "/" });
    setLocaleState(newLocale);

    router.refresh();
  }

  // sticky
  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 100);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // close mobile menu on route change
  useEffect(() => {
    setShowMobileMenu(false);
  }, [pathname]);

  return (
      <>
        <nav
            className={`navbar navbar-expand-lg fixed-top top-0 bg-transparent ${
                isSticky ? "sticky" : ""
            }`}
        >
          <div className="container mw-1680">
            <Link className="navbar-brand" href="/">
              <Image
                  src="/images/libor-logo.png"
                  alt="logo"
                  width={232}
                  height={50}
              />
            </Link>

            <div className="collapse navbar-collapse">
              <MenuItems items={menusData} pathname={pathname} />
            </div>

            {/* Options */}
            <div className="others-options d-flex align-items-center">
              <select
                  value={locale}
                  onChange={(e) => changeLocale(e.target.value)}
                  style={{
                    padding: "6px 10px",
                    borderRadius: "6px",
                    border: "1px solid #ccc",
                    background: "#fff",
                  }}
              >
                <option value="ko">한국</option>
                <option value="en">영어</option>
                <option value="ja">일본어</option>
                <option value="zh">중국어</option>
              </select>

              <div className="d-flex align-items-center info">
                <Link href="/login">{t("logIn")}</Link>
              </div>

              <Link href="/register" className="btn d-none d-sm-inline-block">
                회원가입
              </Link>

              <button
                  type="button"
                  className="navbar-toggler p-0"
                  onClick={() => setShowMobileMenu(true)}
              >
              <span className="burger-menu">
                <span className="top-bar"></span>
                <span className="middle-bar"></span>
                <span className="bottom-bar"></span>
              </span>
              </button>
            </div>
          </div>
        </nav>

        <MobileMenuModal
            onClose={() => setShowMobileMenu(false)}
            showMobileMenu={showMobileMenu}
        />
      </>
  );
}

export default Navbar;