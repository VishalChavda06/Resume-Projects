import React from "react";
import { Link } from "react-router";
import "../styles/LocationPage.css";

const LocationPage = () => {
  return (
    <>
      <div className="bg-[url('https://gearo-html.vercel.app/images/page-title/page-title-8.jpg')] bg-fixed h-[250px] text-white py-12">
        <div className="max-w-[1400px] mx-auto px-8">
          <h1 className="text-4xl font-semibold mb-2">Store List</h1>
          <div className="text-base text-white">
            <Link to="/" className="hover:underline">
              Homepage
            </Link>{" "}
            <span>&gt;</span> <span>Page</span> <span>&gt;</span>{" "}
            <span>Store List</span>
          </div>
        </div>
      </div>

      {/* Locations Shop's */}
      <div className=" mt-20 mx-20 flex justify-between p-2 mb-10 ">
        <div className=" w-[33%] p-2">
          <img
            src="https://gearonextjs.vercel.app/images/banner/banner-location-1.jpg"
            className="w-[100%] rounded-xl location-img"
            alt=""
          />
          <div className="text-center p-4 flex flex-col gap-2">
            <h5>01. New York Store</h5>
            <p>789 Madison Avenue, New York, New York</p>
            <p>Phone: +1 212 456 7890</p>
            <p>Email: example@example.com</p>
            <a href="#">Get Directions</a>
          </div>
        </div>
        <div className=" w-[33%] p-2">
          <img
            src="https://gearonextjs.vercel.app/images/banner/banner-location-2.jpg"
            className="w-[100%] rounded-xl location-img"
            alt=""
          />
          <div className="text-center p-4 flex flex-col gap-2">
            <h5>01. New York Store</h5>
            <p>789 Madison Avenue, New York, New York</p>
            <p>Phone: +1 212 456 7890</p>
            <p>Email: example@example.com</p>
            <a href="#">Get Directions</a>
          </div>
        </div>
        <div className=" w-[33%] p-2">
          <img
            src="https://gearonextjs.vercel.app/images/banner/banner-location-3.jpg"
            className="w-[100%] rounded-xl location-img"
            alt=""
          />
          <div className="text-center p-4 flex flex-col gap-2">
            <h5>01. New York Store</h5>
            <p>789 Madison Avenue, New York, New York</p>
            <p>Phone: +1 212 456 7890</p>
            <p>Email: example@example.com</p>
            <a href="#">Get Directions</a>
          </div>
        </div>
      </div>
    </>
  );
};

export default LocationPage;
