import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export interface returnResponse {
  success: boolean;
  error?: string;
  message: string;
}

export const formatDate = (dateStr: string) => {
  if (!dateStr) return "N/A";
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(dateStr));
}

export const stageColors: Record<string, string> = {
  'Idea': "bg-yellow-100 text-yellow-800 border-yellow-200",
  'Early Stage': "bg-blue-100 text-blue-800 border-blue-200",
  'ProtoType': "bg-purple-100 text-purple-800 border-purple-200",
  'Revenue Generating': "bg-green-100 text-green-800 border-green-200",
};

export const statusColors: Record<string, string> = {
  Active: "bg-green-100 text-green-800 border-green-200",
  Completed: "bg-blue-100 text-blue-800 border-blue-200",
  Cancelled: "bg-red-100 text-red-800 border-red-200",
};
