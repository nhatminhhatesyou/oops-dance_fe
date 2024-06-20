import { useEffect, useState, React } from 'react';
import { Card, CardHeader, CardBody, Image, Button } from "@nextui-org/react";
import axios from '../../../../../../../axiosConfig';
import EditForm from './EditForm'; // Import the EditForm component
import { EditIcon } from '../../../../../../Table/EditIcon';

// Imported IMAGES ======================>
import room2 from '../../../../Assets_Admin/small_room.jpg';
import room1 from '../../../../Assets_Admin/large_room.jpg';

const RoomDetails = () => {
    const [price_room1, setPrice1] = useState('0');
    const [price_room2, setPrice2] = useState('0');
    const [roomlist, setRoomList] = useState([]);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [currentRoom, setCurrentRoom] = useState(null);

    const fetchRoomList = async () => {
        try {
            const response = await axios.get(`/rooms/`);
            setRoomList(response.data);
        } catch (error) {
            console.error('Error fetching room list:', error);
        }
    };

    useEffect(() => {
        fetchRoomList();
    }, []);

    const handleEditClick = (room) => {
        setCurrentRoom(room || null);
        setIsEditOpen(true);
    };


    return (
        <div className="flex flex-col justify-center gap-6 sectionContainer"> {/* Center the cards and add spacing */}
            <div className="header flex justify-center font-bold">
                <h2 className='text-4xl'>Room Details</h2>
            </div>

            <div className="roomCards flex justify-center gap-6">
                {roomlist.map(room => (
                    <div key={room.id} className="singleCard max-w-2xl "> {/* Responsive width */}
                        <Card className="py-4 shadow-lg max-w-2xl bg-gray-700 text-white">
                            <CardHeader className="pb-0 pt-2 px-4 flex-col items-center relative">
                                <div className="content flex justify-between item-start">
                                    <div className="flex flex-col  text-center">
                                        <h4 className="font-bold text-large text-white">Room {room.id}</h4>
                                        <p className="text-tiny uppercase font-bold text-gray-300">{room.size}m²</p>
                                        <small className="text-gray-400">{room.price} VND per hour</small>
                                    </div>

                                    <Button
                                        isIconOnly
                                        className="text-default-900/60 data-[hover]:bg-gray-100 bg-gray-300 absolute top-0 right-3"
                                        radius="full"
                                        variant="light"
                                        onPress={() => handleEditClick(room)}
                                    >
                                        <EditIcon />
                                    </Button>
                                </div>



                            </CardHeader>
                            <CardBody className="overflow-visible py-2">
                                <div className="flex justify-center ">
                                    <Image
                                        isZoomed
                                        isBlurred
                                        alt="Card background"
                                        className="object-cover rounded-xl "
                                        src={room.id === 1 ? room1 : room2}
                                        width={800}
                                    />
                                </div>
                            </CardBody>
                        </Card>
                    </div>
                ))}
            </div>

            {currentRoom && (
                <EditForm
                    isOpen={isEditOpen}
                    onOpenChange={setIsEditOpen}
                    roomData={currentRoom}
                    fetchRoomList={fetchRoomList}
                />
            )}
        </div>
    );
}

export default RoomDetails;