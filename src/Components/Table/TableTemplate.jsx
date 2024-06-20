import { PlusIcon } from "./PlusIcon";
import { VerticalDotsIcon } from "./VerticalDotsIcon";
import { SearchIcon } from "./SearchIcon";
import { ChevronDownIcon } from "./ChevronDownIcon";
import { capitalize } from "./utils";

import React, { useState } from "react";
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Input,
    Button,
    DropdownTrigger,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Chip,
    User,
    Pagination,
    Avatar,
    Modal,
    ModalBody,
    ModalContent,
    ModalHeader,
    Image
} from "@nextui-org/react";

const statusColorMap = {
    present: "success",
    completed: "success",
    absent: "danger",
    late: "warning",
    pending: "warning",
    confirmed: "success",
    canceled: "danger",
    waiting: "secondary",
    cancelled: "danger"
};

const cloudinaryBaseUrl = 'https://res.cloudinary.com/dqgu13tbd';

const TableTemplate = ({
    columns,
    data,
    statusOptions,
    initialVisibleColumns,
    rowsPerPageOptions = [5, 10, 15],
    renderActions,
    onAddNew,
    AddNewBtn_active
}) => {
    const [addNewbtn_active, setAddNewBtn] = useState(AddNewBtn_active)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalImage, setModalImage] = useState("");
    const [filterValue, setFilterValue] = React.useState("");
    const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
    const [visibleColumns, setVisibleColumns] = React.useState(new Set(initialVisibleColumns));
    const [statusFilter, setStatusFilter] = React.useState("all");
    const [rowsPerPage, setRowsPerPage] = React.useState(rowsPerPageOptions[0]);
    const [sortDescriptor, setSortDescriptor] = React.useState({
        column: "id",
        direction: "ascending",
    });
    const [page, setPage] = React.useState(1);

    const hasSearchFilter = Boolean(filterValue);

    const headerColumns = React.useMemo(() => {
        if (visibleColumns === "all") return columns;

        return columns.filter((column) => Array.from(visibleColumns).includes(column.uid));
    }, [visibleColumns, columns]);

    const filteredItems = React.useMemo(() => {
        let filteredData = [...data];

        //SEARCH VALUE SETTING HERE
        if (hasSearchFilter) {
            filteredData = filteredData.filter((item) =>
            (
                item.username?.toLowerCase().includes(filterValue.toLowerCase()) ||
                item.instructor_name?.toLowerCase().includes(filterValue.toLowerCase()) ||
                item.day_of_the_week_value?.toLowerCase().includes(filterValue.toLowerCase()) ||
                item.date?.toLowerCase().includes(filterValue.toLowerCase()) ||
                item.class_name?.toLowerCase().includes(filterValue.toLowerCase())

            )
            );
        }

        if (statusFilter !== "all" && Array.from(statusFilter).length !== statusOptions.length) {
            filteredData = filteredData.filter((item) =>
                Array.from(statusFilter).some(status => status === item.deposit_status || status === item.status)
            );
        }

        return filteredData;
    }, [data, filterValue, statusFilter, statusOptions]);

    const pages = Math.ceil(filteredItems.length / rowsPerPage);

    const items = React.useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return filteredItems.slice(start, end);
    }, [page, filteredItems, rowsPerPage]);

    const sortedItems = React.useMemo(() => {
        return [...items].sort((a, b) => {
            const first = a[sortDescriptor.column];
            const second = b[sortDescriptor.column];
            const cmp = first < second ? -1 : first > second ? 1 : 0;

            return sortDescriptor.direction === "descending" ? -cmp : cmp;
        });
    }, [sortDescriptor, items]);

    const handleImageClick = (imageUrl) => {
        setModalImage(imageUrl);
        setIsModalOpen(true);
    };

    const renderCell = React.useCallback((item, columnKey) => {
        const cellValue = item[columnKey];
        // console.log(item);

        switch (columnKey) {
            case "status":
                return (
                    <Chip className="capitalize" color={statusColorMap[cellValue]} size="sm" variant="flat">
                        {cellValue}
                    </Chip>
                );
            case "deposit_status":
                return (
                    <Chip className="capitalize" color={statusColorMap[cellValue]} size="sm" variant="dot">
                        {cellValue}
                    </Chip>
                );
            case "user":
                return (
                    <div className="text-left">
                        <User
                            // avatarProps={{ radius: "lg", src: `${cloudinaryBaseUrl}/${item?.user_avatar}` }}
                            avatarProps={
                                item?.user_avatar
                                    ? { radius: "lg", src: `${cloudinaryBaseUrl}/${item.user_avatar}` }
                                    : undefined
                            }
                            description={item?.user_email}
                            name={item?.username}
                        >
                            {item?.email}
                        </User>
                    </div>
                );
            case "guest":
                return (
                    <div className="text-left">
                        <User
                            avatarProps={
                                item?.guest_avatar
                                    ? { radius: "lg", src: `${cloudinaryBaseUrl}/${item.guest_avatar}` }
                                    : undefined
                            }
                            description={item.guest_email}
                            name={item.guest_username}
                        >
                            {item?.guest_email}
                        </User>
                    </div>
                );
            case "instructor":
                return (
                    <div className="text-left">
                        <User
                            avatarProps={{ radius: "lg", src: `${cloudinaryBaseUrl}/${item.instructor_avatar}` }}
                            description={item.instructor_email}
                            name={item.instructor_name}
                        >
                            {item.instructor_email}
                        </User>
                    </div>
                );
            case "class_lesson":
                return (
                    <div className="text-left">
                        <User
                            avatarProps={{ radius: "lg", src: `${cloudinaryBaseUrl}/${item.class_img}` }}
                            name={item.class_lesson}
                        >
                            {item.instructor_name}
                        </User>
                    </div>
                );
            case "checkin_proof":
                return (
                    <div className="flex justify-center">
                        {item.checkin_proof ? (
                            <Avatar
                                src={`${cloudinaryBaseUrl}/${item.checkin_proof}`}
                                radius="sm"
                                onClick={() => handleImageClick(`${cloudinaryBaseUrl}/${item.checkin_proof}`)}
                                style={{ cursor: "pointer" }}
                            />
                        ) : (
                            <span>No Proof</span>
                        )}
                    </div>
                );
            case "checkout_proof":
                return (
                    <div className="flex justify-center">
                        {item.checkout_proof ? (
                            <Avatar
                                src={`${cloudinaryBaseUrl}/${item.checkout_proof}`}
                                radius="sm"
                                onClick={() => handleImageClick(`${cloudinaryBaseUrl}/${item.checkout_proof}`)}
                                style={{ cursor: "pointer" }}
                            />
                        ) : (
                            <span>No Proof</span>
                        )}
                    </div>
                );
            case "checkout_time":
            case "date":
            case "status_name":
                return cellValue;
            case "actions":
                return renderActions ? renderActions(item) : cellValue;  // Use custom render function if provided
            default:
                return cellValue;
        }
    }, [renderActions]);

    const onNextPage = React.useCallback(() => {
        if (page < pages) {
            setPage(page + 1);
        }
    }, [page, pages]);

    const onPreviousPage = React.useCallback(() => {
        if (page > 1) {
            setPage(page - 1);
        }
    }, [page]);

    const onRowsPerPageChange = React.useCallback((e) => {
        setRowsPerPage(Number(e.target.value));
        setPage(1);
    }, []);

    const onSearchChange = React.useCallback((value) => {
        if (value) {
            setFilterValue(value);
            setPage(1);
        } else {
            setFilterValue("");
        }
    }, []);

    const onClear = React.useCallback(() => {
        setFilterValue("")
        setPage(1)
    }, [])

    const topContent = React.useMemo(() => {
        return (
            <div className="flex flex-col gap-4">
                <div className="flex justify-between gap-3 items-end">
                    <Input
                        isClearable
                        className="w-full sm:max-w-[44%]"
                        placeholder="Search..."
                        startContent={<SearchIcon />}
                        value={filterValue}
                        onClear={() => onClear()}
                        onValueChange={onSearchChange}
                    />
                    <div className="flex gap-2">
                        <Dropdown>
                            <DropdownTrigger className="sm:flex">
                                <Button endContent={<ChevronDownIcon className="text-small" />} variant="flat">
                                    Status
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu
                                disallowEmptySelection
                                aria-label="Table Columns"
                                closeOnSelect={false}
                                selectedKeys={statusFilter}
                                selectionMode="multiple"
                                onSelectionChange={setStatusFilter}
                            >
                                {statusOptions?.map((status) => (
                                    <DropdownItem key={status.uid} className="capitalize">
                                        {capitalize(status.name)}
                                    </DropdownItem>
                                ))}
                            </DropdownMenu>
                        </Dropdown>
                        <Dropdown>
                            <DropdownTrigger className="sm:flex">
                                <Button endContent={<ChevronDownIcon className="text-small" />} variant="flat">
                                    Columns
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu
                                disallowEmptySelection
                                aria-label="Table Columns"
                                closeOnSelect={false}
                                selectedKeys={visibleColumns}
                                selectionMode="multiple"
                                onSelectionChange={setVisibleColumns}
                            >
                                {columns.map((column) => (
                                    <DropdownItem key={column.uid} className="capitalize">
                                        {capitalize(column.name)}
                                    </DropdownItem>
                                ))}
                            </DropdownMenu>
                        </Dropdown>
                        <Button color="danger" endContent={<PlusIcon />} onClick={onAddNew} className={addNewbtn_active}>
                            Add New
                        </Button>
                    </div>
                </div>

                <div className="flex justify-between items-center">
                    <span className="text-default-400 text-small">Total {data.length} items</span>
                    <label className="flex items-center text-default-400 text-small">
                        Rows per page:
                        <select
                            className="bg-transparent outline-none text-default-400 text-small"
                            onChange={onRowsPerPageChange}
                        >
                            {rowsPerPageOptions.map(option => (
                                <option key={option} value={option}>{option}</option>
                            ))}
                        </select>
                    </label>
                </div>
            </div>
        );
    }, [
        filterValue,
        statusFilter,
        visibleColumns,
        onRowsPerPageChange,
        data.length,
        onSearchChange,
        hasSearchFilter,
        rowsPerPageOptions,
    ]);

    const bottomContent = React.useMemo(() => {
        return (
            <div className="py-2 px-2 flex justify-between items-center gap-2">
                <span className="w-[30%] text-small text-default-400">
                    {selectedKeys === "all"
                        ? "All items selected"
                        : `${selectedKeys.size} of ${filteredItems.length} selected`}
                </span>
                <Pagination
                    className="sm:flex"
                    isCompact
                    // showControls
                    showShadow
                    color="danger"
                    page={page}
                    total={pages}
                    onChange={setPage}
                />
                <div className="hidden sm:flex w-[30%] justify-end gap-2">
                    <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onPreviousPage}>
                        Previous
                    </Button>
                    <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onNextPage}>
                        Next
                    </Button>
                </div>
            </div>
        );
    }, [selectedKeys, items.length, page, pages, hasSearchFilter]);

    return (
        <div className="tableTemplate">
            <Table
                aria-label="Example table with custom cells, pagination and sorting"
                isHeaderSticky
                bottomContent={bottomContent}
                bottomContentPlacement="outside"
                classNames={{
                    wrapper: "max-h-screen text-center", //Change table height here
                }}
                selectedKeys={selectedKeys}
                selectionMode="multiple"
                sortDescriptor={sortDescriptor}
                topContent={topContent}
                topContentPlacement="outside"
                onSelectionChange={setSelectedKeys}
                onSortChange={setSortDescriptor}
            >
                <TableHeader columns={headerColumns}>
                    {(column) => (
                        <TableColumn
                            key={column.uid}
                            align={column.uid === "actions" ? "center" : "start"}
                            allowsSorting={column.allowsSorting}
                            className="text-center"
                        >
                            {column.name}
                        </TableColumn>
                    )}
                </TableHeader>
                <TableBody emptyContent={"No items found"} items={sortedItems}>
                    {(item) => (
                        <TableRow key={item.id}>
                            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <ModalContent>
                    <>
                        <ModalHeader>
                            <div id="modal-title" style={{ fontSize: '18px', fontWeight: 'bold' }}>
                                PROOF
                            </div>
                        </ModalHeader>
                        <ModalBody>
                            <Image
                                src={modalImage}
                                alt="Checkout Proof"
                                objectFit="contain"
                            />
                        </ModalBody>
                    </>
                </ModalContent>
            </Modal>
        </div>
    );

}

export default TableTemplate;