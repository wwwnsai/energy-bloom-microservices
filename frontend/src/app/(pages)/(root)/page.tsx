"use client";

import { useEffect, useState } from "react";
import { redirect, useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/utils/cn";
import {
  Sidebar,
  SidebarBody,
  SidebarLink,
} from "@/components/navigations/sidebar";
import { Logo } from "@/components/ui/logos/logo";
import { LogoIcon } from "@/components/ui/logos/logo-icon";
import { SIDE_BAR_LINKS } from "@/constants";
import { BackgroundGradientAnimation } from "@/components/ui/backgrounds/background-gradient-animation";
import DeviceTab from "@/components/ui/cards/device-tab";
import { IconAirConditioning, IconBulb } from "@tabler/icons-react";
import { PlusIcon } from "lucide-react";
import RoomCard from "@/components/ui/cards/room-card";
import DeviceCard from "@/components/ui/cards/device-card";
import HomeManagementCard from "@/components/ui/cards/home-management-card";
import { MOCK_DEVICES } from "@/constants/mock-device";


const HomePage = () => {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState([]);

  const router = useRouter();

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem("token");
      console.log("Token:", token);

      try {
        const response = await fetch("http://localhost:3007/get-login", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
          credentials: 'include', 
        });

        if (response.ok) {
          const usersData = await response.json();
          console.log("Users data:", usersData);
          setUser(usersData);
        } else {
          console.error("Failed to fetch users:", response.statusText);
          router.push("/sign-in");
        }
      } catch (error) {
        console.error("Error fetching users:", error);
        router.push("/sign-in");
      }
    };

    fetchUsers();
  }, []);

  console.log("USERS:", user);

  return (
    <div
      className={cn(
        "rounded-md flex flex-col md:flex-row bg-white w-full flex-1 mx-auto border border-neutral-200 overflow-hidden",
        "h-screen max-w-screen"
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10 bg-white">
          <div className="flex flex-col flex-1">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {SIDE_BAR_LINKS.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
          <div>
            <SidebarLink
              className="pl-[0.5rem]"
              link={{
                label: user? user.first_name + " " + user.last_name : "John Doe",
                href: "#",
                image: (
                  <Image
                    src="https://images.unsplash.com/photo-1472491235688-bdc81a63246e?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    className="w-12 h-12 flex-shrink-0 rounded-full object-cover"
                    width={300}
                    height={300}
                    alt="Avatar"
                  />
                ),
              }}
            />
          </div>
        </SidebarBody>
      </Sidebar>
      <Dashboard />
    </div>
  );
};

export default HomePage;

const Dashboard = () => {
  const [selectedRoom, setSelectedRoom] = useState<
    "Home" | "Living Room" | "Bedroom"
  >("Home");

  const handleDeleteDevice = (device: string, room: string) => {
    console.log(`Deleted ${device} from ${room}`);
  };

  return (
    <div className="flex flex-1 ml-10 my-6 mr-6 ">
      <div className="flex flex-col gap-3 flex-1 w-full h-full rounded-3xl">
        {/* TOP ROW */}
        <div className="flex gap-3 h-[60%]">
          <HomeManagementCard
            username="John Doe"
            backgroundImage="https://christophorus.porsche.com/.imaging/mte/porsche-templating-theme/image_1080x624/dam/Christophorus-Website/C412/Zusatzgalerien-und-Thumbnails/Garage/24_06_03_Christophorus_TheNordicBarnProject-0110.jpg/jcr:content/24_06_03_Christophorus_TheNordicBarnProject-0110.jpg"
            livingRoomImage="https://images.unsplash.com/photo-1616940844649-535215ae4eb1?q=80&w=2487&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            bedroomImage="https://images.unsplash.com/photo-1727706572437-4fcda0cbd66f?q=80&w=2371&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            onTabChange={(tab) => setSelectedRoom(tab)}
          />
          <DeviceCard
            airConditionersCount={
              (selectedRoom === "Home"
                ? [
                    ...(MOCK_DEVICES["Living Room"] || []),
                    ...(MOCK_DEVICES["Bedroom"] || []),
                  ]
                : MOCK_DEVICES[selectedRoom as "Living Room" | "Bedroom"] || []
              ).filter((device) => device.includes("Air Conditioner")).length ||
              0
            }
            lightsCount={
              (selectedRoom === "Home"
                ? [
                    ...(MOCK_DEVICES["Living Room"] || []),
                    ...(MOCK_DEVICES["Bedroom"] || []),
                  ]
                : MOCK_DEVICES[selectedRoom as "Living Room" | "Bedroom"] || []
              ).filter((device) => device.includes("Light")).length || 0
            }
            selectedRoom={selectedRoom}
            devices={MOCK_DEVICES}
            onDeleteDevice={handleDeleteDevice}
          />
        </div>

        {/* BOTTOM ROW */}
        <div className="flex gap-3 h-[40%]">
          <RoomCard
            title="Living Room"
            description="My Little Cozy Living Room"
            backgroundImage="https://images.unsplash.com/photo-1616940844649-535215ae4eb1?q=80&w=2487&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            isLightOn={true}
            currentTemperature={25}
            currentMode="Cool"
            currentFanSpeed="High"
          />
          <RoomCard
            title="Bedroom"
            description="My Snug and Peaceful Bedroom"
            backgroundImage="https://images.unsplash.com/photo-1727706572437-4fcda0cbd66f?q=80&w=2371&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            isLightOn={false}
            currentTemperature={22}
            currentMode="Heat"
            currentFanSpeed="Low"
          />
          {/* <div className="h-ุfull w-full rounded-3xl bg-gray-100"></div> */}
        </div>
      </div>
    </div>
  );
};

// const HomePage = () => {
//   const router = useRouter();
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   //   useEffect(() => {
//   //     const checkUser = async () => {
//   //       try {
//   //         const token = localStorage.getItem('token');
//   //         console.log("Token:", token);

//   //         if (!token) {
//   //           console.log("No token found, user is not logged in.");
//   //           router.push("/sign-in");
//   //         }

//   //         const response = await fetch("http://localhost:3007/get-login", {
//   //           method: "GET",
//   //           headers: {
//   //             "Authorization": `Bearer ${token}`, // Properly format the Authorization header
//   //             "Content-Type": "application/json",
//   //           },
//   //           credentials: 'include',
//   //         });

//   //         if (response.ok) {
//   //           const userData = await response.json();
//   //           console.log("User is logged in:", userData);
//   //           setUser(userData);
//   //         } else {
//   //           console.error("Failed to fetch user data:", response.statusText);
//   //           router.push("/sign-in"); // Redirect to sign-in on failure
//   //         }
//   //       } catch (error) {
//   //         console.error("Error fetching user data:", error);
//   //         router.push("/sign-in");
//   //       } finally {
//   //         setLoading(false); // Update loading state
//   //       }
//   //     };

//   //   checkUser();
//   // }, [router]); // Include router in the dependency array

//   // if (loading) {
//   //   return <div>Loading...</div>; // Show loading message while fetching data
//   // }

//   // console.log("LOGGED IN USER:", user);

//   return (
//     <section className="no-scrollbar flex w-full flex-row max-xl:max-h-screen max-xl:overflow-y-scroll">

//     </section>
//   );
// };

// export default HomePage;
