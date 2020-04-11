const express = require('express');
const postRoutes = require('./posts/postRoutes'); // import 
const port = 3000;   // defines a port number 
const server = express();   // calls express module 
server.use(express.json());   // auto format in json
server.use('/api/posts', postRoutes);   // call 

server.use('/', (req, res) => res.send('Server is up and running!'));
server.listen(port, () => {
    console.log(`server is listening at port ${port}`);
})

