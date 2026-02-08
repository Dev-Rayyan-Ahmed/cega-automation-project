"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"

import { Button } from "@/components/ui/button"
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type BusinessesColumns = {
      id: string
      businessName: string
      location: "LHR" | "KHI"
      businessStage: "Idea" | "Early Stage" | "ProtoType" | "Revenue Generating"
      registrationDate: Date

}

export const businesscolumns: ColumnDef<BusinessesColumns>[] = [

      {
            accessorKey: "businessName",
            header: "Business Name",
      },
      {
            accessorKey: "businessStage",
            header: "Business Stage",
      },
      {
            accessorKey: "location",
            header: "Loaction"
      },
      {
            accessorKey: "registrationDate",
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
                  const dateValue: Date = row.getValue("registrationDate");

                  const date = new Date(dateValue);

                  const formatted = new Intl.DateTimeFormat("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                  }).format(date);

                  return <div className="text-right font-medium">{formatted}</div>;
            },
      },

]
