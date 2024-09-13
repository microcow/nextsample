'use client'

// 새 프로젝트 생성 시 아래 코드 터미널에서 실행
// npm install --save-dev @types/react @types/react-dom

import { LogoutButton } from "@/app/ui/logout-button";

export default function Page() { 

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <h1>Dashboard</h1>
      <LogoutButton />
    </div>
  );
}