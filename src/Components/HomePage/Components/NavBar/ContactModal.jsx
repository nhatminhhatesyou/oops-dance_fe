import React, { useState, useEffect } from 'react';
import { FaPhoneVolume } from "react-icons/fa6";
import { MdOutlineMail } from "react-icons/md";
import { FaFacebookSquare } from "react-icons/fa";

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

const ContactModal = ({ isOpen, onOpenChange }) => {
    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
                <>
                    <ModalHeader className='flex justify-center'>
                        <div id="modal-title" style={{ fontSize: '18px', fontWeight: 'bold' }}>
                            Contact Us
                        </div>
                    </ModalHeader>
                    <ModalBody className='text-center'>
                        <div className='flex gap-3'>
                            <FaPhoneVolume className='icon' />
                            <p>Hotline: 079 618 0646</p>
                        </div>
                        <div className='flex gap-3'>
                            <MdOutlineMail className='icon' />
                            <p>Email us: oopsdancestudio@gmail.com</p>
                        </div>
                        <div className='flex gap-3'>
                            <FaFacebookSquare className='icon' />
                            <p> Our fanpage: <a href="https://www.facebook.com/oopsdancestudio" className='font-semibold'>Oops! Dance Studio</a></p>
                        </div>
                    </ModalBody>
                </>
            </ModalContent>
        </Modal>
    )
}

export default ContactModal