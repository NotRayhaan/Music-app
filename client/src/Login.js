import React from 'react';
import Button from '@mui/material/Button'; 
import Grid from '@mui/material/Grid';

const AUTH_URL = "https://accounts.spotify.com/authorize?client_id=5d37e1754b58435f8c6f804a0ddbee9c&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state"
export default function Login() {
    return(
        <Grid container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: '100vh' }}>
            <Button variant="outlined" color="success" href={AUTH_URL}>Login</Button>
        </Grid>
    )
}