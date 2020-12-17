function getActivities(res) {
    const link = `https://www.strava.com/api/v3/athlete/activities?access_token=${res.access_token}`;
    fetch(link)
        .then(res => res.json())
        .then(data => console.log(data[0]))
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