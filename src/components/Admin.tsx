import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";
import { Container, fabClasses, Grid, Box, Avatar } from "@mui/material";
import '../styles/admin.css';


const loginEmail = "osut@osugi.ro";
const loginPassword = "osugbine";

const Admin = () => {

    const [loggedIn, setLoggedIn] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        if (email === loginEmail && password === loginPassword) {
            setLoggedIn(true);
        }
    }


    if (!loggedIn) {
        return (
            <Container maxWidth='sm'>
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        backgroundColor: 'white',
                        padding: 5,
                    }}
                >
                    <Avatar alt="OSUT" src={require('../img/cometa.png')} sx={{ width: 48, height: 48 }} />
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <TextField fullWidth id="standard-basic" label="Email" type={"email"} variant="standard" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField fullWidth id="standard-basic" label="Password" type={"password"} variant="standard" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </Grid>
                        <Grid item xs={12}>
                            <Button fullWidth className="login-button" variant="contained" onClick={handleLogin}>Login</Button>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        )
    }

    return (
        <div>
            <p>Admin</p>
        </div>
    )
}

export default Admin;