
import React from 'react'
import Link from 'next/link'
import { BusinessesColumns, businesscolumns } from "@/components/businessesTable/businessesColumns"

import { BusinessesTable } from "@/components/businessesTable/businessesTable"

async function getData(): Promise<BusinessesColumns[]> {
  // Fetch data from your API here.
  return [
    {
      id: "bus-001",
      businessName: "TechNova Solutions",
      location: "LHR",
      businessStage: "Idea",
      registrationDate: new Date("2023-01-15"),
    },
    {
      id: "bus-002",
      businessName: "Indus Logistics",
      location: "KHI",
      businessStage: "Early Stage",
      registrationDate: new Date("2023-03-22"),
    },
    {
      id: "bus-003",
      businessName: "Zest Marketing Agency",
      location: "LHR",
      businessStage: "Idea",
      registrationDate: new Date("2023-06-10"),
    },
    {
      id: "bus-004",
      businessName: "Karachi Spice Co.",
      location: "KHI",
      businessStage: "Idea",
      registrationDate: new Date("2023-08-05"),
    },
    {
      id: "bus-005",
      businessName: "Lahore IT Park",
      location: "LHR",
      businessStage: "Idea",
      registrationDate: new Date("2023-11-12"),
    },
    {
      id: "bus-006",
      businessName: "Blue Wave Exports",
      location: "KHI",
      businessStage: "Idea",
      registrationDate: new Date("2024-01-20"),
    },
    {
      id: "bus-007",
      businessName: "Summit Builders",
      location: "LHR",
      businessStage: "Idea",
      registrationDate: new Date("2024-02-14"),
    },
    {
      id: "bus-008",
      businessName: "Port City Retailers",
      location: "KHI",
      businessStage: "Idea",
      registrationDate: new Date("2024-03-01"),
    },
    {
      id: "bus-009",
      businessName: "Punjab Agri-Tech",
      location: "LHR",
      businessStage: "Idea",
      registrationDate: new Date("2024-04-18"),
    },
    {
      id: "bus-010",
      businessName: "Coastal Freight Services",
      location: "KHI",
      businessStage: "Idea",
      registrationDate: new Date("2024-05-30"),
    },
    {
      id: "bus-001",
      businessName: "TechNova Solutions",
      location: "LHR",
      businessStage: "Idea",
      registrationDate: new Date("2023-01-15"),
    },
    {
      id: "bus-002",
      businessName: "Indus Logistics",
      location: "KHI",
      businessStage: "Early Stage",
      registrationDate: new Date("2023-03-22"),
    },
    {
      id: "bus-003",
      businessName: "Zest Marketing Agency",
      location: "LHR",
      businessStage: "Idea",
      registrationDate: new Date("2023-06-10"),
    },
    {
      id: "bus-004",
      businessName: "Karachi Spice Co.",
      location: "KHI",
      businessStage: "Idea",
      registrationDate: new Date("2023-08-05"),
    },
    {
      id: "bus-005",
      businessName: "Lahore IT Park",
      location: "LHR",
      businessStage: "Idea",
      registrationDate: new Date("2023-11-12"),
    },
    {
      id: "bus-006",
      businessName: "Blue Wave Exports",
      location: "KHI",
      businessStage: "Idea",
      registrationDate: new Date("2024-01-20"),
    },
    {
      id: "bus-007",
      businessName: "Summit Builders",
      location: "LHR",
      businessStage: "Idea",
      registrationDate: new Date("2024-02-14"),
    },
    {
      id: "bus-008",
      businessName: "Port City Retailers",
      location: "KHI",
      businessStage: "Idea",
      registrationDate: new Date("2024-03-01"),
    },
    {
      id: "bus-009",
      businessName: "Punjab Agri-Tech",
      location: "LHR",
      businessStage: "Idea",
      registrationDate: new Date("2024-04-18"),
    },
    {
      id: "bus-010",
      businessName: "Coastal Freight Services",
      location: "KHI",
      businessStage: "Idea",
      registrationDate: new Date("2024-05-30"),
    },

  ];
}

export default async function DemoPage() {
  const data = await getData()

  return (
    <div className="container mx-auto p-4 md:p-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-5 text-center sm:text-left">
        <h2 className="text-2xl md:text-3xl font-bold text-[#173e81] uppercase tracking-wide text-center sm:text-left">
          Businesses
        </h2>

        <Link
          href="/dashboard/businesses/add"
          className="w-full sm:w-auto flex justify-center items-center bg-[#173e81] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#2093b3] transition-all shadow-lg shadow-blue-900/20
  ">
          + Register Business
        </Link>
      </div>

      {/* Table */}
      <div className="w-full overflow-x-scroll overflow-y-hidden touch-pan-x overscroll-x-contain">
        <div className="min-w-225 max-h-[75vh] overflow-y-auto ">
          <BusinessesTable columns={businesscolumns} data={data} />
        </div>
      </div>
    </div>
  )
}
