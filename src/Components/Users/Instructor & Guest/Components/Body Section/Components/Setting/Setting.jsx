import { React, useState, useEffect } from 'react'
import { Card, CardFooter, Image, Button, Input, DateInput, Spinner, Avatar } from "@nextui-org/react";
import { useAuth } from '../../../../../../../AuthContext';
import axios from '../../../../../../../axiosConfig';
import { parseDate } from "@internationalized/date";
import { format } from 'date-fns';
import heic2any from "heic2any";
import './setting.css'

//imported images ================>
import studio_img from "../../../../../../Assets/studio-Image2.jpg"
import video from '../../../../Assets_Instructor/video_short.mp4'


const Setting = () => {
    const { user } = useAuth();
    const [avatar, setAvatar] = useState(null);
    const [fileName, setFileName] = useState('');
    const [loading, setLoading] = useState(false);

    const [userData, setUserData] = useState({
        full_name: '',
        email: '',
        contact_number: '',
        date_of_birth: '',
    });


    useEffect(() => {
        console.log("user:", user);
        if (user.id) {
            axios.get(`/users/${user.id}/`)
                .then(response => {
                    setUserData(response.data);
                    const datecl = parseDate(format(new Date(response.data.date_of_birth), 'yyyy-MM-dd'))
                })
                .catch(error => {
                    console.error('Error fetching user data:', error);
                });
        }
    }, [user.id]);

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
        try {
            const response = await axios.patch(`/users/${user.id}/`, userData);

            if (response.status === 200) {
                alert("User updated successfully")
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

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        setFileName(file.name);

        if (file && file.type === "image/heic") {
            try {
                const convertedBlob = await heic2any({ blob: file, toType: "image/jpeg" });
                const convertedFile = new File([convertedBlob], file.name.replace(/\.heic$/i, ".jpeg"), { type: "image/jpeg" });
                setAvatar(convertedFile);
            } catch (error) {
                console.error("Error converting HEIC to JPEG:", error);
            }
        } else {
            setAvatar(file);
        }
    };

    const handleChangeAvatar = async () => {

        setLoading(true);
        const formData = new FormData();
        formData.append('avatar', avatar);

        try {
            await axios.patch(`/users/${user.id}/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
        } catch (error) {
            console.error("Error: ", error);
            alert("ERROR");
            setAvatar(null);
            setFileName('');
        } finally {
            setLoading(false);
            setAvatar(null);
            setFileName('');
            alert("Change Success!");
        }
    };

    //PASSWORD CHANGE ===============>
    const [passwordData, setPasswordData] = useState({
        old_password: '',
        new_password: '',
        confirm_password: ''
    });

    const handleChangePassword = (e) => {
        const { name, value } = e.target;
        setPasswordData({ ...passwordData, [name]: value });
    };

    const handleSubmitPassword = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.patch('/change-password/', passwordData, {
                headers: {
                    'Authorization': `Token ${user.token}`
                }
            });

            if (response.status === 200) {
                alert('Password changed successfully');
                setPasswordData({
                    old_password: '',
                    new_password: '',
                    confirm_password: ''
                });
            } else {
                alert('Error changing password');
            }
        } catch (error) {
            alert('Error changing password');
            console.error("Error changing password:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='settings-user flex flex-col gap-4'>
            <div className="topSection flex gap-5 h-30 flex-col lg:flex-row">
                <div className="leftCard p-4 bg-gray-700 rounded-lg shadow-lg flex flex-col items-center justify-center">
                    <div className="header mb-4">
                        <span className="font-bold text-xl text-white">Change Profile Picture</span>
                    </div>
                    <div className="flex items-center text-center flex-col gap-10 md:flex-row">
                        <div className="bg-white w-20 h-20 flex-none rounded-3xl md:gap-10">
                            {/* <Image
                                className="object-hidden w-20 h-20 rounded-3xl"
                                src={user.avatar_url}
                            /> */}
                            <Avatar
                                isBordered
                                radius="sm"
                                className="object-hidden w-20 h-20"
                                src={user.avatar_url}
                            />
                        </div>
                        <div className="button flex gap-2">
                            <div style={{ marginBottom: '16px' }}>
                                <Button
                                    color="primary"
                                    onPress={() => document.getElementById('avatar').click()}
                                >
                                    Upload Avatar
                                </Button>
                                <input
                                    type="file"
                                    id="avatar"
                                    style={{ display: 'none' }}
                                    accept="image/*"
                                    onChange={handleImageChange}
                                />
                                {fileName && <div style={{ marginTop: '10px', color: "white" }}>{fileName}</div>}
                            </div>

                            {avatar ? (
                                <Button color="primary" variant='bordered' onPress={handleChangeAvatar} disabled={loading}>
                                    {loading ? <Spinner color="white" size="sm" /> : 'Change Avatar'}
                                </Button>
                            ) : null}
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
                            <Button color="primary" onPress={handleSubmit} disabled={loading}>
                                {loading ? <Spinner color="white" size="sm" /> : 'Save Changes'}
                            </Button>
                        </div>
                    </div>
                    <div className="change-password p-4 bg-white rounded-lg shadow-lg">
                        <div className="header mb-4">
                            <span className="font-bold text-xl">Change Password</span>
                        </div>
                        <form onSubmit={handleSubmitPassword} className="flex flex-col gap-4 mb-6">
                            <Input
                                label="Recent password"
                                placeholder="Enter recent password"
                                type="password"
                                name="old_password"
                                value={passwordData.old_password}
                                onChange={handleChangePassword}
                                required
                            />
                            <Input
                                label="New password"
                                placeholder="Enter new password"
                                type="password"
                                name="new_password"
                                value={passwordData.new_password}
                                onChange={handleChangePassword}
                                required
                            />
                            <Input
                                label="Confirm new password"
                                placeholder="Confirm new password"
                                type="password"
                                name="confirm_password"
                                value={passwordData.confirm_password}
                                onChange={handleChangePassword}
                                required
                            />
                            <div className="button text-center mt-auto">
                                <Button type="submit" color="primary" disabled={loading}>
                                    {loading ? <Spinner color="white" size="sm" /> : 'Save Password'}
                                </Button>
                            </div>
                        </form>
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