'use client';

import { FaSpinner } from "react-icons/fa";

export default function Loading(){
  return(
    <div className="min-h-screen flex items-center justify-center">
      <FaSpinner className="animate-spin text-4xl text-orange-500 dark:text-red-500" />
    </div>
  )
}