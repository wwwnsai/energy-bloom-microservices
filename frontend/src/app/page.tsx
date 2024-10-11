// src/app/page.tsx

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import RightSidebar from "../components/navigations/right-sidebar"; // Adjust paths as needed
import HeaderBox from "../components/shared/box/header-box";
import { HoverEffect } from "../components/shared/cards/card-hover-effect";

const HomePage = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      try {
        // Get the token from local storage or wherever you store it
        const token = localStorage.getItem('token'); // Adjust according to your token storage method

        const response = await fetch("http://localhost:3007/get-login", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`, // Include the token in the Authorization header
            "Content-Type": "application/json",
          },
          credentials: 'include', // Optional: include credentials if needed
        });

        if (response.ok) { 
          const userData = await response.json();

          console.log("User is logged in.");
          setUser(userData); 

        } 
        // else {
        //   console.error("Failed to fetch user data:", response.statusText);
        //   router.push("/sign-in"); 
        // }
      } catch (error) {
        console.error("Error fetching user data:", error);
        router.push("/sign-in");
      } finally {
        setLoading(false); // Ensure loading state is updated in any case
      }
    };

    checkUser();
  }, [router]); // Include router in the dependency array

  if (loading) {
    return <div>Loading...</div>; // Show loading message while fetching data
  }

  console.log("LOGGED IN USER:", user);

  return (
    <section className="no-scrollbar flex w-full flex-row max-xl:max-h-screen max-xl:overflow-y-scroll">
      <div className="no-scrollbar flex w-full flex-1 flex-col gap-8 px-5 py-7 sm:px-8 lg:py-12 xl:max-h-screen xl:overflow-y-scroll">
        {/* Optionally include HeaderBox and HoverEffect here */}
        {/* <HeaderBox />
        <HoverEffect /> */}
        {/* <p>Welcome, {user?.name || 'User'}!</p>  */}
      </div>
      {/* <RightSidebar />  */}
    </section>
  );
};

export default HomePage;
