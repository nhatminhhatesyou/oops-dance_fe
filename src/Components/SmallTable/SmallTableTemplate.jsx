

import React from "react";
import {
    Table, TableHeader, TableColumn, TableBody, TableRow, TableCell,
    Pagination,
    getKeyValue,
    User
} from "@nextui-org/react";

const SmallTableTemplate = ({ data, columns, rowsPerPage = 4 }) => {
    const [page, setPage] = React.useState(1);

    const pages = Math.ceil(data.length / rowsPerPage);

    const items = React.useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return data.slice(start, end);
    }, [page, data]);

    const renderCell = (item, columnKey) => {
        const cellValue = item[columnKey];
        switch (columnKey) {
            case "email":
                return <a href={`mailto:${cellValue}`} className="text-blue-500">{cellValue}</a>;
            case "user":
                return (
                    <User
                        avatarProps={
                            item?.avatar
                                ? { radius: "lg", src: `${cloudinaryBaseUrl}/${item.avatar}` }
                                : undefined
                        }
                        description={item?.email}
                        name={item?.name || item?.username}
                    >
                        {item?.email}
                    </User>
                );
            default:
                return cellValue;
        }
    };

    return (
        <Table
            aria-label="Small table with client side pagination"
            bottomContent={
                <div className="flex w-full justify-center">
                    <Pagination
                        isCompact
                        showControls
                        showShadow
                        color="danger"
                        page={page}
                        total={pages}
                        onChange={(page) => setPage(page)}
                    />
                </div>
            }
            classNames={{
                wrapper: "min-h-[222px] text-center",
            }}
        >
            <TableHeader>
                {columns.map((column) => (
                    <TableColumn key={column.uid} className="text-center">{column.name}</TableColumn>
                ))}
            </TableHeader>
            <TableBody items={items}>
                {(item) => (
                    <TableRow key={item.id}>
                        {columns.map((column) => (
                            <TableCell key={column.uid} >
                                {renderCell(item, column.uid)}
                            </TableCell>
                        ))}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
};

export default SmallTableTemplate;