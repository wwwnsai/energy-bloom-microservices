import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PlusIcon } from "lucide-react";

const updateDeviceDatabase = (deviceName: string, room: string) => {
  const lowerCaseDevice = deviceName.toLowerCase();
  console.log(`Adding device: ${lowerCaseDevice} to room: ${room}`);
};

const AddDeviceSheet = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [deviceName, setDeviceName] = useState("Air Conditioner");
  const [selectedRoom, setSelectedRoom] = useState("Living Room");

  const toggleSheet = () => setIsOpen(!isOpen);

  const handleAddDevice = () => {
    updateDeviceDatabase(deviceName, selectedRoom);
    setIsOpen(false); 
  };

  return (
    <>
      {/* SHEET TRIGGER */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative z-10 flex justify-center items-center space-x-1 p-[0.9rem] w-full rounded-full transition-all duration-500 group bg-black hover:bg-white cursor-pointer"
        onClick={toggleSheet}
      >
        <PlusIcon className="text-white group-hover:text-black w-5 h-5" />
        <motion.p
          className="text-sm font-semibold text-white group-hover:text-black"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          Add Device
        </motion.p>
      </motion.div>

      {/* SLIDE-IN SHEET */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-y-0 right-0 w-1/3 bg-white text-black p-6 shadow-lg z-[1000] rounded-l-3xl"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {/* Sheet Header */}
            <div className="flex justify-between items-center mb-6">
              <motion.h2
                className="text-xl font-bold"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                Add New Device
              </motion.h2>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleSheet}
                className="text-gray-400 hover:text-gray-600"
              >
                Close
              </motion.button>
            </div>

            {/* DEVICE TYPE SELECTION */}
            <motion.div
              className="mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <label className="block text-gray-700 mb-2">Device Type</label>
              <motion.select
                whileHover={{ scale: 1.02 }}
                className="w-full p-3 rounded-lg bg-gray-50 text-black border border-gray-300 shadow-sm focus:ring-2 focus:ring-black focus:outline-none"
                value={deviceName}
                onChange={(e) => setDeviceName(e.target.value)}
              >
                <option value="Air Conditioner">Air Conditioner</option>
                <option value="Light & Bulb">Light & Bulb</option>
              </motion.select>
            </motion.div>

            {/* SELECT ROOM */}
            <motion.div
              className="mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <label className="block text-gray-700 mb-2">Select Room</label>
              <motion.select
                whileHover={{ scale: 1.02 }}
                className="w-full p-3 rounded-lg bg-gray-50 text-black border border-gray-300 shadow-sm focus:ring-2 focus:ring-black focus:outline-none"
                value={selectedRoom}
                onChange={(e) => setSelectedRoom(e.target.value)}
              >
                <option value="Living Room">Living Room</option>
                <option value="Bedroom">Bedroom</option>
              </motion.select>
            </motion.div>

            {/* ADD DEVICE BUTTON */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full bg-green-500 text-white py-3 rounded-full shadow-sm"
              onClick={handleAddDevice}
            >
              Add Device
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AddDeviceSheet;
