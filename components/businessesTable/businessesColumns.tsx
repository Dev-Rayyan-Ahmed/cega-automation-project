"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, Eye } from "lucide-react"

import { Button } from "@/components/ui/button"
import Link from "next/link"
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type BusinessesColumns = {
      _id: string
      businessName: string
      businessLocation: string
      businessStage: string
      createdAt: Date

}

export const businesscolumns: ColumnDef<BusinessesColumns>[] = [

      {
            accessorKey: "businessName",
            header: "Business Name",
      },
      {
            accessorKey: "businessStage",
            header: "Business Stage",
            cell: ({ row }) => (
                  <span className={` text-center px-2 py-1 rounded-full text-xs font-semibold border bg-green-100 text-green-800 border-green-200`}>
                        {row.getValue("businessStage") as string}
                  </span>
            )
      },
      {
            accessorKey: "businessLocation",
            header: "Location",
            cell: ({ row }) => (
                  <div className="font-mono font-medium text-blue-600">
                        {row.getValue("businessLocation")}
                  </div>
            )
      },
      {
            accessorKey: "createdAt",
            // Aligning header and cell to the right for a clean look
            header: ({ column }) => {
                  return (
                        <div className="text-right">
                              <Button
                                    variant="ghost"
                                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                              >
                                    Registration Date
                                    <ArrowUpDown className="ml-2 h-4 w-4" />
                              </Button>
                        </div>
                  )
            },
            cell: ({ row }) => {
                  const dateValue: Date = row.getValue("createdAt");

                  const date = new Date(dateValue);

                  const formatted = new Intl.DateTimeFormat("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                  }).format(date);

                  return <div className="text-center font-medium">{formatted}</div>;
            },
      },
      {
            id: "actions", // Specific ID for action columns
            header: () => <div className="text-center">Action</div>,
            cell: ({ row }) => {
                  const id = row.original._id;

                  return (
                        <div className="flex justify-center">
                              <Link href={`/dashboard/businesses/${id}`}>
                                    <Button
                                          variant="outline"
                                          size="sm"
                                          className="flex items-center gap-2 hover:bg-[#2093b3] hover:text-white transition-all duration-200 border-blue-200 shadow-sm"
                                    >
                                          <Eye className="h-4 w-4" />
                                          <span className="font-medium">Details</span>
                                    </Button>
                              </Link>
                        </div>
                  );
            },
      }

]