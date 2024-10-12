// src/app/page.tsx

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import RightSidebar from "../components/navigations/right-sidebar"; // Adjust paths as needed
import HeaderBox from "../components/shared/box/header-box";

const HomePage = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  console.log("this is home page");

  useEffect(() => {
    const checkUser = async () => {
      try {
        const token = localStorage.getItem('token');
        console.log("Token:", token);
    
        if (!token) {
          console.log("No token found, user is not logged in.");
          router.push("/sign-in"); // Redirect if no token is found
          return;
        }
    
        const response = await fetch("http://localhost:3007/get-login", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`, // Properly format the Authorization header
            "Content-Type": "application/json",
          },
          credentials: 'include',
        });
    
        if (response.ok) {
          const userData = await response.json();
          console.log("User is logged in:", userData);
          setUser(userData);
          router.push("/");
        } else {
          console.error("Failed to fetch user data:", response.statusText);
          router.push("/sign-in"); // Redirect to sign-in on failure
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        router.push("/sign-in");
      } finally {
        setLoading(false); // Update loading state
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
