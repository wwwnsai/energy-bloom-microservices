import { useState } from "react";
import { IconChevronRight, IconTrash } from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/utils/cn";

interface DeviceTabProps {
  title: string;
  count: number;
  devices: string[];
  icon?: React.JSX.Element | React.ReactNode;
  onDelete: (device: string) => void;
  disabledClick?: boolean;
}

const DeviceTab = ({
  title,
  count,
  devices,
  icon,
  onDelete,
  disabledClick,
}: DeviceTabProps) => {
  const [isDeviceSelectionOpen, setIsDeviceSelectionOpen] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState("");

  const handleDeviceSelect = (device: string) => {
    setSelectedDevice(device);
    setIsDeviceSelectionOpen(false);
    setIsPopupOpen(true);
  };

  const handleDelete = () => {
    onDelete(selectedDevice);
    setIsPopupOpen(false);
  };

  return (
    <>
      {/* Device Tab - Open device selection on click */}
      <div
        className="relative z-10 flex justify-between items-center gap-4 p-2 w-full rounded-full transition-all duration-500 group hover:bg-white cursor-pointer"
        onClick={() => !disabledClick && setIsDeviceSelectionOpen(true)}
      >
        <div className="flex justify-center items-center bg-white rounded-full w-14 h-14 transition-colors duration-500 group-hover:bg-neutral-200">
          {icon && icon}
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-sm font-semibold text-black">{title}</p>
          <p className="text-sm font-normal text-neutral-500">
            {count} {count > 1 ? "devices" : "device"}
          </p>
        </div>

          <IconChevronRight className={cn("text-neutral-700 h-4 w-4 ml-auto", disabledClick && "text-transparent")} />
      </div>

      {/* Device Selection Modal */}
      <AnimatePresence>
        {isDeviceSelectionOpen && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsDeviceSelectionOpen(false)}
          >
            <motion.div
              className="bg-white p-6 rounded-lg shadow-lg w-[400px] text-center"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-lg font-bold mb-4">
                Select Device to Delete
              </h2>
              <div className="flex flex-col gap-3 mt-6">
                {devices.map((device, index) => (
                  <button
                    key={index}
                    className="bg-gray-200 hover:bg-gray-300 text-black px-4 py-2 rounded-lg"
                    onClick={() => handleDeviceSelect(device)}
                  >
                    {device}
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Popup */}
      <AnimatePresence>
        {isPopupOpen && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsPopupOpen(false)}
          >
            <motion.div
              className="bg-white p-6 rounded-lg shadow-lg w-[400px] text-center"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-lg font-bold mb-4">
                Delete {selectedDevice}?
              </h2>
              <p className="text-sm text-gray-600 mb-6">
                Are you sure you want to delete this device? This action cannot
                be undone.
              </p>
              <div className="flex justify-around">
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded-lg"
                  onClick={handleDelete}
                >
                  Confirm
                </button>
                <button
                  className="bg-gray-300 px-4 py-2 rounded-lg"
                  onClick={() => setIsPopupOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default DeviceTab;
