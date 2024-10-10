import { useState, useRef } from 'react';
import { Box, TextField, Button } from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { v4 as uuidv4 } from 'uuid';
import showNotification from '../parts/notification/showNotification';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Register() {
    const [equal, setEqual] = useState(false);
    const [errorMessage, setErrorMessage] = useState(''); // Zustand für Fehlermeldungen
    const formRef = useRef();
    const navigator = useNavigate();
    const handleNavigate = () => {
        navigator("/login");
    }


    const checkPassword = () => { 
        const form = formRef.current;
        form.password.value === form.confirmPassword.value ? setEqual(true) : setEqual(false);
    }

   

    const registerUser = async (e) => {
        e.preventDefault();
        const form = formRef.current;
        const formData =  {
            id: uuidv4(),
            fullname: form.fullname.value,
            email: form.email.value,
            password: form.password.value,
            role: 'visitor'
        }

        const config={
            url:"http://localhost:3003/api/register",
            method: "POST",
            headers:{
                "Content-Type":"application/json"
            },
            data: JSON.stringify(formData)

        }
        const resp = await axios(config);
        console.log(resp.data.message);
    }
/*
        try {
            // API-Request zum Speichern des Benutzers
            const response = await fetch('http://localhost:3001/api/user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            
            if (response.ok) {
                const savedUser = await response.json();
                console.log('Saved user:', savedUser);
                setErrorMessage(''); // Keine Fehlermeldung
                handleNavigate();
            } else if (response.status === 400) {
                // Benutzer bereits registriert
                const errorData = await response.json();
                setErrorMessage(errorData.error); // Fehlermeldung setzen
                showNotification(`${errorData.error}`,"normal");
            } else {
                console.error('Failed to register user');
                setErrorMessage('Failed to register user.');
            }
        } catch (error) {
            console.error('Error while registering user:', error);
            setErrorMessage('Error while registering user.');
        }
    }*/

    return (
        <>
            <Box sx={{
                height: '100vh',
                width: '100vw',
                display: 'grid',
                gridTemplateColumns: '45% 55%'
            }}>
                <Box 
                    component='img'
                    sx={{
                        marginLeft: '1%',
                        justifySelf: 'center',
                        alignSelf: 'center',
                        height: '70%',
                        width: '90%',
                        borderRadius: '15%',
                    }}
                    src='/students.png'
                    alt='two students working together'
                />
                
                <Box
                    component='form'     
                    ref={formRef}  
                    onSubmit={(e) => { registerUser(e) }}
                    sx={{
                        height: '100%',
                        width: '100%',
                        display: 'grid',
                        gridTemplateRows: '60% 25% 15%',
                    }}>
                    
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: '80%',
                        height: '100%',
                        alignItems: 'center',
                        justifyContent: 'center',
                        rowGap: '5%'
                    }}>
                        <TextField required label="fullname" name="fullname" variant="standard" />
                        <TextField required label="email" name="email" variant="standard" />
                        <TextField required label="username" name="username" variant="standard" />
                        <TextField required label="password" name="password" variant="standard"/>
                        <TextField required onChange={checkPassword}
                            label={equal ? "💚 Equal" : "❗Password not equal"}
                            name='confirmPassword' variant="standard" />
                    </Box>

                    {/* Anzeige der Fehlermeldung */}
                    {errorMessage && (
                        <Box sx={{ color: 'red', textAlign: 'center' }}>
                            {errorMessage}
                        </Box>
                    )}
                    
 

                    <Box sx={{
                        height: '100%',
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        cursor: 'pointer'
                    }}>
                        <Button
                            type='submit'
                            sx={{
                                height: '50%',
                                width: '30%',
                                backgroundColor: 'success.main',
                            }}
                            variant='contained'
                        >Register</Button>
                    </Box>
                </Box>
            </Box>    
        </>
    );
}
