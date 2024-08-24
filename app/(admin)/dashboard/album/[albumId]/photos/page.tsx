'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Photo } from '@/types/photo'; // Đảm bảo bạn đã định nghĩa kiểu Photo

export default function Page({ params }: { params: { albumId: string } }) {
    const [photoInAlbums, setPhotoInAlbums] = useState<Photo[]>([]);
    const [photos, setPhotos] = useState<Photo[]>([]);
    const [selectedPhotos, setSelectedPhotos] = useState<Photo[]>([]);

    // Fetch photos when component mounts
    const fetchPhotos = async () => {
        try {
            const response = await axios.get(`https://localhost:7192/album-management/albums/${params.albumId}`);
            const response_ = await axios.get("https://localhost:7192/photo-management/photos", {
                params: {
                    type: "NONE"
                }
            });
            setPhotos(response.data.result.photos);
            setPhotoInAlbums(response_.data.results);
        } catch (error) {
            console.error('Failed to fetch photos', error);
        }
    };

    useEffect(() => {
        console.log("photoInAlbums updated:", photoInAlbums);
    }, [photoInAlbums]);

    useEffect(() => {
        fetchPhotos();
    }, [params.albumId]);

    const handlePhotoSelectionChange = async (photo: Photo, checked: boolean) => {
        let updatedSelectedPhotos = [...selectedPhotos];
        
        if (checked) {
            updatedSelectedPhotos.push(photo);
        } else {
            updatedSelectedPhotos = updatedSelectedPhotos.filter(p => p.id !== photo.id);
        }

        setSelectedPhotos(updatedSelectedPhotos);

        if (checked) {
            try {
                await axios.post(`https://localhost:7192/album-management/albums/${params.albumId}/photos`, photo);
                // Refresh photos list after adding the photo
                fetchPhotos();
            } catch (error: any) {
                console.error('Failed to add photo', error.response?.data || error.message);
            }
        }
    };

    const handleDeletePhoto = async (photo: Photo) => {
        try {
            setSelectedPhotos(prevSelectedPhotos =>
                prevSelectedPhotos.filter(p => p.id !== photo.id)
            );

            await axios.delete(`https://localhost:7192/album-management/albums/${params.albumId}/photos`, {
                params: {
                    photoId: photo.id // Gửi ID của ảnh qua query parameters
                }
            });
            // Refresh photos list after deleting the photo
            fetchPhotos();
        } catch (error: any) {
            console.error('Failed to delete photo', error.response?.data || error.message);
        }
    };

    return (
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
                    {photos
                    
                    .map((photo) => (
                        <TableRow key={photo.id}>
                            <TableCell>
                                {photo.src && <img src={photo.src} alt={photo.title} className="w-12 h-12 object-cover" />}
                            </TableCell>
                            <TableCell>{photo.title}</TableCell>
                            <TableCell>{photo.description}</TableCell>
                            <TableCell>
                                <Button onClick={() => handleDeletePhoto(photo)} variant="outline" color="red">
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
                        <DropdownMenuSeparator />
                        {photoInAlbums
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
    );
};
