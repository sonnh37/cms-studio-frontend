import {columns} from "./columns";
import * as React from "react";
import {useCallback, useEffect, useMemo, useRef, useState} from "react";
import {
    ColumnFiltersState,
    getCoreRowModel,
    getFilteredRowModel,
    PaginationState,
    SortingState,
    useReactTable,
    VisibilityState
} from "@tanstack/react-table";
import {useQuery, useQueryClient} from "@tanstack/react-query";
import {fetchAlbums} from "@/services/album-service";
import BarLoader from "@/components/common/bar-loader";
import {TableComponent} from "@/components/dashboard/data-table/table-component";
import {DataTablePagination} from "@/components/dashboard/data-table/data-table-pagination";

import {Input} from "@/components/ui/input";
import {DataTableFacetedFilter} from "@/components/dashboard/data-table/data-table-faceted-filter";
import {isDeleted_options} from "@/components/dashboard/filters";
import {Button} from "@/components/ui/button";
import {CalendarIcon, File, PlusCircle, SlidersHorizontal, X} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import {DropdownMenuTrigger} from "@radix-ui/react-dropdown-menu";
import {MixerHorizontalIcon} from "@radix-ui/react-icons";
import Link from "next/link";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from "@/components/ui/sheet";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Calendar} from "@/components/ui/calendar";
import {useForm, useWatch} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {cn} from "@/lib/utils";
import {format} from "date-fns";
import {AlbumGetAllQuery} from "@/types/queries/album-query";
import {Textarea} from "@/components/ui/textarea";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";

const DATE_REQUIRED_ERROR = "Date is required.";
const FormSchema = z.object({
    id: z.string().nullable().optional(),
    date: z
        .object(
            {
                from: z.date().optional(),
                to: z.date().optional(),
            },
            {required_error: "Date is required."},
        )
        .refine((date) => {
            return !!date.to
        }, "End Date is required.").optional(),
    title: z.string().optional(),
    description: z.string().optional(),
    isDeleted: z.boolean().nullable().optional(),
});


