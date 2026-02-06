"use client"

import { ColumnDef } from "@tanstack/react-table"
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type CoWorkersColumns = {
      id: string
      coWorkerName: string
      businessName: string
      location: "LHR" | "KHI"

}

export const cowrokerscolumns: ColumnDef<CoWorkersColumns>[] = [

      {
            accessorKey: "coWorkerName",
            header: "Co-Worker Name",
      },
      {
            accessorKey: "businessName",
            header: "Business Name",
      },
      {
            accessorKey: "location",
            header: "Loaction"
      },
      
]