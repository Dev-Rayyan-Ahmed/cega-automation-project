
import React from 'react'
import Link from 'next/link'
import { BusinessesColumns, businesscolumns } from "@/components/businessesTable/businessesColumns"

import { BusinessesTable } from "@/components/businessesTable/businessesTable"
import { getBusiness } from '@/actions/business'

async function getData(): Promise<BusinessesColumns[]> {
  const { data } = await getBusiness();
  return data
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
