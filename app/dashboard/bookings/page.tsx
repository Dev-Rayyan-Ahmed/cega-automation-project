import React from 'react'
import Link from 'next/link'
import { BookingColumns, bookingcolumns } from '@/components/homeTable/bookingColumns';
import { BookingTable } from '@/components/homeTable/bookingTable';

async function getData(): Promise<BookingColumns[]> {
  // Fetch data from your API here.
  return [
    {
      coWorker: "Ali Khan",
      business: "TechNova",
      seat: "KHI-01",
      startDate: new Date("2025-01-10"),
      endDate: new Date("2025-06-10"),
      status: "Completed",
    },
    {
      coWorker: "Sara Ahmed",
      business: "TechNova",
      seat: "KHI-02",
      startDate: new Date("2025-02-01"),
      endDate: new Date("2025-07-01"),
      status: "Active",
    },
    {
      coWorker: "Usman Raza",
      business: "TechNova",
      seat: "KHI-03",
      startDate: new Date("2025-03-15"),
      endDate: new Date("2025-04-20"),
      status: "Cancelled",
    },
    {
      coWorker: "Hina Noor",
      business: "TechNova",
      seat: "KHI-04",
      startDate: new Date("2025-01-25"),
      endDate: new Date("2025-08-25"),
      status: "Active",
    },
    {
      coWorker: "Bilal Siddiqui",
      business: "TechNova",
      seat: "KHI-05",
      startDate: new Date("2024-12-05"),
      endDate: new Date("2025-01-30"),
      status: "Completed",
    },

    {
      coWorker: "Ayesha Malik",
      business: "DesignHub",
      seat: "LHR-01",
      startDate: new Date("2025-04-01"),
      endDate: new Date("2025-10-01"),
      status: "Active",
    },
    {
      coWorker: "Hamza Iqbal",
      business: "DesignHub",
      seat: "LHR-02",
      startDate: new Date("2025-02-12"),
      endDate: new Date("2025-03-01"),
      status: "Cancelled",
    },
    {
      coWorker: "Zainab Fatima",
      business: "DesignHub",
      seat: "LHR-03",
      startDate: new Date("2025-01-05"),
      endDate: new Date("2025-09-05"),
      status: "Active",
    },
    {
      coWorker: "Ahmed Hassan",
      business: "DesignHub",
      seat: "LHR-04",
      startDate: new Date("2024-11-20"),
      endDate: new Date("2025-02-20"),
      status: "Completed",
    },
    {
      coWorker: "Maryam Asif",
      business: "DesignHub",
      seat: "LHR-05",
      startDate: new Date("2025-03-10"),
      endDate: new Date("2025-08-10"),
      status: "Active",
    },

    {
      coWorker: "Farhan Ali",
      business: "FinEdge",
      seat: "KHI-12",
      startDate: new Date("2025-01-18"),
      endDate: new Date("2025-02-28"),
      status: "Completed",
    },
    {
      coWorker: "Noor Zaman",
      business: "FinEdge",
      seat: "KHI-13",
      startDate: new Date("2025-04-05"),
      endDate: new Date("2025-12-05"),
      status: "Active",
    },
    {
      coWorker: "Imran Sheikh",
      business: "FinEdge",
      seat: "KHI-14",
      startDate: new Date("2025-02-08"),
      endDate: new Date("2025-02-25"),
      status: "Cancelled",
    },
    {
      coWorker: "Laiba Khan",
      business: "FinEdge",
      seat: "KHI-15",
      startDate: new Date("2025-01-14"),
      endDate: new Date("2025-07-14"),
      status: "Active",
    },
    {
      coWorker: "Shahzaib Tariq",
      business: "FinEdge",
      seat: "KHI-16",
      startDate: new Date("2024-12-01"),
      endDate: new Date("2025-01-15"),
      status: "Completed",
    },

    {
      coWorker: "Anum Zahra",
      business: "CloudSync",
      seat: "LHR-22",
      startDate: new Date("2025-03-22"),
      endDate: new Date("2025-09-22"),
      status: "Active",
    },
    {
      coWorker: "Talha Mehmood",
      business: "CloudSync",
      seat: "LHR-23",
      startDate: new Date("2025-01-09"),
      endDate: new Date("2025-01-20"),
      status: "Cancelled",
    },
    {
      coWorker: "Iqra Saleem",
      business: "CloudSync",
      seat: "LHR-24",
      startDate: new Date("2025-02-18"),
      endDate: new Date("2025-08-18"),
      status: "Active",
    },
    {
      coWorker: "Noman Qureshi",
      business: "CloudSync",
      seat: "LHR-25",
      startDate: new Date("2024-10-15"),
      endDate: new Date("2025-01-10"),
      status: "Completed",
    },
    {
      coWorker: "Sadia Rahman",
      business: "CloudSync",
      seat: "LHR-26",
      startDate: new Date("2025-04-12"),
      endDate: new Date("2025-11-12"),
      status: "Active",
    },];
}

export default async function DemoPage() {
  const data = await getData()

  return (

    <div>

      {/* Table */}
      <div className="w-full overflow-x-scroll overflow-y-hidden touch-pan-x overscroll-x-contain">
        <div className="min-w-225 max-h-[55vh] overflow-y-auto ">
          <BookingTable columns={bookingcolumns} data={data} />
        </div>

        <div />
      </div>
    </div>
  );
}