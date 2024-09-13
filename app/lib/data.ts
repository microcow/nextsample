'use server';

import { cookies } from "next/headers";

interface SigninProps {
  username: string;
  password: string;
}

export async function signinService(userData: SigninProps) {
  //console.log('signinService', userData);

  try {
    const response = await fetch('http://localhost:8080/api/login', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ...userData }),
      cache: "no-cache",
    });

    return response.json();
  } catch (error) {
    console.error("Login Service Error:", error);
    throw error;
  }
}

export async function getAuthToken() {
  const authToken = cookies().get("jwt")?.value;
  return authToken;
}
