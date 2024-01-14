import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import MyAPI, { CError, Error, Item } from './MyAPI';
import { useRouter } from 'next/navigation';

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    let router = useRouter();

    const handleLogin = () => {
        MyAPI.post('/user/sign-in',{username,password})
        .then((res)=>{
            if(res.error){
                CError(res.error);
                return
            }
            let {message,token,status,error} = res.data;
            console.log(res)
            if(status === true){
                router.push('/dashboard');
                Item.setItem('token',token);
                CError.success(message||res.error);
            }else{
                CError.warn(res.error || res.data.message || error);
            }
        }).catch(err=>{
            CError.error(err.message);
        });
    };

    return (
        <Form className="p-4">
            <Form.Group controlId="formUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </Form.Group>

            <Form.Group controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </Form.Group>

            <Button className='mt-3' variant="primary" onClick={handleLogin}>
                Login
            </Button>
        </Form>
    );
};

const SignupForm = () => {
    const [newUsername, setNewUsername] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    let router = useRouter();
    const handleSignup = () => {
        if (!newUsername || !newPassword || !name || !email) {
            toast.warn('all fileds are required.', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }

        MyAPI.post('/user/sign-up',{name,email,username:newUsername,password:newPassword})
        .then((res)=>{
            console.log(res)
            if(res.error){
                CError.warn(res.error);
                return;
            }
            let {status,message,token}=res.data;
            if(status === false){
                CError.warn(res.error || res.data.message);
            }else{
                Item.setItem('token',token);
                router.push('/dashboard');
                CError.success(res.message || message);
            }
        }).catch(err=>{
            CError.error(err.message);
        });

    };

    return (
        <Form className="p-4">
            <Form.Group controlId="formNewUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter your new username"
                    value={newUsername}
                    onChange={(e) => setNewUsername(e.target.value)}
                />
            </Form.Group>

            <Form.Group controlId="formNewUsername">
                <Form.Label>Name</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </Form.Group>

            <Form.Group controlId="formNewUsername">
                <Form.Label>Email</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </Form.Group>

            <Form.Group controlId="formNewPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="Enter your new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                />
            </Form.Group>

            <Button className='mt-3' variant="primary" onClick={handleSignup}>
                Signup
            </Button>
        </Form>
    );
};

export { LoginForm, SignupForm };
