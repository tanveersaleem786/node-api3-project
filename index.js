// code away!
const express = require('express');
const userRouter = require('./users/userRouter.js');

const server = express();

server.use(express.json());
const port = 9090;
server.use('/api/users/',userRouter);

server.listen(port,() => {
    console.log(`Server running at http://localhost:${port}`)
})


