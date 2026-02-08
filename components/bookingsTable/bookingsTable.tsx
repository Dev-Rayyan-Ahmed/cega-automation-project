"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import {
      DropdownMenu,
      DropdownMenuCheckboxItem,
      DropdownMenuContent,
      DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
      ColumnDef,
      SortingState,
      VisibilityState,
      ColumnFiltersState,
      getFilteredRowModel,
      flexRender,
      getCoreRowModel,
      getSortedRowModel,
      useReactTable,
} from "@tanstack/react-table"

import {
      Table,
      TableBody,
      TableCell,
      TableHead,
      TableHeader,
      TableRow,
} from "@/components/ui/table"

import { Input } from "@/components/ui/input"

interface BookingsTableProps<TData, TValue> {
      columns: ColumnDef<TData, TValue>[]
      data: TData[]
}

export function BookingsTable<TData, TValue>({
      columns,
      data,
}: BookingsTableProps<TData, TValue>) {
      const [sorting, setSorting] = React.useState<SortingState>([])
      const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
            []
      )
      const [columnVisibility, setColumnVisibility] =
            React.useState<VisibilityState>({})
      const table = useReactTable({
            data,
            columns,
            getCoreRowModel: getCoreRowModel(),

            onSortingChange: setSorting,
            getSortedRowModel: getSortedRowModel(),

            onColumnFiltersChange: setColumnFilters,
            getFilteredRowModel: getFilteredRowModel(),

            onColumnVisibilityChange: setColumnVisibility,

            manualPagination: true,
            state: {
                  sorting,
                  columnFilters,
                  columnVisibility,

            },
      })

      return (
            <div className="w-full">
                  <div className="flex items-center py-4 ">
                        <Input
                              placeholder="Filter Booking names..."
                              value={(table.getColumn("fullName")?.getFilterValue() as string) ?? ""}
                              onChange={(event) =>
                                    table.getColumn("fullName")?.setFilterValue(event.target.value)
                              }
                              className="max-w-sm"
                        />
                        <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                    <Button variant="outline" className="ml-auto bg-gray-200">
                                          Columns
                                    </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                    {table
                                          .getAllColumns()
                                          .filter(
                                                (column) => column.getCanHide()
                                          )
                                          .map((column) => {
                                                return (
                                                      <DropdownMenuCheckboxItem
                                                            key={column.id}
                                                            className="capitalize"
                                                            checked={column.getIsVisible()}
                                                            onCheckedChange={(value) =>
                                                                  column.toggleVisibility(!!value)
                                                            }
                                                      >
                                                            {column.id}
                                                      </DropdownMenuCheckboxItem>
                                                )
                                          })}
                              </DropdownMenuContent>
                        </DropdownMenu>
                  </div>

                  {/* Booking Table */}
                  <div className="rounded-md border ">
                        <Table className="min-w-200]">
                              <TableHeader>
                                    {table.getHeaderGroups().map((headerGroup) => (
                                          <TableRow key={headerGroup.id}>
                                                {headerGroup.headers.map((header) => {
                                                      return (
                                                            <TableHead key={header.id}>
                                                                  {header.isPlaceholder
                                                                        ? null
                                                                        : flexRender(
                                                                              header.column.columnDef.header,
                                                                              header.getContext()
                                                                        )}
                                                            </TableHead>
                                                      )
                                                })}
                                          </TableRow>
                                    ))}
                              </TableHeader>
                              <TableBody>
                                    {table.getRowModel().rows?.length ? (
                                          table.getRowModel().rows.map((row) => (
                                                <TableRow
                                                      key={row.id}
                                                      data-state={row.getIsSelected() && "selected"}
                                                >
                                                      {row.getVisibleCells().map((cell) => (
                                                            <TableCell key={cell.id}>
                                                                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                            </TableCell>
                                                      ))}


                                                </TableRow>
                                          ))
                                    ) : (
                                          <TableRow>
                                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                                      No results.
                                                </TableCell>
                                          </TableRow>
                                    )}
                              </TableBody>
                        </Table>
                  </div>


            </div >
      )
}