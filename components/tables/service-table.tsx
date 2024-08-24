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
import { Service } from "@/types/service";
import { useEffect, useState } from "react";
import axios from "axios";
import TabsListCustom from "../layout/tabs-list";
import TableCustom from "../common/table-custom";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { Outfit } from "@/types/outfit";

const tabs = [
    { value: "all", label: "All" },
    { value: "album", label: "Album" },
    { value: "outfit", label: "Outfit" },
    { value: "other", label: "Other", className: "hidden sm:flex" },
];
const tableHeadings = [
    { key: 'id', label: 'Id', className: 'hidden' },
    { key: 'src', label: 'Src', className: '' },
    { key: 'type', label: 'Type', className: '' },
    { key: 'title', label: 'Title', className: '' },
    { key: 'description', label: 'Description', className: '' },
    { key: 'createdBy', label: 'Created By', className: 'hidden' },
    { key: 'createdDate', label: 'Created Date', className: 'hidden md:table-cell' },
    { key: 'lastUpdatedBy', label: 'Last Updated By', className: 'hidden' },
    { key: 'lastUpdatedDate', label: 'Last Updated Date', className: 'hidden md:table-cell' },
    { key: 'isDeleted', label: 'Is Deleted', className: '' }
];

interface TableRowsCustomProps {
    services: Service[];
}

function TableRowsCustom({ services }: TableRowsCustomProps) {
    const router = useRouter();

    const handleEditClick = (serviceId: string) => {
        // Navigate to the service details page
        router.push(`/dashboard/service/${serviceId}`);
    };

    const handleContentClick = (serviceId: string) => {
        // Navigate to the service details page
        router.push(`/dashboard/service/${serviceId}/content`);
    };

    const handleDeleteClick = async (serviceId: string) => {
        try {
            // Gọi API DELETE với serviceId trong query string
            const response = await axios.delete(`https://localhost:7192/service-management/services`, {
                params: { Id: serviceId }
            });

            // Nếu xóa thành công, thông báo cho người dùng
            if (response.status === 200) {
                Swal.fire({
                    title: 'Success!',
                    text: 'Service deleted successfully.',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
            }
        } catch (error) {
            // Xử lý lỗi nếu có vấn đề khi xóa service
            console.error(`Failed to delete service with ID: ${serviceId}`, error);

            Swal.fire({
                title: 'Error!',
                text: 'Failed to delete service. Please try again later.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    };
    return (
        <>
            {services.map((service: Service) => (
                <TableRow key={service.id}>
                    <TableCell className="hidden sm:table-cell">
                        <Image
                            alt="Service image"
                            className="aspect-square rounded-md object-cover"
                            height="64"
                            src={service.src || "/placeholder.svg"}
                            width="64"
                        />
                    </TableCell>
                    <TableCell className="font-medium">
                        {service.type || 'N/A'}
                    </TableCell>
                    <TableCell className="font-medium">
                        {service.title || 'N/A'}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                        <Button variant="outline">
                            <Link href={`/dashboard/service/${service.id}/content`}>Content</Link>
                        </Button>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                        {service.createdDate ? new Date(service.createdDate).toLocaleString() : 'N/A'}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                        {service.lastUpdatedDate ? new Date(service.lastUpdatedDate).toLocaleString() : 'N/A'}
                    </TableCell>
                    <TableCell>
                        <Badge variant="outline">{service.isDeleted ? 'Deleted' : 'Active'}</Badge>
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
                                <DropdownMenuItem onClick={() => handleEditClick(service.id)}>Edit</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleDeleteClick(service.id)}>Delete</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </TableCell>
                </TableRow>
            ))}
        </>
    );
}

export default function ServiceTable() {
    const [services, setServices] = useState<Service[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://localhost:7192/service-management/services');
                const services: Service[] = response.data.results;
                console.log("check", services)
                setServices(services);
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
                    <Link className="text-primary-foreground sm:whitespace-nowrap" href="/dashboard/service/new">
                        <Button size="sm" className="h-8 gap-1">
                            <PlusCircle className="fill-primary-foreground h-3.5 w-3.5" />
                            Add Service
                        </Button>
                    </Link>
                </div>
            </div>
            <TabsContent value="all">
                <TableCustom tableHeadings={tableHeadings} tableRows={<TableRowsCustom services={services} />} label={"service"} />
            </TabsContent>
        </Tabs>
    );
}


