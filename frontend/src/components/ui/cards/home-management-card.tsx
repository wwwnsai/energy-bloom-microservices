import { useState, useEffect } from "react";
import dayjs from "dayjs";
import Image from "next/image";
import { IconHome } from "@tabler/icons-react";

interface HomeManagementCardProps {
  username: string;
  backgroundImage: string;
  livingRoomImage: string;
  bedroomImage: string;
}

const HomeManagementCard = ({
  username,
  backgroundImage,
  livingRoomImage,
  bedroomImage,
}: HomeManagementCardProps) => {
  const [time, setTime] = useState(dayjs().format("hh:mm A"));
  const [activeTab, setActiveTab] = useState("Home");

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(dayjs().format("hh:mm A"));
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  // NOTE: Change the image based on the activeTab
  let imageUrl;
  switch (activeTab) {
    case "Living Room":
      imageUrl = livingRoomImage;
      break;
    case "Bedroom":
      imageUrl = bedroomImage;
      break;
    default:
      imageUrl = backgroundImage;
      break;
  }


  return (
    <div className="glass relative flex justify-between h-full w-full rounded-3xl bg-gray-100 p-5">
      <div className="w-[70%] flex flex-col">
        <h1 className="text-3xl font-bold text-black">{time}</h1>
        <div className="mt-1 text-md text-neutral-700">
          Welcome back, {username}
        </div>

        {/* TAB NAVIGATIONS */}
        <div className="mt-6 flex space-x-3">
          <button
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
              activeTab === "Home"
                ? "bg-white text-black"
                : "bg-gray-100 text-gray-500 hover:bg-white"
            }`}
            onClick={() => setActiveTab("Home")}
          >
            <IconHome size={20} />
          </button>
          <button
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
              activeTab === "Living Room"
                ? "bg-white text-black"
                : "bg-gray-100 text-gray-500 hover:bg-white"
            }`}
            onClick={() => setActiveTab("Living Room")}
          >
            Living Room
          </button>
          <button
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
              activeTab === "Bedroom"
                ? "bg-white text-black"
                : "bg-gray-100 text-gray-500 hover:bg-white"
            }`}
            onClick={() => setActiveTab("Bedroom")}
          >
            Bedroom
          </button>
        </div>

        {/* ROOM & DEVICE MANAGEMENT TABS */}
        {/* <div className="mt-6">
          {activeTab === "Living Room" && (
            <div>
              <p className="text-lg font-semibold text-black">
                Manage Your Living Room
              </p>
              <ul className="mt-2 text-gray-700 space-y-2">
                <li>Lights</li>
                <li>TV</li>
              </ul>
            </div>
          )}
          {activeTab === "Bedroom" && (
            <div>
              <p className="text-lg font-semibold text-black">
                Manage Your Bedroom
              </p>
              <ul className="mt-2 text-gray-700 space-y-2">
                <li>AC</li>
                <li>Lamp</li>
              </ul>
            </div>
          )}
        </div> */}
      </div>

      {/* CURRENT ROOM IMAGE */}
      <div
        className="w-full h-full rounded-2xl"
        style={{
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>
      {/* <div className="absolute top-5 right-5 w-[20rem] h-[10rem]">
        <Image
          src={imageUrl}
          alt={activeTab}
          className="object-cover w-full h-full rounded-2xl"
          width={400}
          height={100}
        />
      </div> */}
    </div>
  );
};

export default HomeManagementCard;
