'use client';

import * as React from 'react';
import {useEffect, useState} from 'react';
import axios from 'axios';
import {Button} from '@/components/ui/button';
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from '@/components/ui/table';
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import {Photo} from '@/types/photo';
import {PhotoGetAllQuery} from "@/types/queries/photo-query";
import {fetchPhotos} from "@/services/photo-service";
import {fetchAlbum} from "@/services/album-service";
import {Album, AlbumXPhoto} from "@/types/album";
import {Breadcrumbs} from "@/components/user/breadcrumb";
import {ContentLayout} from "@/components/dashboard/content-layout"; // Đảm bảo bạn đã định nghĩa kiểu Photo

export default function Page({params}: { params: { albumId: string } }) {
    const [photoInAlbums, setPhotoInAlbums] = useState<Photo[]>([]);
    const [photos, setPhotos] = useState<Photo[]>([]);
    const [photoRemains, setPhotoRemains] = useState<Photo[]>([]);
    const [selectedPhotos, setSelectedPhotos] = useState<Photo[]>([]);

    const [queryParams, setQueryParams] = useState<PhotoGetAllQuery>({
        isPagination: false,
    });

    const [albumXPhotos, setAlbumXPhotos] = useState<AlbumXPhoto[] | undefined>(undefined);
    const [album, setAlbum] = useState<Album>();

    useEffect(() => {
        // Chỉ gọi API khi params.albumId hoặc queryParams thay đổi
        const fetchData = async () => {
            try {
                const [albumResponse, photosResponse] = await Promise.all([
                    fetchAlbum(params.albumId),
                    fetchPhotos(queryParams),
                ]);

                setPhotos(photosResponse.results ?? []);

                setAlbumXPhotos(albumResponse.result?.albumXPhotos);

            } catch (error) {
                console.error('Failed to fetch album or photos:', error);
            }
        };

        // Gọi hàm fetchData chỉ khi albumId và queryParams thay đổi
        if (params.albumId && queryParams) {
            fetchData();
        }
    }, [params.albumId, queryParams]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (albumXPhotos && albumXPhotos.length > 0) {
                    const photos_ = albumXPhotos.map((x) => x.photo).filter((photo): photo is Photo => photo !== undefined);
                    setPhotoInAlbums(photos_);
                } else {
                    setPhotoInAlbums([]);
                }
            } catch (error) {
                console.error('Failed to fetch album or photos:', error);
            }
        };

        if (albumXPhotos) {
            fetchData();
        }
    }, [albumXPhotos]);

    useEffect(() => {
        const remainingPhotos = photos.filter(photo => !photoInAlbums.some(albumPhoto => albumPhoto.id === photo.id));
        setPhotoRemains(remainingPhotos);
    }, [photos, photoInAlbums]);

    const handlePhotoSelectionChange = async (photo: Photo, checked: boolean) => {
        let updatedSelectedPhotos = [...selectedPhotos];

        if (checked) {
            updatedSelectedPhotos.push(photo);
        } else {
            updatedSelectedPhotos = updatedSelectedPhotos.filter(p => p.id !== photo.id);
        }

        setSelectedPhotos(updatedSelectedPhotos);
        const albumXPhotoCommand_: Partial<AlbumXPhoto> = {
            albumId: params.albumId,
            photoId: photo.id
        }

        if (checked) {
            try {
                await axios.post(`https://localhost:7192/albums/albumXPhotos`, albumXPhotoCommand_);
                // Refresh photos list after adding the photo
                const albumResponse = await fetchAlbum(params.albumId);
                setAlbumXPhotos(albumResponse.result?.albumXPhotos);
            } catch (error: any) {
                console.error('Failed to add photo', error.response?.data || error.message);
            }
        }
    };

    const handleDeletePhoto = async (photo: Photo) => {
        const albumXPhotoCommand_: Partial<AlbumXPhoto> = {
            albumId: params.albumId,
            photoId: photo.id
        }
        try {
            const queryParams = new URLSearchParams(albumXPhotoCommand_ as any).toString();

            await axios.delete(`https://localhost:7192/albums/albumXPhotos?${queryParams}`);
            // Refresh photos list after adding the photo
            const albumResponse = await fetchAlbum(params.albumId);
            setAlbumXPhotos(albumResponse.result?.albumXPhotos);
        } catch (error: any) {
            console.error('Failed to delete photo', error.response?.data || error.message);
        }
    };

    const breadcrumbItems = [
        {title: "Dashboard", link: "/dashboard"},
        {title: "Album", link: "/dashboard/album"},
        {title: `${params.albumId}`, link: `/dashboard/album/${params.albumId}`},
        {title: `photos`, link: `/dashboard/album/${params.albumId}/photos`},
    ];

    return (
        <ContentLayout title="Album">
            <div className="space-y-6">
                <Breadcrumbs items={breadcrumbItems}/>
                <div className="p-4">
                    <h2 className="text-xl font-bold mb-4">Photos in Album</h2>

                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Image</TableHead>
                                <TableHead>Title</TableHead>
                                <TableHead>Description</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {photoInAlbums

                                .map((photo) => (
                                    <TableRow key={photo.id}>
                                        <TableCell>
                                            {photo.src &&
                                                <img src={photo.src} alt={photo.title}
                                                     className="w-12 h-12 object-cover"/>}
                                        </TableCell>
                                        <TableCell>{photo.title}</TableCell>
                                        <TableCell>{photo.description}</TableCell>
                                        <TableCell>
                                            <Button onClick={() => handleDeletePhoto(photo)} variant="outline"
                                                    color="red">
                                                Delete
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>

                    <div className="mt-8">
                        <h3 className="text-lg font-bold mb-2">Add Photos to Album</h3>

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline"> SelectPhotos</Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56">
                                <DropdownMenuLabel>Select Photos</DropdownMenuLabel>
                                <DropdownMenuSeparator/>
                                {photoRemains
                                    .map((photo) => (
                                        <DropdownMenuCheckboxItem
                                            key={photo.id}
                                            checked={selectedPhotos.some(p => p.id === photo.id)}
                                            onCheckedChange={(checked) => handlePhotoSelectionChange(photo, checked)}
                                        >
                                            <div className="flex items-center space-x-2">
                                                {photo.src && (
                                                    <img
                                                        src={photo.src}
                                                        alt={photo.title || 'Photo'}
                                                        className="w-8 h-8 object-cover rounded"
                                                    />
                                                )}
                                                <span>{photo.title}</span>
                                            </div>
                                        </DropdownMenuCheckboxItem>
                                    ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </div>
        </ContentLayout>

    );
};
