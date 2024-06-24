import React from 'react'
import { Card, CardFooter, Image, Button, Input } from "@nextui-org/react";
import { useAuth } from '../../../../../../../AuthContext';
import './setting.css'
//imported images ================>
import studio_img from "../../../../../../Assets/studio-Image2.jpg"
import video from '../../../../Assets_Instructor/video_short.mp4'


const Setting = () => {
    const { user } = useAuth();

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
                            <Input label="Full name" placeholder="Enter your full name" />
                            <Input label="Email" placeholder="Enter your email" />
                            <Input label="Contact number" placeholder="Enter your contact number" />
                            <Input label="Date of birth" placeholder="Enter your date of birth" />
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