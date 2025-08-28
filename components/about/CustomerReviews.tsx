import React from "react";
import { FaQuoteLeft, FaUserCircle } from "react-icons/fa";

const customerReviews = [
  {
    id: 1,
    content:
      "Arabayı rezerve etmek çok kolaydı. Araç temizdi ve yolculuğumuz boyunca hiçbir sorun yaşamadık. Kesinlikle tekrar tercih edeceğim!",
    image: <FaUserCircle className="text-[70px] text-amber-500" />,
    name: "Osman Gündüz",
  },
  {
    id: 2,
    content:
      "Hızlı teslimat ve mükemmel müşteri hizmetleri. Tüm süreç sorunsuz ilerledi. Çok memnun kaldım.",
    image: <FaUserCircle className="text-[70px] text-blue-500" />,
    name: "Elif Kaya",
  },
  {
    id: 3,
    content:
      "Fiyat/performans açısından harika bir deneyimdi. Araç çok konforluydu ve tam istediğimiz gibiydi.",
    image: <FaUserCircle className="text-[70px] text-green-500" />,
    name: "Mehmet Demir",
  },
];

const CustomerReviews = () => {
  return (
    <div className="w-full flex flex-col py-15 gap-10">
      <h1 className="font-bold text-[50px] w-full text-center">
        Reviews from our customers
      </h1>
      <div className="w-full grid grid-cols-3 gap-6">
        {customerReviews.map((review, idx) => (
          <div
            key={`${review.name} - ${idx}`}
            className="w-full bg-gray-100 flex flex-col justify-between rounded-2xl gap-4"
          >
            <div className="p-8 w-full flex flex-col gap-4">
              <FaQuoteLeft className="text-violet-800 text-[30px]" />
              <p className="font-medium text-[20px]">{review.content}</p>
            </div>

            <div className="bg-violet-800 w-full rounded-b-2xl p-8 items-center flex justify-center relative">
              <div className="absolute -top-10">{review.image}</div>
              <h1 className="mt-4 font-semibold text-[20px] text-white">
                {review.name}
              </h1>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerReviews;
