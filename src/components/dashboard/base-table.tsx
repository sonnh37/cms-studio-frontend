import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table"

const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

export default function BaseTable({tableHeadings, tableRows, label}: any) {
    return (
        <Card x-chunk="dashboard-06-chunk-0">
            <CardHeader>
                <CardTitle>{capitalizeFirstLetter(label)}s</CardTitle>
                <CardDescription>
                    Manage your {label}s and view their sales performance.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            {tableHeadings.map(({key, label, className}: any) => (
                                <TableHead key={key} className={className}>
                                    {label}
                                </TableHead>
                            ))}
                            <TableHead>
                                <span className="sr-only">Actions</span>
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {tableRows}
                    </TableBody>
                </Table>
            </CardContent>
            <CardFooter>
                <div className="text-xs text-muted-foreground">
                    Showing <strong>1-10</strong> of <strong>32</strong>{" "}
                    {label}s
                </div>
            </CardFooter>
        </Card>
    );
}