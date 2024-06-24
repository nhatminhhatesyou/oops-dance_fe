import React, { useState, useEffect } from 'react';
import {
    Modal,
    Input,
    Button,
    Spacer,
    ModalHeader,
    ModalBody,
    ModalFooter,
    ModalContent,
} from "@nextui-org/react";
import axios from '../../../../../../../axiosConfig';
import { Spinner } from "@nextui-org/spinner"; // Import the Spinner component

const EditForm = ({ isOpen, onOpenChange, roomData, fetchRoomList }) => {
    const [roomName, setRoomName] = useState('');
    const [roomSize, setRoomSize] = useState('');
    const [price, setPrice] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (roomData) {
            setRoomName(roomData.name);
            setRoomSize(roomData.size);
            setPrice(roomData.price);
        }

        console.log("ROOM DATA", roomData);
    }, [roomData]);

    const handleSubmit = async () => {
        setLoading(true); // Set loading to true when the form submission starts

        const formData = {
            name: roomName,
            size: roomSize,
            price: price,
        };

        try {
            await axios.patch(`/rooms/${roomData.id}/update/`, formData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            alert("Room updated successfully!");
            fetchRoomList();
            onOpenChange(false);
        } catch (error) {
            console.error("Error: ", error);
            alert("ERROR");
        } finally {
            setLoading(false); // Set loading to false when the form submission is complete
        }
    };

    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
                <>
                    <ModalHeader>
                        <div id="modal-title" style={{ fontSize: '18px', fontWeight: 'bold' }}>
                            Edit Room
                        </div>
                    </ModalHeader>
                    <ModalBody>
                        <Input
                            clearable
                            bordered
                            fullWidth
                            label="Room Name"
                            value={roomName}
                            onChange={(e) => setRoomName(e.target.value)}
                        />
                        <Input
                            clearable
                            bordered
                            fullWidth
                            label="Room Size"
                            value={roomSize}
                            onChange={(e) => setRoomSize(e.target.value)}
                        />
                        <Input
                            clearable
                            bordered
                            fullWidth
                            label="Price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                        <Spacer y={1} />
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" variant="light" onPress={() => onOpenChange(false)} disabled={loading}>
                            Close
                        </Button>
                        <Button color="primary" onPress={handleSubmit} disabled={loading}>
                            {loading ? <Spinner color="white" size="sm" /> : 'Update Room'}
                        </Button>
                    </ModalFooter>
                </>
            </ModalContent>
        </Modal>
    );
};

export default EditForm;