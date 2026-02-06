import React from 'react'
import Link from 'next/link'

function page() {
  return (

    <div className="flex justify-between items-center mb-8">
      <div>
        <h1 className="text-4xl font-extrabold text-blue-900 tracking-tight">Businesses</h1>
        <p className="text-gray-500">Overview of all registered businesses</p>
      </div>
      <Link
        href="/dashboard/add-business"
        className="bg-blue-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-all shadow-lg shadow-blue-900/20"
      >
        + Register Business
      </Link>
    </div>
  )
}

export default page