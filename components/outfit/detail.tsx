'use client';
import { useParams, useRouter } from "next/navigation";

export function OutfitDetailComponent() {
    const { name } = useParams();
    return (
        <div>
            <p>Query Parameters: {name}</p>
        </div>
    );
}