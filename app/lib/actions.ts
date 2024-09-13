'use server';

import { z } from "zod";
import {signinService } from '@/app/lib/data'
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const config = {
  maxAge: 60 * 60 * 24 * 7, // 1 week
  path: "/",
  domain: process.env.HOST ?? "localhost",
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
};

const signinSchema = z.object({
  username: z.string().min(1).max(20, {
    message: "Username must be between 1 and 20 characters",
  }),
  password: z.string().min(4).max(100, {
    message: "Password must be between 4 and 100 characters",
  })
});

export async function signinAction(
  prevState: any,
  formData: FormData,
) {
  const validatedFields = signinSchema.safeParse({
      username: formData.get("username"),
      password: formData.get("password"),
    }
  );

  if (!validatedFields.success) {
    return {
      ...prevState,
      zodErrors: validatedFields.error.flatten().fieldErrors,
      message: '입력이 잘못되었습니다.',
    };
  }

  const responseData = await signinService(validatedFields.data);
  
  if (!responseData) {
    return {
      ...prevState,
      apiErrors: null,
      zodErrors: null,
      message: "API 요청 오류 발생",
    };
  }
  
  if (responseData.error) {
    return {
      ...prevState,
      apiErrors: responseData.error,
      zodErrors: null,
      message: "로그인에 실패 하였습니다.",
    };
  }

  console.log(responseData);
  cookies().set("jwt", responseData.accessToken, config);
  
  redirect("/dashboard");
}

export async function logoutAction() {
  cookies().set("jwt", "", { ...config, maxAge: 0 });
  redirect("/");
}