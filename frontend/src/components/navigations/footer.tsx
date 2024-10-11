import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { Button } from "../ui/button";
import { User } from "./../../types/user";

interface FooterProps {
  user: User;
  type?: "mobile" | "desktop";
}

const Footer = ({ user, type = "desktop" }: FooterProps) => {
  const router = useRouter();

  const handleLogOut = async () => {
    try {
      const loggedOut = await fetch(`http://localhost:3008/logout`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // Include any other necessary headers, like authorization tokens
        },
      });

      if (!loggedOut.ok) {
        throw new Error("Failed to log out");
      }

      if (loggedOut) router.push("/sign-in");
      
      return true; 
    } catch (error) {
      console.error("Error during logout:", error);
      return false; 
    }
  };

  console.log("USER IN FOOTER", user);

  return (
    <footer className="flex cursor-pointer items-center justify-between gap-2 py-6">
      {user ? (
        <>
          <div
            className={
              type === "mobile"
                ? "flex size-10 items-center justify-center rounded-full bg-gray-200"
                : "flex size-10 items-center justify-center rounded-full bg-gray-200 max-xl:hidden"
            }
          >
            <Image
              src={user?.avatar_url}
              className="rounded-full"
              width={100}
              height={100}
              alt="user avatar"
              objectFit="cover"
            />
          </div>

          <div
            className={
              type === "mobile"
                ? "flex flex-1 flex-col justify-center"
                : "flex flex-1 flex-col justify-center max-xl:hidden"
            }
          >
            <h1 className="text-[14px] truncate text-accent font-semibold">
              {user?.first_name}
            </h1>
            <p className="text-[14px] truncate font-normal text-primary">
              {user?.email}
            </p>
          </div>

          <div
            className="relative size-5 max-xl:w-full max-xl:flex max-xl:justify-center max-xl:items-center"
            onClick={handleLogOut}
          >
            <Image
              src="/assets/icons/footer/logout.svg"
              alt="logout icon"
              width={50}
              height={50}
              className="size-5 transition-all block hover:hidden"
            />
          </div>
        </>
      ) : (
        <>
          <Button
            type="button"
            className="bg-dark-background w-full rounded-[1rem]"
            onClick={() => router.push("/sign-in")}
          >
            Add Account
          </Button>
        </>
      )}
    </footer>
  );
};

export default Footer;
