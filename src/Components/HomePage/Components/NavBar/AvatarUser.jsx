import React from "react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Avatar, DropdownSection, Button, User } from "@nextui-org/react";
import { useAuth } from '../../../../AuthContext';


const AvatarUser = () => {
    const { user, handleLogout } = useAuth();
    return (
        <div className="flex items-center gap-4">
            <Dropdown
                radius="sm"
                classNames={{
                    base: "before:bg-default-200",
                    content: "p-0 border-small border-divider bg-background",
                }}
            >
                <DropdownTrigger>
                    <div >
                        <Avatar
                            isBordered
                            radius="sm"
                            as="button"
                            className="transition-transform"
                            src={user.avatar_url}
                        />
                    </div>
                </DropdownTrigger>
                <DropdownMenu
                    textValue="Users Options"
                    aria-label="Custom item styles"
                    disabledKeys={["profile"]}
                    className="p-3 text-center"
                    itemClasses={{
                        base: [
                            "rounded-md",
                            "text-default-500",
                            "transition-opacity",
                            "data-[hover=true]:text-foreground",
                            "data-[hover=true]:bg-default-100",
                            "dark:data-[hover=true]:bg-default-50",
                            "data-[selectable=true]:focus:bg-default-50",
                            "data-[pressed=true]:opacity-70",
                            "data-[focus-visible=true]:ring-default-500",
                        ],
                    }}
                >


                    <DropdownSection aria-label="Profile & Actions" showDivider>
                        <DropdownItem
                            isReadOnly
                            key="profile"
                            className="h-14 gap-2 opacity-100 "
                        >
                            <User
                                name={user?.full_name || user?.username}
                                description={user.email}
                                classNames={{
                                    name: "text-default-600",
                                    description: "text-default-500",
                                }}
                                avatarProps={{
                                    size: "md",
                                    src: `${user?.avatar_url}`,
                                }}
                            />
                        </DropdownItem>
                    </DropdownSection>

                    {user.role === 'instructor' || user.role === 'guest' ? (
                        <DropdownSection aria-label="Profile & Actions" showDivider>
                            <DropdownItem href="/profile">
                                My Profile
                            </DropdownItem>
                            <DropdownItem key="settings">Settings</DropdownItem>
                        </DropdownSection>

                    ) : user.role === 'admin' ? (
                        <DropdownSection aria-label="Profile & Actions" showDivider>
                            <DropdownItem href="/admin/">
                                Dashboard
                            </DropdownItem>
                            <DropdownItem href="/admin/users">
                                Users Manager
                            </DropdownItem>
                            <DropdownItem href="/admin/rooms">
                                Rooms Manager
                            </DropdownItem>
                            <DropdownItem href="/admin/bookings">
                                Bookings Manager
                            </DropdownItem>
                        </DropdownSection>

                    ) : null}

                    {user.role === 'instructor' || user.role === 'guest' ? (
                        <DropdownSection aria-label="Preferences" showDivider>
                            <DropdownItem href="/profile/my-bookings">
                                My Bookings
                            </DropdownItem>
                            <DropdownItem href="/profile/my-classes">
                                My Classes
                            </DropdownItem >
                            <DropdownItem href="/profile/attendance">
                                Attendance
                            </DropdownItem>
                        </DropdownSection>

                    ) : user.role === 'admin' ? (
                        <DropdownSection aria-label="Preferences" showDivider>
                            <DropdownItem href="/admin/attendance-records">
                                Attendance Records
                            </DropdownItem>

                            <DropdownItem href="/admin/classes">
                                Classes & Schedules
                            </DropdownItem>
                            <DropdownItem href="/admin/students">
                                Dance Students
                            </DropdownItem>
                        </DropdownSection>
                    ) : null}

                    <DropdownSection aria-label="Help & Feedback">
                        <DropdownItem key="help_and_feedback">
                            Help & Feedback
                        </DropdownItem>
                        <DropdownItem
                            isReadOnly
                            key="logout"
                            className="text-center"
                        >
                            <Button onClick={handleLogout} radius="full" className="bg-gradient-to-tr from-red-500 to-red-800 text-white shadow-lg">
                                Log Out
                            </Button>
                        </DropdownItem>
                    </DropdownSection>
                </DropdownMenu>
            </Dropdown>
        </div>
    )
}

export default AvatarUser