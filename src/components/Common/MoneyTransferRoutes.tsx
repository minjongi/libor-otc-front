import React from "react";
import Image from "next/image";

const MoneyTransferRoutes = () => {
  // Define transfer routes data
  const transferRoutes = [
    {
      id: 1,
      fromCountry: {
        id: 1,
        name: "Germany",
        flag: "/images/flags/germany.png",
      },
      toCountry: {
        id: 2,
        name: "Turkey",
        flag: "/images/flags/turkey.png",
      },
      transferTime: "1 hour",
    },
    {
      id: 2,
      fromCountry: {
        id: 3,
        name: "Canada",
        flag: "/images/flags/canada1.png",
      },
      toCountry: {
        id: 4,
        name: "Philippines",
        flag: "/images/flags/philippines.png",
      },
      transferTime: "25 minutes",
    },
    {
      id: 3,
      fromCountry: {
        id: 5,
        name: "United Kingdom",
        flag: "/images/flags/united-kingdom1.png",
      },
      toCountry: {
        id: 6,
        name: "Nigeria",
        flag: "/images/flags/nigeria.png",
      },
      transferTime: "30 minutes",
    },
    {
      id: 4,
      fromCountry: {
        id: 7,
        name: "Australia",
        flag: "/images/flags/australia1.png",
      },
      toCountry: {
        id: 8,
        name: "Vietnam",
        flag: "/images/flags/vietnam.png",
      },
      transferTime: "45 minutes",
    },
    {
      id: 5,
      fromCountry: {
        id: 9,
        name: "Argentina",
        flag: "/images/flags/argentina.png",
      },
      toCountry: {
        id: 10,
        name: "Egypt",
        flag: "/images/flags/egypt.png",
      },
      transferTime: "30 minutes",
    },
    {
      id: 6,
      fromCountry: {
        id: 11,
        name: "Spain",
        flag: "/images/flags/spain.png",
      },
      toCountry: {
        id: 12,
        name: "UAE",
        flag: "/images/flags/united-arab-emirates1.png",
      },
      transferTime: "1 hour",
    },
    {
      id: 7,
      fromCountry: {
        id: 13,
        name: "United States",
        flag: "/images/flags/united-states1.png",
      },
      toCountry: {
        id: 14,
        name: "Thailand",
        flag: "/images/flags/thailand.png",
      },
      transferTime: "40 Minutes",
    },
    {
      id: 8,
      fromCountry: {
        id: 15,
        name: "Denmark",
        flag: "/images/flags/denmark.png",
      },
      toCountry: {
        id: 16,
        name: "Georgia",
        flag: "/images/flags/georgia.png",
      },
      transferTime: "2 hour",
    },
    {
      id: 9,
      fromCountry: {
        id: 17,
        name: "Greece",
        flag: "/images/flags/greece.png",
      },
      toCountry: {
        id: 18,
        name: "Hong Kong",
        flag: "/images/flags/hong-kong.png",
      },
      transferTime: "3 hour",
    },
    {
      id: 10,
      fromCountry: {
        id: 19,
        name: "Italy",
        flag: "/images/flags/italy1.png",
      },
      toCountry: {
        id: 20,
        name: "Kenya",
        flag: "/images/flags/kenya.png",
      },
      transferTime: "4 hour",
    },
    {
      id: 11,
      fromCountry: {
        id: 21,
        name: "Japan",
        flag: "/images/flags/japan1.png",
      },
      toCountry: {
        id: 22,
        name: "Malta",
        flag: "/images/flags/malta.png",
      },
      transferTime: "20 Minutes",
    },
    {
      id: 12,
      fromCountry: {
        id: 23,
        name: "Portugal",
        flag: "/images/flags/portugal.png",
      },
      toCountry: {
        id: 24,
        name: "Uganda",
        flag: "/images/flags/uganda.png",
      },
      transferTime: "3 hour",
    },
  ];

  return (
    <>
      <div className="frequently-area pb-120">
        <div className="container">
          <h2 className="main-title style-two text-center mb-40">
            These are our most frequently used <span>money transfer</span>{" "}
            routes
          </h2>

          <div className="row g-4">
            {transferRoutes.map((route) => (
              <div key={route.id} className="col-xl-3 col-lg-4 col-sm-6">
                <div className="frequently-single-item">
                  <div className="d-flex align-items-center gap-10">
                    <div className="flex-shrink-0">
                      <div className="d-flex gap-10">
                        <Image
                          src={route.fromCountry.flag}
                          alt={route.fromCountry.name}
                          width={25}
                          height={25}
                        />
                        <Image
                          src={route.toCountry.flag}
                          alt={route.toCountry.name}
                          width={25}
                          height={25}
                        />
                      </div>
                    </div>
                    <div className="flex-grow-1">
                      <h3>
                        {route.fromCountry.name} to {route.toCountry.name}
                      </h3>
                      <span>Average transfer time: {route.transferTime}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default MoneyTransferRoutes;
