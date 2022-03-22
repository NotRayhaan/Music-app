import React, { useEffect, useState } from 'react';
import useAuth from './useAuth';
import { FormControl, TextField, Box, Paper} from '@mui/material';
import SpotifyWebApi from 'spotify-web-api-node';
import TrackSearchResult from './TrackSearchResults';
import Player from './Player';

const spotifyApi = new SpotifyWebApi({
    clientId: "5d37e1754b58435f8c6f804a0ddbee9c",
})

export default function Dashboard({code}) {
    const accessToken = useAuth(code);
    const [search, setSearch]= useState("");
    const [searchResults, setSearchResults]= useState([]);
    const [playingTrack, setPlayingTrack]= useState();

    function chooseTrack (track){
        setPlayingTrack(track);
        setSearch('');
    }

    useEffect(() => {
        if(!accessToken){
            return;
        }
        spotifyApi.setAccessToken(accessToken);
    }, [accessToken])

    useEffect(() => {
        if(!searchResults){
            return setSearchResults([]);
        }
        if(!accessToken){
            return;
        }

        let cancel = false;
        spotifyApi.searchTracks(search).then(res => {
            if (cancel){
                return
            }
            setSearchResults( res.body.tracks.items.map(track => {
                const smallestAlbumImage = track.album.images.reduce(
                    (smallest, image) => {
                        if (image.height < smallest.height){
                            return image;
                        }
                        return smallest;
                    }, track.album.images[0])
                return {
                    artist: track.artists[0].name,
                    title: track.name,
                    uri: track.uri,
                    albumUrl: smallestAlbumImage.url
                }
            }));
        })
        return() => cancel = true;
    }, [search, accessToken])

    return(
        <div>
            <Box sx={{
                display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', p:2}} >
                <FormControl>
                    <TextField id="fullWidth" label="Search songs or artists" variant="outlined" 
                    value={search} onChange={e => setSearch(e.target.value)}/>
                </FormControl>
                <div>{searchResults.map(track => (
                        <TrackSearchResult track={track} key={track.uri} chooseTrack={chooseTrack}/>
                    ))}
                </div>
                <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
                    <Player  accessToken={accessToken} trackUri={playingTrack?.uri}/>
                </Paper>
            </Box>
            
        </div>
    )
}