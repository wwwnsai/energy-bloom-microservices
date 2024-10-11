import express, { Request, Response } from 'express';
import { query } from "./utils/db";
import { Pool } from 'pg';
import dotenv from 'dotenv';
import cors from 'cors';

export const getLoggedInUser = async (userId: string) => {
  try {
    const { rows } = await query('SELECT * FROM users WHERE id = $1', [userId]);
    if (rows.length === 0) {
      throw new Error('User not found.');
    }
    return rows[0];
  } catch (error) {
    console.error("Error fetching logged-in user:", error);
    throw new Error("Failed to get logged-in user.");
  }
};

export const getUserInfo = async (user_id: string) => {
  try {
    const { rows } = await query('SELECT * FROM users WHERE id = $1', [user_id]);
    if (rows.length === 0) {
      throw new Error("User not found.");
    }
    return rows[0];
  } catch (error) {
    console.error("Error fetching user info:", error);
    throw new Error("Failed to fetch user info. Please try again later.");
  }
};

export const signIn = async ({ email, password }: { email: string; password: string; }) => {
  try {
    const { rows } = await query(
      'SELECT * FROM users WHERE email = $1 AND password = crypt($2, password)',
      [email, password]
    );
    if (rows.length === 0) {
      throw new Error("Invalid email or password.");
    }
    return rows[0];
  } catch (error) {
    console.error("Error signing in:", error);
    throw new Error("Failed to sign in. Please check your credentials.");
  }
};

export const signUp = async ({ password, ...userData }: any) => {
  try {
    const { rows: existingUsers } = await query('SELECT id FROM users WHERE email = $1', [userData.email]);

    if (existingUsers.length > 0) {
      await query(
        'UPDATE users SET first_name = $1, last_name = $2, address1 = $3, city = $4, postal_code = $5, date_of_birth = $6 WHERE email = $7',
        [
          userData.first_name,
          userData.last_name,
          userData.address1,
          userData.city,
          userData.postal_code,
          userData.date_of_birth,
          userData.email,
        ]
      );
    } else {
      // Insert a new user
      await query(
        'INSERT INTO users (email, password, first_name, last_name, address1, city, postal_code, date_of_birth) VALUES ($1, crypt($2, gen_salt(\'bf\')), $3, $4, $5, $6, $7, $8)',
        [
          userData.email,
          password,
          userData.first_name,
          userData.last_name,
          userData.address1,
          userData.city,
          userData.postal_code,
          userData.date_of_birth,
        ]
      );
    }

    // Fetch the newly created or updated user
    const { rows } = await query('SELECT * FROM users WHERE email = $1', [userData.email]);
    return rows[0];
  } catch (error) {
    console.error("Error signing up:", error);
    throw new Error("Failed to sign up. Please try again later.");
  }
};

export const logoutAccount = async () => {
  return { message: "Successfully logged out." };
};

export const getUserIdFromRequest = (req: Request): string | null => { 
  return req.cookies?.userId || null;
};
