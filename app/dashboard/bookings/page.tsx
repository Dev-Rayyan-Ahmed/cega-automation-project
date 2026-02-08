import React from 'react'
import Link from 'next/link'
import { BookingsTable } from '@/components/bookingsTable/bookingsTable';
import { bookingscolumns } from '@/components/bookingsTable/bookingsColumns';
import { FlatBookingColumns, getBookings } from '@/actions/booking';

async function getData(): Promise<FlatBookingColumns[]> {
  const { data } = await getBookings();
  return data;
}

export default async function DemoPage() {
  const data = await getData()

  return (
    <div className="container mx-auto p-4 md:p-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-5 text-center sm:text-left">
        <h2 className="text-2xl md:text-3xl font-bold text-[#173e81] uppercase tracking-wide text-center sm:text-left">
          Bookings
        </h2>
      </div>

      {/* Table */}
      <div className="w-full overflow-x-scroll overflow-y-hidden touch-pan-x overscroll-x-contain">
        <div className="min-w-225 max-h-[75vh] overflow-y-auto ">
          <BookingsTable columns={bookingscolumns} data={data} />
        </div>
      </div>
    </div>
  )
}
