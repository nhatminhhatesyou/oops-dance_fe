import React, { useEffect, useState } from 'react'
import axios from '../../../../../../../axiosConfig'

import {
    useDisclosure,
    Tooltip
} from "@nextui-org/react";

//IMPORTED Template ================>
import TableTemplate from '../../../../../../Table/TableTemplate'
import { EditIcon } from '../../../../../../Table/EditIcon';
import { DeleteIcon } from '../../../../../../Table/DeleteIcon';
import EditUserForm from './EditUserForm';

const AllUsers = () => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [currentUserId, setCurrentUserId] = useState(null);
    const [userList, setUserList] = useState([]);
    const fetchUsers = () => {
        axios.get('/users/')
            .then((response) => {
                setUserList(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    useEffect(() => {
        fetchUsers();
    }, []);

    const handleEditUser = (userId) => {
        setCurrentUserId(userId);
        onOpen();
    };

    const handleDeleteUser = async (userId) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            try {
                await axios.delete(`/users/${userId}/`);
                fetchUsers();
            } catch (error) {
                console.error('Error deleting user:', error);
            }
        }
    };

    //Table dependencies
    const INITIAL_VISIBLE_COLUMNS = ["id", "username", "name", "contact_number", "dob", "role", "actions"];

    const attendanceColumns = [
        { name: "User ID", uid: "id" },
        { name: "Username", uid: "username", allowsSorting: true },
        { name: "Full Name", uid: "name", allowsSorting: true },
        { name: "Contact Number", uid: "contact_number", allowsSorting: true },
        { name: "DOB (y/m/d)", uid: "dob", allowsSorting: true },
        { name: "Role", uid: "role", allowsSorting: true },
        { name: "Actions", uid: "actions" },
    ];

    const formattedUserList = userList.map(record => ({
        id: record.id,
        username: record.username,
        name: record.full_name,
        email: record.email,
        user_avatar: record.avatar,
        dob: record.date_of_birth,
        role: record.role,
        contact_number: record.contact_number,
        actions: (
            <div className="relative flex items-center justify-center gap-2">
                <Tooltip content="Edit User">
                    <span
                        className="text-lg text-gray-400 cursor-pointer active:opacity-50"
                        onClick={() => handleEditUser(record.id)}
                    >
                        <EditIcon />
                    </span>
                </Tooltip>
                <Tooltip color="danger" content="Delete User">
                    <span
                        className="text-lg text-danger cursor-pointer active:opacity-50"
                        onClick={() => handleDeleteUser(record.id)}
                    >
                        <DeleteIcon />
                    </span>
                </Tooltip>
            </div>
        )

    }));

    return (
        <div className='allUserList sectionContainer'>
            <div className="header">
                <h2>All Users</h2>
            </div>
            <div >
                <TableTemplate
                    columns={attendanceColumns}
                    data={formattedUserList}
                    initialVisibleColumns={INITIAL_VISIBLE_COLUMNS}
                    AddNewBtn_active="hidden"
                />
            </div>
            <EditUserForm
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                userId={currentUserId}
                fetchUsers={fetchUsers}
            />
        </div>
    )
}

export default AllUsers