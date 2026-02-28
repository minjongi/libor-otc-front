export const menusData = [
    {
    title: "거래",
    dropdown: [
      { title: "간편 구매등록", href: "/services/regBuyCoin/" },
      { title: "간편 판매등록", href: "/services/regSellCoin/" },
      { title: "P2P 구매거래", href: "/p2pTrade/" },
      { title: "내역", href: "/p2pTrade/matching" }
    ],
  },
  {
    title: "마이페이지",
    dropdown: [
      { title: "내 정보", href: "/user-profile/" },
      { title: "내 자산", href: "/assets/" },
    ],
  },
  {
    title: "고객센터",
    dropdown: [
      { title: "공지사항", href: "/notice/" },
      { title: "FAQ", href: "/faqs/" },
      { title: "문의", href: "/inquiry/" },
      { title: "Contact Us", href: "/contact-us/" },
    ],
  }
];
