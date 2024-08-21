import Image from "next/image"
import { useForm } from "react-hook-form"
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

interface PhotoFormProps {
    initialData: any | null;
}

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

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
import { px } from "framer-motion";
import { Album } from "@/types/album";
import { Outfit } from "@/types/outfit";
const formSchema = z.object({
    id: z.string().optional(),
    title: z.string().min(1, "Title is required"),
    description: z.string().optional(),
    src: z.string().optional(),
    href: z.string().optional(),
    type: z.string().optional(),
    albumId: z.string().optional().nullable(),
    outfitId: z.string().optional().nullable(),
    createdDate: z.date().optional(),
    createdBy: z.string().optional(),
    isDeleted: z.boolean(),
});

export const PhotoForm: React.FC<PhotoFormProps> = ({ initialData }) => {
    const [loading, setLoading] = useState(false);
    const [imgLoading, setImgLoading] = useState(false);
    const title = initialData ? 'Edit photo' : 'Create photo';
    const description = initialData ? 'Edit a photo.' : 'Add a new photo';
    const toastMessage = initialData ? 'Photo updated.' : 'Photo created.';
    const action = initialData ? 'Save changes' : 'Create';
    const [firebaseLink, setFirebaseLink] = useState<string | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [date, setDate] = useState<Date>();

    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const albumFieldRef = useRef<HTMLDivElement | null>(null);
    const outfitFieldRef = useRef<HTMLDivElement | null>(null);

    const [albums, setAlbums] = useState<Album[]>([]);
    const [outfits, setOutfits] = useState<Outfit[]>([]);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: { title: "", description: "", href: "", src: "", type: "", albumId: null, outfitId: null, createdBy: "N/A", createdDate: new Date(), isDeleted: false },
    });

    // Gọi API để lấy dữ liệu album và outfit khi type thay đổi
    useEffect(() => {
        const type = form.watch('type');

        if (type === 'ALBUM') {
            axios.get('https://localhost:7192/album-management/albums')
                .then(response => {
                    setAlbums(response.data.results);
                })
                .catch(error => {
                    console.error("Error fetching albums:", error);
                });
        } else if (type === 'OUTFIT') {
            axios.get('https://localhost:7192/outfit-management/outfits')
                .then(response => {
                    setOutfits(response.data.results);
                })
                .catch(error => {
                    console.error("Error fetching outfits:", error);
                });
        }
    }, [form.watch('type')]);

    useEffect(() => {
        const type = form.watch('type');
        if (type === 'ALBUM' && albumFieldRef.current) {
            albumFieldRef.current.scrollIntoView({ behavior: 'smooth' });
        } else if (type === 'OUTFIT' && outfitFieldRef.current) {
            outfitFieldRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [form.watch('type')]);

    useEffect(() => {
        const type = form.watch('type');
        if (type === 'ALBUM') {
            form.setValue('outfitId', null); // Đặt outfitId thành null
        } else if (type === 'OUTFIT') {
            form.setValue('albumId', null); // Đặt albumId thành null
        } else {
            form.setValue('albumId', null); // Đặt albumId thành null
            form.setValue('outfitId', null); // Đặt outfitId thành null
        }
    }, [form.watch('type')]);

    useEffect(() => {
        if (initialData) {
            form.reset({
                id: initialData.id || "",
                title: initialData.title || "",
                description: initialData.description || "",
                src: initialData.src || "",
                type: initialData.type || "",
                href: initialData.href || "",
                albumId: initialData.albumId || null,
                outfitId: initialData.outfitId || null,
                createdDate: initialData.createdDate ? new Date(initialData.createdDate) : new Date(),
                createdBy: initialData.createdBy || "",
                isDeleted: !!initialData.isDeleted
            });
            setDate(initialData.createdDate ? new Date(initialData.createdDate) : new Date());
            setImagePreview(initialData.src || "");
            setFirebaseLink(initialData.src || "");
        } else {
            setDate(new Date());
        }
    }, [initialData, form]);


    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setImgLoading(true);
            const storageRef = ref(storage, `Photo/${file.name}`);
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    switch (snapshot.state) {
                        case 'paused':
                            console.log('Upload is paused');
                            break;
                        case 'running':
                            console.log('Upload is running');
                            break;
                    }
                },
                (error) => {
                    console.error(error);
                    setImgLoading(false);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        setImagePreview(downloadURL);
                        setFirebaseLink(downloadURL);
                        setImgLoading(false);
                        form.setValue("src", downloadURL);
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
                    setImagePreview(null);
                    setFirebaseLink(null);
                    form.setValue("src", "");
                    alert("Image successfully deleted!");
                })
                .catch((error) => {
                    console.error("Error deleting image:", error);
                    alert("Failed to delete image.");
                });
        }
    };

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        console.log("form", values)
        try {
            setLoading(true);
            if (initialData) {
                await axios.put('https://localhost:7192/photo-management/photos', values);
                Swal.fire({
                    title: 'Success!',
                    text: 'Photo updated successfully',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
            } else {
                await axios.post('https://localhost:7192/photo-management/photos', values);
                Swal.fire({
                    title: 'Success!',
                    text: 'Photo created successfully',
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
            setLoading(false);
        }
    };

    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

                    <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
                        <div className="flex items-center gap-4">
                            <Link href="/dashboard/photo">
                                <Button variant="outline" size="icon" className="h-7 w-7">
                                    <ChevronLeft className="h-4 w-4" />
                                    <span className="sr-only">Back</span>
                                </Button>
                            </Link>

                            <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                                Photo Controller
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
                                        <CardTitle>Photo Details</CardTitle>
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
                                                                <Textarea placeholder="Photo description" {...field} />
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
                                        <CardTitle>Photo Background</CardTitle>
                                        <CardDescription>
                                            Lipsum dolor sit amet, consectetur adipiscing elit
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <FormField control={form.control} name="src" render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Photo Background</FormLabel>
                                                <FormControl>
                                                    <div className="grid gap-2">
                                                        {imagePreview ? (
                                                            <>
                                                                <Image
                                                                    alt="Photo Background"
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

                                        <FormField
                                            control={form.control}
                                            name="href"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Href</FormLabel>
                                                    <FormControl>
                                                        <Input {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="type"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Type</FormLabel>
                                                    <Select
                                                        onValueChange={(value) => {
                                                            field.onChange(value);
                                                        }}
                                                        value={field.value ?? ""}
                                                    >
                                                        <FormControl>
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="Select type" />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            <SelectGroup>
                                                                <SelectLabel>Types</SelectLabel>
                                                                <SelectItem value="ALBUM">Album</SelectItem>
                                                                <SelectItem value="OUTFIT">Outfit</SelectItem>
                                                                <SelectItem value="BACKGROUND_WEB">Background web</SelectItem>
                                                            </SelectGroup>
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <div ref={albumFieldRef}>
                                            {form.watch('type') === 'ALBUM' && (
                                                <FormField
                                                    control={form.control}
                                                    name="albumId"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Album</FormLabel>
                                                            <FormControl>
                                                                <Select
                                                                    onValueChange={(value) => field.onChange(value)}
                                                                    defaultValue={field.value ?? undefined}
                                                                >
                                                                    <SelectTrigger>
                                                                        <SelectValue placeholder="Select Album ID" />
                                                                    </SelectTrigger>
                                                                    <SelectContent>
                                                                        {albums.map((album) => (
                                                                            <SelectItem key={album.id} value={album.id}>
                                                                                {album.title}
                                                                            </SelectItem>
                                                                        ))}
                                                                    </SelectContent>
                                                                </Select>
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            )}
                                        </div>
                                        <div ref={outfitFieldRef}>
                                            {form.watch('type') === 'OUTFIT' && (
                                                <FormField
                                                    control={form.control}
                                                    name="outfitId"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Outfit</FormLabel>
                                                            <FormControl>
                                                                <Select
                                                                    onValueChange={(value) => field.onChange(value)}
                                                                    defaultValue={field.value ?? undefined}
                                                                >
                                                                    <SelectTrigger>
                                                                        <SelectValue placeholder="Select Outfit ID" />
                                                                    </SelectTrigger>
                                                                    <SelectContent>
                                                                        {outfits.map((outfit) => (
                                                                            <SelectItem key={outfit.id} value={outfit.id}>
                                                                                {outfit.name}
                                                                            </SelectItem>
                                                                        ))}
                                                                    </SelectContent>
                                                                </Select>
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            )}
                                        </div>
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
                                        <CardTitle>Archive Photo</CardTitle>
                                        <CardDescription>
                                            Lipsum dolor sit amet, consectetur adipiscing elit.
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div></div>
                                        <Button size="sm" variant="secondary">
                                            Archive Photo
                                        </Button>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                        <div className="flex items-center justify-center gap-2 md:hidden">
                            <Button variant="outline" size="sm">
                                Discard
                            </Button>
                            <Button size="sm">Save Photo</Button>
                        </div>
                    </div>
                </form>
            </Form >
        </>
    );
};