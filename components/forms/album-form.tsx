'use client';
import Image from "next/image"
import { Controller, useForm } from "react-hook-form"
import Link from "next/link"
import Swal from 'sweetalert2';
import {
    CalendarIcon,
    ChevronLeft,
    Upload,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { Textarea } from "@/components/ui/textarea"

import { useEffect, useRef, useState } from "react";

interface AlbumFormProps {
    initialData: any | null;
}
import MultipleSelector, { Option } from '@/components/ui/multiple-selector';

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "@/firebase";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { Calendar } from "../ui/calendar"
import axios from "axios"
import { Photo } from "@/types/photo";
import { Checkbox } from "../ui/checkbox";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
const formSchema = z.object({
    id: z.string().optional(),
    title: z.string().min(1, "Title is required"),
    description: z.string().optional(),
    background: z.string().optional(),
    createdDate: z.date().optional(),
    createdBy: z.string().optional(),
    isDeleted: z.boolean(),
    photos: z.array(z.object({
        id: z.string().optional(),
        src: z.string().optional(),
        title: z.string().optional(),
    })).optional(),
});

export const AlbumForm: React.FC<AlbumFormProps> = ({
    initialData
}) => {
    const [loading, setLoading] = useState(false);
    const [imgLoading, setImgLoading] = useState(false);
    const title = initialData ? 'Edit album' : 'Create album';
    const description = initialData ? 'Edit a album.' : 'Add a new album';
    const toastMessage = initialData ? 'Album updated.' : 'Album created.';
    const action = initialData ? 'Save changes' : 'Create';
    const [firebaseLink, setFirebaseLink] = useState<string | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [date, setDate] = useState<Date>();
    const [photos, setPhotos] = useState<Photo[]>([]);
    const [selectedPhotos, setSelectedPhotos] = useState<string[]>([]);

    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setImgLoading(true);
            const storageRef = ref(storage, `Album/${file.name}`);
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const progress =
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100

                    //setProgressUpload(progress) // to show progress upload

                    switch (snapshot.state) {
                        case 'paused':
                            console.log('Upload is paused')
                            break
                        case 'running':
                            console.log('Upload is running')
                            break
                    }
                },
                (error) => {
                    // Xử lý lỗi
                    console.error(error);
                    setImgLoading(false);
                },
                () => {
                    // Upload hoàn tất, lấy URL ảnh
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        setImagePreview(downloadURL);
                        setFirebaseLink(downloadURL);
                        setImgLoading(false);
                        form.setValue("background", downloadURL);
                    });
                }
            );
        }
    };

    const handleImageDelete = () => {
        if (firebaseLink) {
            const imageRef = ref(storage, firebaseLink);

            deleteObject(imageRef)
                .then(() => {
                    // Remove the image from the state
                    setImagePreview(null);
                    setFirebaseLink(null);
                    form.setValue("background", "");
                    alert("Image successfully deleted!");
                })
                .catch((error) => {
                    console.error("Error deleting image:", error);
                    alert("Failed to delete image.");
                });
        }
    };




    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setLoading(true); // Bắt đầu trạng thái loading

            if (initialData) {
                // API cập nhật album
                const response = await axios.put(`https://localhost:7192/album-management/albums`, values);
                Swal.fire({
                    title: 'Success!',
                    text: 'Album updated successfully',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
            } else {
                // API tạo album
                const response = await axios.post('https://localhost:7192/album-management/albums', values);
                Swal.fire({
                    title: 'Success!',
                    text: 'Album created successfully',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
            }
        } catch (error: any) {
            console.error(error);
            Swal.fire({
                title: 'Error!',
                text: error.response?.data?.message || 'Something went wrong',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        } finally {
            setLoading(false); // Kết thúc trạng thái loading
        }
    };


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: { title: "", description: "", background: "", createdBy: "N/A", createdDate: new Date(), photos: [], isDeleted: false },
    })

    useEffect(() => {
        if (initialData) {
            // Reset the form with initial data
            form.reset({
                id: initialData.id || "",
                title: initialData.title || "",
                description: initialData.description || +"",
                background: initialData.background || "",
                createdDate: initialData.createdDate ? new Date(initialData.createdDate) : new Date(),
                createdBy: initialData.createdBy || "",
                isDeleted: !!initialData.isDeleted,
                photos: initialData.photos || []
            });

            // Update local state for date
            setDate(initialData.createdDate ? new Date(initialData.createdDate) : new Date());

            // Update local state for image preview and link
            setImagePreview(initialData.background || "");
            setFirebaseLink(initialData.background || "");
        } else {
            setDate(new Date());
        }
    }, [initialData, form]);

    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

                    <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
                        <div className="flex items-center gap-4">
                            <Link href="/dashboard/album">
                                <Button variant="outline" size="icon" className="h-7 w-7">
                                    <ChevronLeft className="h-4 w-4" />
                                    <span className="sr-only">Back</span>
                                </Button>
                            </Link>

                            <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                                Album Controller
                            </h1>
                            <Badge variant="outline" className="ml-auto sm:ml-0">
                                <FormField
                                    control={form.control}
                                    name="isDeleted"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <p>{field.value ? 'Disactived' : 'Actived'}</p>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </Badge>
                            <div className="hidden items-center gap-2 md:ml-auto md:flex">
                                <Button variant="outline" size="sm">
                                    Discard
                                </Button>
                                <Button type="submit" size="sm" disabled={loading}>
                                    {loading ? 'Processing...' : action}
                                </Button>
                            </div>
                        </div>
                        <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
                            <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                                <Card x-chunk="dashboard-07-chunk-0">
                                    <CardHeader>
                                        <CardTitle>Album Details</CardTitle>
                                        <CardDescription>
                                            Lipsum dolor sit amet, consectetur adipiscing elit
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>

                                        <div className="grid gap-6">
                                            <div className="grid gap-3">
                                                <FormField
                                                    control={form.control}
                                                    name="title"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Title</FormLabel>
                                                            <FormControl>
                                                                <Input placeholder="shadcn" {...field} />
                                                            </FormControl>
                                                            <FormDescription>
                                                                This is your public display name.
                                                            </FormDescription>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>
                                            <div className="grid gap-3">
                                                <FormField
                                                    control={form.control}
                                                    name="description"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Description</FormLabel>
                                                            <FormControl>
                                                                <Textarea placeholder="Album description" {...field} />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                                <Card
                                    className="overflow-hidden" x-chunk="dashboard-07-chunk-2"
                                >
                                    <CardHeader>
                                        <CardTitle>Album Background</CardTitle>
                                        <CardDescription>
                                            Lipsum dolor sit amet, consectetur adipiscing elit
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <FormField control={form.control} name="background" render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Album Background</FormLabel>
                                                <FormControl>
                                                    <div className="grid gap-2">
                                                        {imagePreview ? (
                                                            <>
                                                                <Image
                                                                    alt="Album Background"
                                                                    className="aspect-square w-full rounded-md object-cover"
                                                                    height={300}
                                                                    src={imagePreview}
                                                                    width={300}
                                                                />
                                                                <p className="text-blue-500 underline" {...field}>
                                                                    <a href={firebaseLink!} target="_blank" rel="noopener noreferrer">
                                                                        {firebaseLink}
                                                                    </a>
                                                                </p>
                                                                <Button onClick={handleImageDelete} variant="destructive">
                                                                    Delete Image
                                                                </Button>
                                                            </>
                                                        ) : (
                                                            <div className="grid grid-cols-3 gap-2">
                                                                <button
                                                                    type="button"
                                                                    className="flex aspect-square w-full items-center justify-center rounded-md border border-dashed"
                                                                    onClick={() => fileInputRef.current?.click()}
                                                                >
                                                                    <Upload className="h-4 w-4 text-muted-foreground" />
                                                                    <span className="sr-only">Upload</span>
                                                                </button>
                                                            </div>
                                                        )}
                                                        <input
                                                            type="file"
                                                            accept="image/*"
                                                            ref={fileInputRef}
                                                            className="hidden"
                                                            onChange={handleImageChange}
                                                        />
                                                        <FormMessage />
                                                    </div>
                                                </FormControl>
                                            </FormItem>
                                        )} />
                                    </CardContent>
                                </Card>
                            </div>
                            <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
                                <Card x-chunk="dashboard-07-chunk-3">
                                    <CardHeader>
                                        <CardTitle>Information</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid gap-6">
                                            <div className="grid gap-3">
                                                <FormField
                                                    control={form.control}
                                                    name="createdBy"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Email</FormLabel>
                                                            <FormControl>
                                                                <Input disabled placeholder="N/A" {...field} />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>
                                            <div className="grid gap-3">
                                                <FormField
                                                    control={form.control}
                                                    name="createdDate"
                                                    render={({ field }) => {
                                                        const handleDateSelect = (selectedDate: any) => {
                                                            setDate(selectedDate);
                                                            field.onChange(selectedDate ? new Date(selectedDate) : new Date()); // Update form value
                                                        };
                                                        return (

                                                            <FormItem>
                                                                <FormLabel>Created Date</FormLabel>
                                                                <FormControl>
                                                                    <Popover>
                                                                        <PopoverTrigger asChild>
                                                                            <Button
                                                                                disabled
                                                                                variant={"outline"}
                                                                                className={`w-[280px] justify-start text-left font-normal ${!date ? "text-muted-foreground" : ""}`}
                                                                            >
                                                                                <CalendarIcon className="mr-2 h-4 w-4" />
                                                                                {date ? format(date, "PPP") : <span>Pick a date</span>}
                                                                            </Button>
                                                                        </PopoverTrigger>
                                                                        <PopoverContent className="w-auto p-0">
                                                                            <Calendar
                                                                                mode="single"
                                                                                selected={date}
                                                                                onSelect={handleDateSelect}
                                                                                initialFocus
                                                                            />
                                                                        </PopoverContent>
                                                                    </Popover>
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )
                                                    }}
                                                />
                                            </div>

                                        </div>
                                    </CardContent>
                                </Card>
                                <Card x-chunk="dashboard-07-chunk-5">
                                    <CardHeader>
                                        <CardTitle>Archive Album</CardTitle>
                                        <CardDescription>
                                            Lipsum dolor sit amet, consectetur adipiscing elit.
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div></div>
                                        <Button size="sm" variant="secondary">
                                            Archive Album
                                        </Button>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                        <div className="flex items-center justify-center gap-2 md:hidden">
                            <Button variant="outline" size="sm">
                                Discard
                            </Button>
                            <Button size="sm">Save Album</Button>
                        </div>
                    </div>
                </form>
            </Form>
        </>
    );
};
