'use server';

import { getAuthToken } from "./get-token";

export async function getUserMeLoader() {
  const authToken = await getAuthToken();
  if (!authToken) return { ok: false, data: null, error: null };
  console.log('authToken', authToken);
  try {
    const response = await fetch("http://localhost:8080/api/users/me", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      cache: "no-cache",
    });
    const data = await response.json();
    console.log('getUserMe', data);
    console.log('getUserMeError', data.error);
    if (data.error) return { ok: false, data: null, error: data.error };
    return { ok: true, data: data, error: null };
  } catch (error) {
    console.log(error);
    return { ok: false, data: null, error: error };
  }
}