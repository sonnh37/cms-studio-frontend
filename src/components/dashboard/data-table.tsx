"use client"

import * as React from "react"
import {useEffect, useRef} from "react"
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    PaginationState,
    SortingState,
    useReactTable,
} from "@tanstack/react-table"

import {keepPreviousData, useQuery,} from '@tanstack/react-query'

import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "@/components/ui/table"
import {Input} from "@/components/ui/input";
import {DataTableViewOptions} from "@/components/dashboard/data-table-view-options-props";
import {DataTablePagination} from "@/components/dashboard/data-table-pagination-props";
import {BaseQueryableQuery} from "@/types/queries/base-query";

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    fetchData: (queryParams: BaseQueryableQuery) => Promise<PagedResponse<TData>>;
}

export function DataTable<TData, TValue>({
                                             columns,
                                             fetchData,
                                         }: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [pagination, setPagination] = React.useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    });

    const [queryParams, setQueryParams] = React.useState<BaseQueryableQuery>({
        pageNumber: pagination.pageIndex + 1,
        pageSize: pagination.pageSize,
        sortField: sorting.length > 0 ? sorting[0]?.id : 'CreatedDate', // Cột sắp xếp
        sortOrder: sorting.length > 0 ? (sorting[0]?.desc ? -1 : 1) : 1, // Thứ tự sắp xếp
        isPagination: true,
    });

    useEffect(() => {
        setQueryParams({
            pageNumber: pagination.pageIndex + 1,
            pageSize: pagination.pageSize,
            sortField: sorting.length > 0 ? sorting[0]?.id : '',
            sortOrder: sorting.length > 0 ? (sorting[0]?.desc ? -1 : 1) : 1,
            isPagination: true,
        });
    }, [pagination, sorting]);

    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({behavior: 'smooth'});
        }
    }, [pagination]);

    const {data, isFetching, error} = useQuery({
        queryKey: ['data', queryParams],
        queryFn: () => fetchData(queryParams),
        placeholderData: keepPreviousData,
    });

    const defaultData: TData[] = React.useMemo(() => [], []);

    const table = useReactTable({
        data: data?.results ?? defaultData,
        columns,
        rowCount: data?.totalRecords ?? 0,
        state: {
            pagination,
            sorting,
        },
        onPaginationChange: (newPagination) => setPagination(newPagination),
        onSortingChange: (newSorting) => setSorting(newSorting),
        getCoreRowModel: getCoreRowModel(),
        manualPagination: true,
        debugTable: true,
    });

    if (isFetching) return <div>Loading...</div>;
    if (error) return <div>Error loading data</div>;

    return (
        <div ref={scrollRef}>
            <div className="flex items-center py-4">
                <Input
                    placeholder="Filter emails..."
                    value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn("title")?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm"
                />
                <DataTableViewOptions table={table}/>
            </div>
            <div className="rounded-md border">
                <Table>
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
            <DataTablePagination table={table}/>
        </div>

    )
}


