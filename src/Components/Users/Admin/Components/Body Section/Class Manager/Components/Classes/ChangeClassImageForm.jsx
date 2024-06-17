import React, { useState } from 'react';
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
import axios from '../../../../../../../../axiosConfig';
import { Spinner } from "@nextui-org/spinner"; // Import the Spinner component

const ChangeClassImageForm = ({ isOpen, onOpenChange, fetchClasses, classId }) => {
    const [classImage, setClassImage] = useState(null);
    const [fileName, setFileName] = useState(''); // State for the file name
    const [loading, setLoading] = useState(false); // State for loading

    const handleSubmit = async () => {
        setLoading(true); // Set loading to true when the form submission starts
        const formData = new FormData();
        if (classImage) {
            formData.append('image', classImage);
        }

        try {
            const response = await axios.patch(`/class/${classId}/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response) {
                fetchClasses();
                onOpenChange(false);
            } else {
                console.error("Error changing class image");
            }
        } catch (error) {
            console.error("Error changing class image:", error);
        } finally {
            setLoading(false); // Set loading to false when the form submission is complete
        }
    };

    const handleImageChange = (e) => {
        setClassImage(e.target.files[0]);
        setFileName(e.target.files[0].name);
    };

    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader>
                            <div id="modal-title" style={{ fontSize: '18px', fontWeight: 'bold' }}>
                                Change Class Image
                            </div>
                        </ModalHeader>
                        <ModalBody>
                            <Spacer y={1} />
                            <div style={{ marginBottom: '16px' }}>
                                <Button
                                    color="primary"
                                    onPress={() => document.getElementById('classImage').click()}
                                >
                                    Upload Image
                                </Button>
                                <input
                                    type="file"
                                    id="classImage"
                                    style={{ display: 'none' }}
                                    accept="image/*"
                                    onChange={handleImageChange}
                                />
                                {fileName && <div style={{ marginTop: '10px' }}>{fileName}</div>}
                            </div>
                            <Spacer y={1} />
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" variant="light" onPress={() => onOpenChange(false)} disabled={loading}>
                                Close
                            </Button>
                            <Button color="primary" onPress={handleSubmit} disabled={loading}>
                                {loading ? <Spinner color="white" size="sm" /> : 'Change Image'}
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
};

export default ChangeClassImageForm;