export default function DataTableAlbums() {
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
    const [pagination, setPagination] = React.useState<PaginationState>({pageIndex: 0, pageSize: 10});
    const queryClient = useQueryClient();
    const [shouldFetch, setShouldFetch] = useState(true); // State để kiểm soát khi nào cần fetch dữ liệu
    const [isSaveClicked, setIsSaveClicked] = useState(false); // Trạng thái mới để theo dõi việc nhấn Save changes
    const [isSheetOpen, setIsSheetOpen] = useState(false); // State to track if sheet is open

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            title: "",
            description: "",
            date: {
                from: undefined,
                to: undefined,
            },
            isDeleted: null
        }
    })

    const formValues = useWatch({
        control: form.control,
    });

    const getQueryParams = useCallback((): AlbumGetAllQuery => {
        return {
            pageNumber: pagination.pageIndex + 1,
            pageSize: pagination.pageSize,
            sortField: sorting.length > 0 ? sorting[0]?.id : 'CreatedDate',
            sortOrder: sorting.length > 0 ? (sorting[0]?.desc ? -1 : 1) : 1,
            isPagination: true,
            fromDate: formValues?.date?.from?.toISOString(),
            toDate: formValues?.date?.to?.toISOString(),
            title: formValues?.title!,
            description: formValues?.description!,
            isDeleted: formValues?.isDeleted!,
        };
    }, [pagination, sorting, formValues]);

    const queryParams = useMemo(() => getQueryParams(), [getQueryParams]);

    const {data, isFetching, error} = useQuery({
        queryKey: ['data', queryParams], // Đảm bảo rằng queryParams được sử dụng làm phần của queryKey
        queryFn: () => fetchAlbums(queryParams),
        placeholderData: (previousData, previousQuery) => previousData,
        enabled: shouldFetch,
    });

    useEffect(() => {
        console.log("Should fetch:", shouldFetch);
    }, [shouldFetch]);

    const handleFilterClick = () => {
        setIsSheetOpen(true);
        setShouldFetch(false);
    };

    const table = useReactTable({
        data: data?.results ?? [],
        columns,
        rowCount: data?.totalRecords ?? 0,
        state: {pagination, sorting, columnFilters, columnVisibility},
        onPaginationChange: setPagination,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        onColumnVisibilityChange: setColumnVisibility,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        manualPagination: true,
        debugTable: true,
    });

    const scrollRef = useRef<HTMLDivElement>(null);

    const handleSheetChange = (open: boolean) => {
        setIsSheetOpen(open);
        if (open) {
            setShouldFetch(false);
        } else {

            setShouldFetch(true);

        }
    };

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({behavior: 'smooth'});
        }
    }, [pagination]);

    if (isFetching) return <div><BarLoader/></div>;
    if (error) return <div>Error loading data</div>;

    const isFiltered = table.getState().columnFilters.length > 0

    const stringObject = "Album";

    const handleClear = () => {

        form.control._reset();

    }
    return (
        <div ref={scrollRef} className="space-y-4">
            <div className="flex items-center justify-between">
                <div className="flex flex-1 items-center space-x-2">
                    <Input
                        placeholder="Filter tasks..."
                        value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
                        onChange={(event) =>
                            table.getColumn("title")?.setFilterValue(event.target.value)
                        }
                        className="h-8 w-[150px] lg:w-[250px]"
                    />
                    {table.getColumn("isDeleted") && (
                        <DataTableFacetedFilter
                            column={table.getColumn("isDeleted")}
                            title="Status"
                            options={isDeleted_options}
                        />
                    )}

                    {isFiltered && (
                        <Button
                            variant="ghost"
                            onClick={() => table.resetColumnFilters()}
                            className="h-8 px-2 lg:px-3"
                        >
                            Reset
                            <X className="ml-2 h-4 w-4"/>
                        </Button>
                    )}
                </div>
                <div className="ml-auto flex items-center gap-2">
                    <div>
                        <Sheet open={isSheetOpen} onOpenChange={handleSheetChange}>
                            <SheetTrigger>
                                <Button size="sm" variant="outline" className="h-8 gap-1" onClick={handleFilterClick}>
                                    <SlidersHorizontal className="h-3.5 w-3.5"/>
                                    <span className=" sm:whitespace-nowrap">Filter Advanced</span>
                                </Button>
                            </SheetTrigger>

                            <SheetContent>
                                <Form {...form}>
                                    <form className="space-y-8">
                                        <SheetHeader>

                                            <SheetTitle>Filter advanced</SheetTitle>
                                            <SheetDescription>
                                                This action can update when you click the button at the footer.
                                            </SheetDescription>
                                        </SheetHeader>
                                        <div className="grid gap-4 py-4">

                                            <FormField
                                                control={form.control}
                                                name='date'
                                                render={({field}) => (
                                                    <FormItem className="flex flex-col">
                                                        <FormLabel>Date</FormLabel>
                                                        <Popover>
                                                            <PopoverTrigger asChild>
                                                                <Button
                                                                    id="date"
                                                                    variant={"outline"}
                                                                    className={cn(
                                                                        "w-full justify-start text-left font-normal",
                                                                        !field.value?.from && "text-muted-foreground"
                                                                    )}
                                                                >
                                                                    <CalendarIcon className="mr-2 h-4 w-4"/>
                                                                    {field.value?.from ? (
                                                                        field.value?.to ? (
                                                                            <>
                                                                                {format(field.value.from, "LLL dd, y")} -{" "}
                                                                                {format(field.value.to, "LLL dd, y")}
                                                                            </>
                                                                        ) : (
                                                                            format(field.value.from, "LLL dd, y")
                                                                        )
                                                                    ) : (
                                                                        <span>Pick a date</span>
                                                                    )}
                                                                </Button>
                                                            </PopoverTrigger>
                                                            <PopoverContent className="w-auto p-0" align="start">
                                                                <Calendar
                                                                    initialFocus
                                                                    mode="range"
                                                                    defaultMonth={field.value?.from}
                                                                    selected={{
                                                                        from: field.value?.from!,
                                                                        to: field.value?.to
                                                                    }}
                                                                    onSelect={field.onChange}
                                                                    numberOfMonths={2}
                                                                />
                                                            </PopoverContent>
                                                        </Popover>
                                                        <FormDescription>
                                                            The date you want to add a comment for.
                                                        </FormDescription>
                                                        <FormMessage/>
                                                    </FormItem>
                                                )}
                                            />

                                            <FormField
                                                control={form.control}
                                                name="title"
                                                render={({field}) => (
                                                    <FormItem>
                                                        <FormLabel>Title</FormLabel>
                                                        <FormControl>
                                                            <Input placeholder="shadcn" {...field} />
                                                        </FormControl>
                                                        <FormDescription>
                                                            This is your public display name.
                                                        </FormDescription>
                                                        <FormMessage/>
                                                    </FormItem>
                                                )}
                                            />

                                            <FormField
                                                control={form.control}
                                                name="description"
                                                render={({field}) => (
                                                    <FormItem>
                                                        <FormLabel>Description</FormLabel>
                                                        <FormControl>
                                                            <Textarea placeholder="Album description" {...field} />
                                                        </FormControl>
                                                        <FormMessage/>
                                                    </FormItem>
                                                )}
                                            />

                                            <FormField
                                                control={form.control}
                                                name="isDeleted"
                                                render={({field}) => (
                                                    <FormItem>
                                                        <FormLabel>Status</FormLabel>
                                                        <FormControl>
                                                            <Select
                                                                value={field.value ? "Disactive" : field.value === false ? "Active" : "None"}
                                                                onValueChange={(value) => {
                                                                    if (value === "None") {
                                                                        field.onChange(null);
                                                                    } else {
                                                                        field.onChange(value === "Disactive");
                                                                    }
                                                                }}
                                                            >
                                                                <SelectTrigger>
                                                                    <SelectValue placeholder="Select status"/>
                                                                </SelectTrigger>
                                                                <SelectContent>
                                                                    <SelectItem value="None">None</SelectItem>
                                                                    <SelectItem value="Active">Active</SelectItem>
                                                                    <SelectItem value="Disactive">Disactive</SelectItem>
                                                                </SelectContent>
                                                            </Select>
                                                        </FormControl>
                                                        <FormMessage/>
                                                    </FormItem>
                                                )}
                                            />
                                        </div>

                                        <SheetFooter>
                                            <SheetClose asChild>
                                                <Button onClick={handleClear}>Clear filter</Button>
                                            </SheetClose>
                                        </SheetFooter>
                                    </form>
                                </Form>
                            </SheetContent>

                        </Sheet>
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>

                            <Button
                                variant="outline"
                                size="sm"
                                className="ml-auto hidden h-8 lg:flex"
                            >
                                <MixerHorizontalIcon className="mr-2 h-4 w-4"/>
                                View
                            </Button>

                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-[150px]">
                            <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
                            <DropdownMenuSeparator/>
                            {table
                                .getAllColumns()
                                .filter(
                                    (column) =>
                                        typeof column.accessorFn !== "undefined" && column.getCanHide()
                                )
                                .map((column) => {
                                    return (
                                        <DropdownMenuCheckboxItem
                                            key={column.id}
                                            className="capitalize"
                                            checked={column.getIsVisible()}
                                            onCheckedChange={(value) => column.toggleVisibility(!!value)}
                                        >
                                            {column.id}
                                        </DropdownMenuCheckboxItem>
                                    )
                                })}
                        </DropdownMenuContent>
                    </DropdownMenu>


                    <Button size="sm" variant="outline" className="h-8 gap-1">
                        <File className="h-3.5 w-3.5"/>
                        <span className=" sm:whitespace-nowrap">Export</span>
                    </Button>

                    <Link
                        className="text-primary-foreground sm:whitespace-nowrap"
                        href={`/dashboard/${stringObject.toLowerCase()}/new`}
                    >

                        <Button size="sm" className="h-8 gap-1">
                            <PlusCircle className="fill-primary-background h-3.5 w-3.5"/>
                            Add {stringObject.toLowerCase()}
                        </Button>

                    </Link>
                </div>
            </div>
            <TableComponent table={table}/>
            <DataTablePagination table={table}/>
        </div>
    )
}
