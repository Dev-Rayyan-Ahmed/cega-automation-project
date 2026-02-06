
import React from 'react'
import Link from 'next/link'
import { CoWorkersTable } from '@/components/coWorkersTable/coWorkersTable';
import { CoWorkersColumns, cowrokerscolumns } from '@/components/coWorkersTable/coWorkersColumns';

async function getData(): Promise<CoWorkersColumns[]> {
  // Fetch data from your API here.
  return [
    {
    id: "cw-001",
    coWorkerName: "Ahmed Khan",
    businessName: "TechNova Solutions",
    location: "LHR",
  },
  {
    id: "cw-002",
    coWorkerName: "Sara Mansoor",
    businessName: "Indus Logistics",
    location: "KHI",
  },
  {
    id: "cw-003",
    coWorkerName: "Bilal Sheikh",
    businessName: "Zest Marketing",
    location: "LHR",
  },
  {
    id: "cw-004",
    coWorkerName: "Zainab Ali",
    businessName: "Karachi Spice Co.",
    location: "KHI",
  },
  {
    id: "cw-005",
    coWorkerName: "Hamza Malik",
    businessName: "Lahore IT Park",
    location: "LHR",
  },
  {
    id: "cw-006",
    coWorkerName: "Dania Farooq",
    businessName: "Blue Wave Exports",
    location: "KHI",
  },
  {
    id: "cw-007",
    coWorkerName: "Omer Qureshi",
    businessName: "Summit Builders",
    location: "LHR",
  },
  {
    id: "cw-008",
    coWorkerName: "Ayesha Siddiqui",
    businessName: "Port City Retailers",
    location: "KHI",
  },
  {
    id: "cw-009",
    coWorkerName: "Mustafa Jameel",
    businessName: "Punjab Agri-Tech",
    location: "LHR",
  },
  {
    id: "cw-010",
    coWorkerName: "Sana Tariq",
    businessName: "Coastal Freight",
    location: "KHI",
  },
  {
    id: "cw-001",
    coWorkerName: "Ahmed Khan",
    businessName: "TechNova Solutions",
    location: "LHR",
  },
  {
    id: "cw-002",
    coWorkerName: "Sara Mansoor",
    businessName: "Indus Logistics",
    location: "KHI",
  },
  {
    id: "cw-003",
    coWorkerName: "Bilal Sheikh",
    businessName: "Zest Marketing",
    location: "LHR",
  },
  {
    id: "cw-004",
    coWorkerName: "Zainab Ali",
    businessName: "Karachi Spice Co.",
    location: "KHI",
  },
  {
    id: "cw-005",
    coWorkerName: "Hamza Malik",
    businessName: "Lahore IT Park",
    location: "LHR",
  },
  {
    id: "cw-006",
    coWorkerName: "Dania Farooq",
    businessName: "Blue Wave Exports",
    location: "KHI",
  },
  {
    id: "cw-007",
    coWorkerName: "Omer Qureshi",
    businessName: "Summit Builders",
    location: "LHR",
  },
  {
    id: "cw-008",
    coWorkerName: "Ayesha Siddiqui",
    businessName: "Port City Retailers",
    location: "KHI",
  },
  {
    id: "cw-009",
    coWorkerName: "Mustafa Jameel",
    businessName: "Punjab Agri-Tech",
    location: "LHR",
  },
  {
    id: "cw-010",
    coWorkerName: "Sana Tariq",
    businessName: "Coastal Freight",
    location: "KHI",
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
          Co-Workers
        </h2>

        <Link
          href="/dashboard/add-resident"
          className="w-full sm:w-auto flex justify-center items-center bg-[#173e81] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#2093b3] transition-all shadow-lg shadow-blue-900/20
  ">
          + Register Co-Worker
        </Link>
      </div>

      {/* Table */}
      <div className="w-full overflow-x-scroll overflow-y-hidden touch-pan-x overscroll-x-contain">
        <div className="min-w-225 max-h-[75vh] overflow-y-auto ">
          <CoWorkersTable columns={cowrokerscolumns} data={data} />
        </div>
      </div>
    </div>
  )
}
