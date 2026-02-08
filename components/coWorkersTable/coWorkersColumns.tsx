"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "../ui/button";
import { ArrowUpDown, Eye } from "lucide-react";
import Link from "next/link";
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type CoWorkersColumns = {
      _id: string;
      fullName: string;
      email: string;
      phone: string;
      dateOfJoining: string;
      business: {
            _id: string;
            businessName: string;
      } | null;

}

export const cowrokerscolumns: ColumnDef<CoWorkersColumns>[] = [

      {
            accessorKey: "fullName",
            header: "Name",
      },
      {
            accessorKey: "businessName",
            header: "Business Name",
            cell: ({ row }) => {
                  // Access the original object from the row
                  const business = row.original.business;

                  // cuz business can be null
                  return (
                        <div>
                              {business ? business.businessName : "No Business"}
                        </div>
                  );
            },
      },
      {
            accessorKey: "email",
            header: "Email"
      },
      {
            accessorKey: "phone",
            header: "Phone"
      },
      {
            accessorKey: "dateOfJoining",
            header: ({ column }) => {
                  return (
                        <div className="text-right">
                              <Button
                                    variant="ghost"
                                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                              >
                                    Joining Date
                                    <ArrowUpDown className="ml-2 h-4 w-4" />
                              </Button>
                        </div>
                  )
            },
            cell: ({ row }) => {
                  const dateValue: Date = row.getValue("dateOfJoining");

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
                              <Link href={`/dashboard/coworkers/${id}`}>
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