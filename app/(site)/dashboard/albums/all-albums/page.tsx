"use client";
import Image from "next/image";
import Link from "next/link";
import {
    File,
    Home,
    LineChart,
    ListFilter,
    MoreHorizontal,
    Package,
    Package2,
    PanelLeft,
    PlusCircle,
    Search,
    Settings,
    ShoppingCart,
    Users2,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";
import List from "@/components/dashboard/layout/list";
import TabsListCustom from "@/components/dashboard/layout/tabs-list";
import { Album } from "@/types/album";
import { useEffect, useState } from "react";
import axios from "axios";

const tabs = [
    { value: "all", label: "All" },
    { value: "active", label: "Active" },
    { value: "draft", label: "Draft" },
    { value: "archived", label: "Archived", className: "hidden sm:flex" },
];
const tableHeadings = [
    { key: 'id', label: 'Id', className: 'hidden' },
    { key: 'background', label: 'Background', className: '' },
    { key: 'title', label: 'Title', className: '' },
    { key: 'description', label: 'Description', className: '' },
    { key: 'createdBy', label: 'Created By', className: 'hidden' },
    { key: 'createdDate', label: 'Created Date', className: 'hidden md:table-cell' },
    { key: 'lastUpdatedBy', label: 'Last Updated By', className: 'hidden' },
    { key: 'lastUpdatedDate', label: 'Last Updated Date', className: 'hidden md:table-cell' },
    { key: 'isDeleted', label: 'Is Deleted', className: '' }
];

interface TableRowsCustomProps {
    albums: Album[];
}
 
function TableRowsCustom({ albums }: TableRowsCustomProps) {
    return (
        <>
            {albums.map((album: Album) => (
                <TableRow key={album.id}>
                    <TableCell className="hidden sm:table-cell">
                        <Image
                            alt="Album image"
                            className="aspect-square rounded-md object-cover"
                            height="64"
                            src={album.background || "/placeholder.svg"}
                            width="64"
                        />
                    </TableCell>
                    <TableCell className="font-medium">
                        {album.title || 'No Title'}
                    </TableCell>
                    
                    <TableCell className="hidden md:table-cell">
                        {album.description || 'N/A'}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                        {album.createdDate ? new Date(album.createdDate).toLocaleString() : 'N/A'}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                        {album.lastUpdatedDate ? new Date(album.lastUpdatedDate).toLocaleString() : 'N/A'}
                    </TableCell>
                    <TableCell>
                        <Badge variant="outline">{album.isDeleted ? 'Deleted' : 'Active'}</Badge>
                    </TableCell>
                    <TableCell>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    aria-haspopup="true"
                                    size="icon"
                                    variant="ghost"
                                >
                                    <MoreHorizontal className="h-4 w-4" />
                                    <span className="sr-only">Toggle menu</span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem>Edit</DropdownMenuItem>
                                <DropdownMenuItem>Delete</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </TableCell>
                </TableRow>
            ))}
        </>
    );
}

export default function AllAlbumsPage() {
    const [albums, setAlbums] = useState<Album[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://localhost:7192/album-management/albums');
                const albums: Album[] = response.data.results;

                setAlbums(albums);
            } catch (error) {
                console.error('Failed to fetch images:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <Tabs defaultValue="all">
            <div className="flex items-center">
                <TabsListCustom tabs={tabs} />
                <div className="ml-auto flex items-center gap-2">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm" className="h-8 gap-1">
                                <ListFilter className="h-3.5 w-3.5" />
                                <span className="sm:whitespace-nowrap">
                                    Filter
                                </span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuCheckboxItem checked>
                                Active
                            </DropdownMenuCheckboxItem>
                            <DropdownMenuCheckboxItem>Draft</DropdownMenuCheckboxItem>
                            <DropdownMenuCheckboxItem>
                                Archived
                            </DropdownMenuCheckboxItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <Button size="sm" variant="outline" className="h-8 gap-1">
                        <File className="h-3.5 w-3.5" />
                        <span className=" sm:whitespace-nowrap">
                            Export
                        </span>
                    </Button>
                    <Button size="sm" className="h-8 gap-1">
                        <PlusCircle className="fill-primary-foreground h-3.5 w-3.5" />
                        <span className="text-primary-foreground sm:whitespace-nowrap">
                            Add Album
                        </span>
                    </Button>
                </div>
            </div>
            <TabsContent value="all">
                <List tableHeadings={tableHeadings} tableRows={<TableRowsCustom albums={albums} />} label={"album"} />
            </TabsContent>
        </Tabs>
    );
}


