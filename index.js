const express = require('express');
const redis = require('redis');

const app = express();

//  Connect to redis
const client = redis.createClient({
    host: 'redis-server',    // If not using docker, the url is used
    port: 6379  // default port
});
client.set('visits', 0);

app.get('/', (req, res) => {
    client.get('visits', (err, visits) => {
        res.send(`Number of visits is ${visits}`);
        client.set('visits', parseInt(visits) + 1);
    });
});

app.listen(8080, () => {
    console.log('Listening on port 8080');
});
