"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "../ui/button";
import { ArrowUpDown, Eye } from "lucide-react";
import { formatDate, statusColors } from "@/lib/utils";
import Link from "next/link";

export type BookingsColumns = {
      _id: string;
      fullName: string;
      email: string;
      businessName: string;
      seatNumber: string;
      status: 'Active' | 'Completed' | 'Cancelled';
      isRenewed: boolean;
      startDate: string;
      endDate: string;
}



export const bookingscolumns: ColumnDef<BookingsColumns>[] = [
      {
            accessorKey: "fullName",
            header: "Coworker",
      },
      {
            accessorKey: "businessName",
            header: "Business",
      },
      {
            accessorKey: "seatNumber",
            header: "Seat No",
            cell: ({ row }) => (
                  <div className="font-mono font-medium text-blue-600">
                        {row.getValue("seatNumber")}
                  </div>
            )
      },
      {
            accessorKey: "status",
            header: "Status",
            cell: ({ row }) => {
                  const status = row.getValue("status") as string;
                  return (
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold border ${statusColors[status]}`}>
                              {status}
                        </span>
                  );
            },
      },
      {
            accessorKey: "isRenewed",
            header: "Renewed",
            cell: ({ row }) => (
                  <div className="">
                        {row.getValue("isRenewed") ? "Yes" : "No"}
                  </div>
            ),
      },
      {
            accessorKey: "endDate",
            header: ({ column }) => (
                  <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                        className="-ml-4"
                  >
                        Expiry Date
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
            ),
            cell: ({ row }) => {
                  const dateStr = row.getValue("endDate") as string;
                  return <div className="text-sm font-medium">{formatDate(dateStr)}</div>;
            },
      },
      {
            id: "actions", // Specific ID for action columns
            header: () => <div className="text-center">Action</div>,
            cell: ({ row }) => {
                  const id = row.original._id;

                  return (
                        <div className="flex justify-center">
                              <Link href={`/dashboard/bookings/${id}`}>
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
];
