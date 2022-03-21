import { Card, CardContent, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

export default function TrackSearchResult ({track}) {
    return(
            <Card variant="outlined" >
                <CardContent sx={{ display: 'flex', flexDirection: 'row'}}>
                    <img src={track.albumUrl} style={{height: '64px', width: '64px'}} />
                    <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', p:1}}>
                        <Typography variant="overline" component="div" >{track.title}</Typography>
                        <Typography variant="caption" component="div" color='DarkGrey'>{track.artist}</Typography>
                    </Box>
                        
                </CardContent>
            </Card>
    );
}