"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"

import { Button } from "@/components/ui/button"
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type BookingColumns = {
      coWorker: string;
      business?: string;
      seat: string;
      startDate: Date;
      endDate?: Date;
      status: 'Active' | 'Completed' | 'Cancelled';

}

export const bookingcolumns: ColumnDef<BookingColumns>[] = [
      {
            accessorKey: "coWorker",
            header: "Co-Worker Name",
      },
      {
            accessorKey: "business",
            header: "Business Name",
      },
      {
            accessorKey: "seat",
            header: "Seat No",
      },
      {
            accessorKey: "status",
            header: "Status",
      },
      {
            accessorKey: "startDate",
            // Aligning header and cell to the right for a clean look
            header: ({ column }) => {
                  return (
                        <div className="text-right">
                              <Button
                                    variant="ghost"
                                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                              >
                                    Start Date
                                    <ArrowUpDown className="ml-2 h-4 w-4" />
                              </Button>
                        </div>
                  )
            },
            cell: ({ row }) => {
                  const dateValue: Date = row.getValue("startDate");

                  const date = new Date(dateValue);

                  const formatted = new Intl.DateTimeFormat("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                  }).format(date);

                  return <div className="text-right font-medium">{formatted}</div>;
            },
      },

      {
            accessorKey: "endDate",
            // Aligning header and cell to the right for a clean look
            header: ({ column }) => {
                  return (
                        <div className="text-right">
                              <Button
                                    variant="ghost"
                                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                              >
                                    End Date
                                    <ArrowUpDown className="ml-2 h-4 w-4" />
                              </Button>
                        </div>
                  )
            },
            cell: ({ row }) => {
                  const dateValue: Date = row.getValue("endDate");

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
