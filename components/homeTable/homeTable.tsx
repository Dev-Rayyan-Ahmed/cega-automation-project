"use client"
import { useEffect, useState } from "react";
import { Briefcase, MapPin, Layers } from "lucide-react";

export default function BusinessTable() {
  const [businesses, setBusinesses] = useState([]);

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("businesses") || "[]");
    setBusinesses(savedData);
  }, []);

  if (businesses.length === 0) {
    return (
      <div className="text-center p-10 border-2 border-dashed rounded-xl text-gray-400">
        No businesses registered yet.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-200">
            <th className="px-6 py-4 text-sm font-semibold text-gray-900">Business Details</th>
            <th className="px-6 py-4 text-sm font-semibold text-gray-900">Industry</th>
            <th className="px-6 py-4 text-sm font-semibold text-gray-900">Location</th>
            <th className="px-6 py-4 text-sm font-semibold text-gray-900">Stage</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {businesses.map((biz: any, index: number) => (
            <tr key={index} className="hover:bg-blue-50/50 transition-colors group">
              <td className="px-6 py-4">
                <div className="font-bold text-gray-900">{biz.businessName}</div>
                <div className="text-sm text-gray-500 line-clamp-1">{biz.description}</div>
              </td>
              <td className="px-6 py-4 text-sm text-gray-600">
                <span className="flex items-center gap-2">
                  <Briefcase size={14} className="text-blue-600" /> {biz.industry}
                </span>
              </td>
              <td className="px-6 py-4 text-sm text-gray-600">
                <span className="flex items-center gap-2">
                  <MapPin size={14} className="text-red-500" /> {biz.businessLocation}
                </span>
              </td>
              <td className="px-6 py-4">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  <Layers size={12} className="mr-1" /> {biz.businessStage}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}