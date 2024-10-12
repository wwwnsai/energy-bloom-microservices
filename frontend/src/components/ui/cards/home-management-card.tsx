import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import { motion, AnimatePresence } from "framer-motion";
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

  // Change the image based on the activeTab
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
    <motion.div
      className="glass relative flex justify-between h-full w-full rounded-3xl bg-gray-100 p-5"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="w-[70%] flex flex-col">
        {/* Animated Time */}
        <motion.h1
          className="text-3xl font-bold text-black"
          key={time}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {time}
        </motion.h1>

        <motion.div
          className="mt-1 text-md text-neutral-700"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          Welcome back, {username}
        </motion.div>

        {/* TAB NAVIGATIONS */}
        <div className="mt-6 flex space-x-3">
          <motion.button
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
              activeTab === "Home"
                ? "bg-white text-black"
                : "bg-gray-100 text-gray-500 hover:bg-white"
            }`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveTab("Home")}
          >
            <IconHome size={20} />
          </motion.button>

          <motion.button
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
              activeTab === "Living Room"
                ? "bg-white text-black"
                : "bg-gray-100 text-gray-500 hover:bg-white"
            }`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveTab("Living Room")}
          >
            Living Room
          </motion.button>

          <motion.button
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
              activeTab === "Bedroom"
                ? "bg-white text-black"
                : "bg-gray-100 text-gray-500 hover:bg-white"
            }`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveTab("Bedroom")}
          >
            Bedroom
          </motion.button>
        </div>
      </div>

      {/* Animated Background Image */}
      <motion.div
        className="w-full h-full rounded-2xl"
        key={imageUrl} // Changing the key allows it to animate
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        style={{
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></motion.div>
    </motion.div>
  );
};

export default HomeManagementCard;
