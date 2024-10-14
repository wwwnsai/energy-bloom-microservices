import { useState, useEffect } from "react";
import dayjs from "dayjs";
import { ElectricityUsage } from "@/types/electricity-usage";
import { set } from "zod";

export const getElectricityUsages = async (year: number): Promise<number[]>  => {
    try {
        const response = await fetch(`http://localhost:3003/get-yearly-usage?year=${year}`, {
            method: "GET",
            headers: {
              "Authorization": `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "application/json",
            },
            credentials: 'include',
          });

        if (response.ok) {
            const usageData = await response.json();
            let usages: number[] = [];
            console.log("Usage data:", usageData);
            usageData.map((usage: ElectricityUsage) => {
                usages.push(Number(usage.usage));
            });
            return usages;
        } else {
            console.error("Failed to fetch usage data:", response.statusText);
            return [0];
        }
    } catch (error) {
        console.error("Error fetching usage data:", error);
        return [0];
    }
}

export const addElectricityUsage = async (month: number, year: number, usage: number) => {

    try {
        const response = await fetch("http://localhost:3003/add-electricity-usage", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
            },
            credentials: 'include',
            body: JSON.stringify({ month, year, usage }),
        });

        if (response.ok) {
            const usageData = await response.json();
            console.log("Usage data:", usageData);
            return usageData;
        } else {
            console.error("Failed to add usage data:", response.statusText);
            return null;
        }
    } catch (error) {
        console.error("Error adding usage data:", error);
        return null;
    }
}

export const updateElectricityUsage = async (month: number, year: number, usage: number): Promise<number> => {
    try {
        const response = await fetch("http://localhost:3003/update-electricity-usage", {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
            },
            credentials: 'include',
            body: JSON.stringify({ month, year, usage }),
        });
        
        if (response.ok) {
            const usageData = await response.json();
            console.log("Usage data:", usageData);
            return usageData.newUsage;
        } else {
            console.error("Failed to update usage data:", response.statusText);
            return 0;
        }
    } catch (error) {
        console.error("Error updating usage data:", error);
        return 0;
    }
}