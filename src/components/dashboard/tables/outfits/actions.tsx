// OutfitActions.tsx
"use client";

import React from "react";
import {useRouter} from "next/navigation";
import {MoreHorizontal} from "lucide-react";
import Swal from "sweetalert2";
import axios from "axios";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";

interface ActionsProps {
    id: string;
}

const Actions: React.FC<ActionsProps> = ({id}) => {
    const router = useRouter();

    const handleEditClick = () => {
        router.push(`/dashboard/outfit/${id}`);
    };

    const handleOutfitsClick = () => {
        router.push(`/dashboard/outfit/${id}/outfits`);
    };

    const handleDeleteClick = async () => {
        try {
            const response = await axios.delete(`https://localhost:7192/outfits`, {
                params: {Id: id},
            });

            if (response.status === 200) {
                Swal.fire({
                    title: "Success!",
                    text: "Outfit deleted successfully.",
                    icon: "success",
                    confirmButtonText: "OK",
                });
            }
        } catch (error) {
            console.error(`Failed to delete outfit with ID: ${id}`, error);

            Swal.fire({
                title: "Error!",
                text: "Failed to delete outfit. Please try again later.",
                icon: "error",
                confirmButtonText: "OK",
            });
        }
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4"/>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem
                    onClick={() => navigator.clipboard.writeText(id)}
                >
                    Copy model ID
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleOutfitsClick}>
                    View outfits
                </DropdownMenuItem>
                <DropdownMenuSeparator/>
                <DropdownMenuItem onClick={handleEditClick}>
                    Edit
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleDeleteClick}>
                    Delete
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default Actions;
