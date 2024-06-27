import { React, useState, useEffect } from 'react'
import { Card, CardFooter, Image, Button, Input, DateInput } from "@nextui-org/react";
import { useAuth } from '../../../../../../../AuthContext';
import axios from '../../../../../../../axiosConfig';
import { parseDate } from "@internationalized/date";
import { format, parseISO } from 'date-fns';
import './setting.css'

//imported images ================>
import studio_img from "../../../../../../Assets/studio-Image2.jpg"
import video from '../../../../Assets_Instructor/video_short.mp4'


const Setting = () => {
    const { user } = useAuth();
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [myDate, setMyDate] = useState("");

    const [userData, setUserData] = useState({
        username: '',
        full_name: '',
        email: '',
        contact_number: '',
        date_of_birth: '',
        role: ''
    });
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        if (user.id) {
            axios.get(`/users/${user.id}/`)
                .then(response => {
                    setUserData(response.data);
                    // console.log("ISO DATE:", format(parseISO(response.data.date_of_birth), " YYYY-MM-DDThh:mm:ssTZD"));
                    // console.log("ISO DATE:", parseISO(response.data.date_of_birth));
                    // console.log("DATE:", parseISO(response.data.date_of_birth));
                    setMyDate(new Date(response.data.date_of_birth))
                    const datecl = parseDate(format(new Date(response.data.date_of_birth), 'yyyy-MM-dd'))
                    // console.log("DATE lozzz:", parseDate(format(new Date(response.data.date_of_birth), 'yyyy-MM-dd')));
                })
                .catch(error => {
                    console.error('Error fetching user data:', error);
                });
        }
    }, [user.id]);

    useEffect(() => {
        if (userData.date_of_birth) {
            // console.log("DATE cakkk:", parseDate(format(new Date(user.date_of_birth), 'yyyy-MM-dd')));

        }
    }, [userData])


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    const handleDateChange = (value) => {
        const formattedDate = format(new Date(value), 'yyyy-MM-dd');
        setUserData({ ...userData, date_of_birth: formattedDate });
    };

    const handleSubmit = async () => {
        setLoading(true);
        console.log("data:", userData);
        try {
            const response = await axios.patch(`/users/${user.id}/`, userData);

            if (response.status === 200) {
                alert("User updated successfully")
                fetchUsers();
                onOpenChange(false);
            } else {
                alert("Error updating user");
            }
        } catch (error) {
            alert("Error updating user");
            console.error("Error updating user:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='settings-user flex flex-col gap-4'>
            {/* <div className="tilte text-center">
                <span className='text-4xl font-bold '>My Profile Setting</span>
            </div> */}
            <div className="topSection flex gap-5 h-30 flex-col lg:flex-row">
                <div className="leftCard p-4 bg-gray-700 rounded-lg shadow-lg flex flex-col items-center justify-center">
                    <div className="header mb-4">
                        <span className="font-bold text-xl text-white">Change Profile Picture</span>
                    </div>
                    <div className="flex items-center text-center flex-col gap-10 md:flex-row">
                        <div className="bg-white w-20 h-20 flex-none rounded-3xl md:gap-10">
                            <Image
                                className="object-cover w-full h-full rounded-3xl"
                                src={user.avatar_url}
                            />
                        </div>
                        <div className="button flex gap-2">
                            <Button className="bg-blue-500 text-white font-bold">Upload Avatar</Button>
                            <Button color="danger" variant="bordered" className='font-bold'>
                                Delete Avatar
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="rightCard">
                    <div className="videoDiv">
                        <video src={video} autoPlay loop muted></video>
                    </div>
                </div>

            </div>
            <div className='flex flex-col gap-4 lg:flex-row'>
                <div className="section1 col-span-2 rounded-lg flex flex-col gap-5 h-full basis-2/3">
                    <div className="generalInfo p-4 bg-white rounded-lg shadow-lg flex flex-col ">
                        <div className="header mb-4">
                            <span className="font-bold text-xl">General Information</span>
                        </div>
                        <div className="grid grid-cols-1  md:grid-cols-2 gap-4 mb-6">
                            <Input
                                clearable
                                bordered
                                fullWidth
                                label="Full Name"
                                name="full_name"
                                value={userData.full_name}
                                onChange={handleInputChange}
                            />
                            <Input
                                clearable
                                bordered
                                fullWidth
                                label="Email"
                                name="email"
                                value={userData.email}
                                onChange={handleInputChange}
                            />
                            <Input
                                clearable
                                bordered
                                fullWidth
                                label="Contact Number"
                                name="contact_number"
                                value={userData.contact_number}
                                onChange={handleInputChange}
                            />
                            <DateInput
                                fullWidth
                                label="Date of Birth"
                                {...(user.date_of_birth && {
                                    defaultValue: parseDate(format(new Date(user.date_of_birth), 'yyyy-MM-dd'))
                                })}

                                onChange={handleDateChange}
                            />
                        </div>
                        <div className="button text-center mt-auto">
                            <Button className="bg-blue-500 text-white">Save All</Button>
                        </div>
                    </div>
                    <div className="change-password p-4 bg-white rounded-lg shadow-lg">
                        <div className="header mb-4">
                            <span className="font-bold text-xl">Change Password</span>
                        </div>
                        <div className="flex flex-col gap-4 mb-6">
                            <Input label="Recent password" placeholder="Enter recent password" />
                            <Input label="New password" placeholder="Enter new password" />
                            <Input label="Confirm new password" placeholder="Confirm new password" />
                        </div>
                        <div className="button text-center mt-auto">
                            <Button className="bg-blue-500 text-white">Save Password</Button>
                        </div>
                    </div>
                </div>
                <div className="section2 col-span-1 flex flex-col gap-10 basis-1/3 justify-center">

                    <div className="cardDiv flex justify-center">
                        <Card
                            isFooterBlurred
                            radius="lg"
                            className="border-none"
                        >
                            <Image
                                isBlurred
                                src={studio_img}
                            />
                            <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
                                <p className="text-large text-white/80 text-center">"Let Every Step Set You Free - Dance to Express, Not to Impress"</p>
                            </CardFooter>
                        </Card>
                    </div>


                </div>
            </div>
        </div>
    )
}

export default Setting;