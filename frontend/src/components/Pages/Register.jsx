import { Box } from '@mui/system';
import { useState,useRef } from 'react';
import { TextField } from '@mui/material';
import { Button } from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import axios from "axios";
import {v4 as uuidv4} from "uuid";


export default function Register() {
    const [equal,setEqual] = useState(false);
    const formRef = useRef();
    const checkPassword = () => { 
        console.log(formRef.current);  
        const form = formRef.current;
        form.password.value === form.confirmPassword.value ? setEqual(true) : setEqual(false);
    }
    const registerUser = async(e) =>{
        e.preventDefault();
        const form = formRef.current;
        const formData =  {
            id:uuidv4(),
            fullname: form.fullname.value,
            email: form.email.value,
            password: form.password.value,
            role: 'visitor'
        }
        try {
            // API-Request zum Speichern des Posts in der MongoDB
            const response = await fetch('http://localhost:3001/api/user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const savedUser = await response.json();
                console.log('Saved user:', savedUser); // Überprüfe, ob die _id zurückkommt // Fügt den neuen Post hinzu
            } else {
                console.error('Failed to save the post');
            }
        } catch (error) {
            console.error('Error while saving the post:', error);
        }
        
    }


    return (
        <>
            <Box sx={{
                height: '100vh',
                width: '100vw',
                display: 'grid',
                gridTemplateColumns: '45% 55%'
            }}>
                {/* //Here comes the box component for the picture */}
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
                >
                </Box>
                {/* //Here comes the box component for the form */}
                <Box
                component='form'     
                ref={formRef}  
                on onSubmit={(e) => {registerUser(e)}}
                sx={{
                    height: '100%',
                    width: '100%',
                    display: 'grid',
                    gridTemplateRows: '60% 25% 15%',
                }}>
                    <Box            
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: '80%',
                        height: '100%',
                        alignItems: 'center',
                        justifyContent: 'center',
                        rowGap: '5%'
                    }}>
                        <TextField  required id="outlined-basic" label="fullname"
                        InputLabelProps={{
                            style: { color: 'black' },
                        }}
                        name= "fullname" variant="standard" />
                        <TextField required id="outlined-basic" 
                        InputLabelProps={{
                            style: { color: 'black' },
                        }}
                        label="email" name="email" variant="standard" />
                        <TextField required id="outlined-basic" 
                        InputLabelProps={{
                            style: { color: 'black' },
                        }}                        
                        label="username" name="username" variant="standard" />
                        <TextField required id="outlined-basic" 
                        InputLabelProps={{
                            style: { color: 'black' },
                        }}                        
                        label="password"
                        name="password" variant="standard"/>
                        <TextField required
                        onChange={checkPassword}
                        id="outlined-basic"
                        InputLabelProps={{
                            style: { color: 'black' },
                        }}     
                        name='confirmPassword'                   
                        label={equal ? "💚 Equal" : "❗Password not equal"} variant="standard"/>
                    </Box>
                    <Box
                    sx={{
                        height: '100%',
                        width: '50%',
                        backgroundColor: 'success.main',
                        justifySelf: 'center',
                        alignSelf: 'center',
                        borderRadius: '10%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontSize: '1.5rem',
                        fontWeight: 'bold',
                        cursor: 'pointer'

                    }}>
                        <p>Upload Matriculation file <UploadFileIcon/></p>
                        <Button
                            variant="contained"
                            component="label"

                            >
                            Upload File
                            <input
                                type="file"
                                accept="application/pdf"
                                hidden
                                name="matriculationFile"
                                // onChange={(e) => {setImage(e.target.files[0])}}
                            />
                            </Button>

                    </Box>
                    <Box
                    sx={{
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