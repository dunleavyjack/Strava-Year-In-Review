const express = require('express');
const app = express();
const fetch = require('node-fetch')

require('dotenv').config();

const clientID = process.env.CLIENT_ID
const clientSecret = process.env.CLIENT_SECRET
const refreshToken = process.env.REFRESH_TOKEN
const authLink = "https://www.strava.com/oauth/token"


function getActivities(res) {
    const link = `https://www.strava.com/api/v3/athlete/activities?access_token=${res.access_token}`;
    fetch(link)
        .then(res => res.json())
            .then(data => console.log(data[0].name))
}

function reAuthorize() {
    fetch(authLink, {
        method: 'post',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            client_id: clientID,
            client_secret: clientSecret,
            refresh_token: refreshToken,
            grant_type: 'refresh_token'
        })
    }).then((res) => (res.json())
        .then(res => getActivities(res)))
}

reAuthorize()



app.get('/', (req, res) => {
    res.send("Hello!")
})

app.listen(3000, () => {
    console.log("Serving on Port 3000")
})