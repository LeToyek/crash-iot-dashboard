// src/components/Dashboard.tsx

import { GoogleMap, MarkerF, useJsApiLoader } from "@react-google-maps/api";
import React, { useState } from "react";

// import image
// import truck from "../assets/delivery.png";
import truck from "../assets/truck.svg";

const mapContainerStyle = {
  width: "100%",
  height: "calc(100vh - 140px)", // Adjust height as needed
};

const bottomStyle = {
  maxHeight: "140px",
};

type Menu = {
  name: string;
  driverId: string;
  status: string;
  pinPosition: {
    lat: number;
    lng: number;
  };
};

const menuList: Menu[] = [
  {
    name: "Budi Truck",
    driverId: "zzqe9183",
    status: "active",
    pinPosition: {
      lat: -7.947337520508606,
      lng: 112.6171593146235,
    },
  },
  {
    name: "Maul Truck",
    driverId: "doask9183",
    status: "active",
    pinPosition: {
      lat: -7.949819503651353,
      lng: 112.61545228834466,
    },
  },
  {
    name: "Joko Truck",
    driverId: "zxczx9183",
    status: "Inactive",
    pinPosition: {
      lat: -7.943074949173004,
      lng: 112.61031304939335,
    },
  },
  {
    name: "Agus Truck",
    driverId: "zzqe9183",
    status: "active",
    pinPosition: {
      lat: -7.935246590039299,
      lng: 112.61667379674499,
    },
  },
  {
    name: "Tio Truck",
    driverId: "doask9183",
    status: "active",
    pinPosition: {
      lat: -7.936847149291131,
      lng: 112.62628903266187,
    },
  },
  {
    name: "Febri Truck",
    driverId: "zxczx9183",
    status: "active",
    pinPosition: {
      lat: -7.955978522682179, 
      lng: 112.61509187316861
    },
  },
];

const Dashboard: React.FC = () => {
  const [center, setCenter] = useState({
    lat: -7.947337520508606,
    lng: 112.6171593146235,
  });
  const [selected, setSelected] = useState<Menu | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const onButtonClick = (item: Menu, index: number) => {
    return (e: google.maps.MapMouseEvent) => {
      setSelected(item);
      setSelectedIndex(index);
      setCenter({
        lat: e.latLng!.lat(),
        lng: e.latLng!.lng(),
      });
    };
  };
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAP_API_KEY,
  });
  return (
    <div className="relative h-screen">
      <div className="absolute top-0 left-0 w-1/4 h-full bg-white z-10 shadow-sm rounded-lg">
        <h2 className="text-xl font-bold p-4 bg-sky-300 text-white">
          IOT Monitoring
        </h2>
        <ul>
          {menuList.map((item, index) => (
            <li
              key={index}
              className={`text-gray-800 hover:text-sky-500 bg-transparent p-4 shadow-sm 
                hover:shadow-md hover:shadow-sky-100 transition-shadow duration-300 cursor-pointer 
                flex items-center justify-between
                ${selectedIndex === index ? "bg-sky-100" : ""}`}
              onClick={onButtonClick(item, index)}
            >
              <div className="flex items-center">
                <img src={truck} alt="Logo" className="w-6 h-6 mr-4" />
                <div>
                  <div className="font-semibold">{item.name}</div>
                  <div className="text-sm text-gray-500">{item.driverId}</div>
                </div>
              </div>
              <div className="ml-4">
                <span
                  className={`px-2 py-1 text-xs font-medium rounded-full ${
                    item.status === "active"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {item.status}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="absolute top-0 right-0 w-3/4">
        {isLoaded ? (
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={center}
            zoom={10}
          >
            {menuList.map((item, index) => (
              <MarkerF
                key={index}
                icon={{
                  url: truck,
                  scaledSize: new window.google.maps.Size(30, 30),
                  origin: new window.google.maps.Point(0, 0),
                  anchor: new window.google.maps.Point(15, 15),
                }}
                clickable={true}
                title="Truck"
                cursor="pointer"
                children={item.name}
                onClick={onButtonClick(item, index)}
                position={item.pinPosition}
              ></MarkerF>
            ))}
          </GoogleMap>
        ) : (
          <>Loading</>
        )}
        {/* <LoadScript googleMapsApiKey="AIzaSyDabFLG2ySZzJFMjAeXzoJZrxcKc1KJEro">
        </LoadScript> */}
      </div>
      <div
        style={bottomStyle}
        className="absolute bottom-0 right-0 w-3/4 bg-white 
          p-4 z-10 justify-center flex items-center shadow-xl"
      >
        {selected ? (
          <table className="table-auto w-1/2">
            <tbody>
              <tr>
                <td className="font-semibold">Menu</td>
                <td>{selected.name}</td>
              </tr>
              <tr>
                <td className="font-semibold">Driver ID</td>
                <td>{selected.driverId}</td>
              </tr>
              <tr>
                <td className="font-semibold">Status</td>
                <td>
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full ${
                      selected.status === "active"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {selected.status}
                  </span>
                </td>
              </tr>
              <tr>
                <td className="font-semibold">LatLong</td>
                <td>
                  {selected.pinPosition.lat}, {selected.pinPosition.lng}
                </td>
              </tr>
            </tbody>
          </table>
        ) : (
          "Click on the truck to see details"
        )}
      </div>
    </div>
  );
};

export default Dashboard;
