import { Drawer, message } from 'antd';
import React, { useState, useEffect } from 'react';
import { editUser } from '../../apis/users';

const DrawerComponent = ({ onClose, open, data }) => {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: ''
    });

    useEffect(() => {
        if (data) {
            setFormData({
                first_name: data.first_name || '',
                last_name: data.last_name || '',
                email: data.email || ''
            });
        }
    }, [data]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const resp = await editUser({ ...formData, id: data.id });
            if (resp) {
                onClose();
                message.success('User Updated Successfully');
            } else {
                message.error('Some Error Occured');
            }
        } catch (error) {
            message.error('Some Error Occured');
        }
    };

    return (
        <Drawer title="Edit User" onClose={onClose} open={open}>
            <form className='flex flex-col items-center justify-center mt-8' onSubmit={submitHandler}>
                <input
                    type='text'
                    name='first_name'
                    placeholder='First Name'
                    className='border-b-2 border-black w-80 p-2 my-4'
                    value={formData.first_name}
                    onChange={handleChange}
                />
                <input
                    type='text'
                    name='last_name'
                    placeholder='Last Name'
                    className='border-b-2 border-black w-80 p-2 my-4'
                    value={formData.last_name}
                    onChange={handleChange}
                />
                <input
                    type='text'
                    name='email'
                    placeholder='Email'
                    className='border-b-2 border-black w-80 p-2 my-4'
                    value={formData.email}
                    onChange={handleChange}
                />
                <button className='bg-black text-white rounded-3xl px-4 py-2 mt-4' type='submit'>Submit</button>
            </form>
        </Drawer>
    );
};

export default DrawerComponent;