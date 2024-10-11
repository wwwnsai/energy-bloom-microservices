"use client"

import { useState } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "../../ui/dialog";
// import { addDevice } from "@/src/libs/actions/device.actions";

interface AddDeviceDialogProps {
  userId: string;
}

const AddDeviceDialog = ({ userId }: AddDeviceDialogProps) => {
  // const [deviceName, setDeviceName] = useState("");
  // const [deviceType, setDeviceType] = useState("");
  // const [deviceCount, setDeviceCount] = useState("");
  // const [deviceUnitUsage, setDeviceUnitUsage] = useState("");
  // const [loading, setLoading] = useState(false);
  // const [isDialogOpen, setIsDialogOpen] = useState(false);

  // const handleSubmit = async (event: React.FormEvent) => {
  //   event.preventDefault();
  //   setLoading(true);

  //   try {
  //     const data = await addDevice({
  //       user_id: userId,
  //       device_name: deviceName,
  //       device_type: deviceType,
  //       device_count: Number(deviceCount),
  //       device_unit_usage: Number(deviceUnitUsage),
  //     });

  //     console.log("Device success:", data);

  //     setDeviceName("");
  //     setDeviceType("");
  //     setDeviceCount("");
  //     setDeviceUnitUsage("");

  //     setIsDialogOpen(false);
  //   } catch (error) {
  //     console.error("Error adding device:", error.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <div>
      <h1>Add Device</h1>
    </div>
    // <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
    //   <DialogTrigger asChild>
    //     <button className="flex flex-row gap-2 justify-between items-center rounded-[1rem] px-3 py-2 bg-accent hover:bg-slate-900/90 transition-all duration-100">
    //       <Image
    //         src="/assets/icons/shared/plus-icon.svg"
    //         width={20}
    //         height={20}
    //         alt="plus icon"
    //       />
    //       <h2 className="text-[14px] font-semibold text-white">Add Device</h2>
    //     </button>
    //   </DialogTrigger>
    //   <DialogContent className="rounded-[3rem]">
    //     <DialogHeader>
    //       <DialogTitle>Add Device</DialogTitle>
    //       <DialogDescription>
    //         Add details about the new device.
    //       </DialogDescription>
    //     </DialogHeader>
    //     <form onSubmit={handleSubmit} className="space-y-4">
    //       <input
    //         type="text"
    //         placeholder="Device Name"
    //         value={deviceName}
    //         onChange={(e) => setDeviceName(e.target.value)}
    //         className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-tertiary focus:border-transparent"
    //         required
    //       />
    //       <input
    //         type="text"
    //         placeholder="Device Type"
    //         value={deviceType}
    //         onChange={(e) => setDeviceType(e.target.value)}
    //         className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-tertiary focus:border-transparent"
    //         required
    //       />
    //       <input
    //         type="number"
    //         placeholder="Device Count"
    //         value={deviceCount}
    //         onChange={(e) => setDeviceCount(e.target.value)}
    //         className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-tertiary focus:border-transparent"
    //         required
    //       />
    //       <input
    //         type="number"
    //         placeholder="Device Unit Usage"
    //         value={deviceUnitUsage}
    //         onChange={(e) => setDeviceUnitUsage(e.target.value)}
    //         className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-tertiary focus:border-transparent"
    //         required
    //       />
    //       <DialogFooter>
    //         <DialogClose asChild>
    //           <button type="button" className="mr-4">
    //             Cancel
    //           </button>
    //         </DialogClose>
    //         <button
    //           type="submit"
    //           disabled={loading}
    //           className="bg-accent text-white px-4 py-2 rounded-lg hover:bg-slate-900/90 transition-all duration-100"
    //         >
    //           {loading ? "Saving..." : "Save"}
    //         </button>
    //       </DialogFooter>
    //     </form>
    //   </DialogContent>
    // </Dialog>
  );
};

export default AddDeviceDialog;
