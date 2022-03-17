const express = require('express');
const SpotifyWebApi = require('spotify-web-api-node');
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/refresh', (req, res) => {
    const refreshToken = req.body.refreshToken
    const spotifyApi = new SpotifyWebApi({
        redirectUri: "http://localhost:3000",
        clientId:'5d37e1754b58435f8c6f804a0ddbee9c',
        clientSecret:'0584a573e52a4bde9ab13994fdd902cd',
        refreshToken
    })

    spotifyApi.refreshAccessToken().then((data) => {
        accessToken: data.body.access_token
        expiresIn: data.body.expiresIn
    }).catch(() => {
        res.sendStatus(400)
    }) 
})

app.post('/login', (req, res) => {
    const code = req.body.code
    const spotifyApi = new SpotifyWebApi({
        redirectUri: "http://localhost:3000",
        clientId:'5d37e1754b58435f8c6f804a0ddbee9c',
        clientSecret:'0584a573e52a4bde9ab13994fdd902cd'
    })

    spotifyApi.authorizationCodeGrant(code).then(data =>{
        res.json({
            accessToken: data.body.access_token,
            refreshToken: data.body.refresh_token,
            expiresIn: data.body.expires_in
        })
    }).catch(err =>{
        console.log(err)
        res.sendStatus(400)
    })
});

app.listen(3001);