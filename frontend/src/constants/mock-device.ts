import { useState, useEffect } from "react";
import { Aircon } from "../types/aircon";
import { Light } from "../types/light";
import { set } from "zod";

type AirconRooms = {
  "Living Room": string[];
  "Bedroom": string[];
};

type LightsRooms = {
  "Living Room": string[];
  "Bedroom": string[];
}

export const getAircons = () => {
  const [aircons, setAircons] = useState<AirconRooms>({
    "Living Room": [],
    "Bedroom": [],
  });
  const [error, setError] = useState<string | null>(null); 

  useEffect(() => {
    const fetchAircons = async () => {
      try {
        // Check if token is available
        const token = localStorage.getItem("token");
        console.log("Token:", token);
        if (!token) {
          console.error("No token found in localStorage.");
          return;
        }

        const response = await fetch("http://localhost:3001/aircons", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          credentials: 'include', 
        });

        if (response.ok) {
          const airconsData: Aircon[] = await response.json();
          const airconsByRoom: AirconRooms = {
            "Living Room": [],
            "Bedroom": [],
          };

          // Classifying air conditioners by room based on aircon_name
          for (const aircon of airconsData) {
            if (aircon.aircons_name.includes("Living Room") || aircon.aircons_name.includes("Livingroom")) {
              airconsByRoom["Living Room"].push(aircon.aircons_name);
            } else if (aircon.aircons_name.includes("Bed Room") || aircon.aircons_name.includes("Bedroom")) {
              airconsByRoom["Bedroom"].push(aircon.aircons_name);
            }
          }
          console.log("Aircons by room:", airconsByRoom);
          setAircons(airconsByRoom);
        } else {
          console.error("Failed to fetch aircons:", response.status, response.statusText);
          setError(response.statusText);
        }
      } catch (error: any) {
        console.error("Error fetching aircons:", error);
        setError(error.message); // Store the error message
      }
    };

    fetchAircons();
  }, []);
  return aircons;
};



export const getLights = () => {
  const [lights, setLights] = useState<LightsRooms>({
    "Living Room": [],
    "Bedroom": [],
  });
  const [error, setError] = useState<string | null>(null); 

  useEffect(() => {
    const fetchLights = async () => {
      try {
        // Check if token is available
        const token = localStorage.getItem("token");
        console.log("Token:", token);
        if (!token) {
          console.error("No token found in localStorage.");
          return;
        }

        const response = await fetch("http://localhost:3004/lights", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          credentials: 'include', 
        });

        if (response.ok) {
          const lightsData: Light[] = await response.json();
          const lightsByRoom: LightsRooms = {
            "Living Room": [],
            "Bedroom": [],
          };

          // Classifying air conditioners by room based on aircon_name
          for (const light of lightsData) {
            if (light.lights_name.includes("Living Room") || light.lights_name.includes("Livingroom")) {
              lightsByRoom["Living Room"].push(light.lights_name);
            } else if (light.lights_name.includes("Bed Room") || light.lights_name.includes("Bedroom")) {
              lightsByRoom["Bedroom"].push(light.lights_name);
            }
          }
          console.log("Lights by room:", lightsByRoom);
          setLights(lightsByRoom);
        } else {
          console.error("Failed to fetch lights:", response.status, response.statusText);
          setError(response.statusText);
        }
      } catch (error: any) {
        console.error("Error fetching lights:", error);
        setError(error.message); // Store the error message
      }
    };

    fetchLights();
  }, []);
  return lights;
};