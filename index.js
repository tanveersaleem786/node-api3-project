// code away!
const express = require('express');
const  logger = require('./middleware/logger.js')
const userRouter = require('./users/userRouter.js');

const server = express();

server.use(express.json());
const port = 9090;
server.use('/api/users/',userRouter);
server.use(logger({format : "long"}))

server.use((req, res) => {
	res.status(404).json({
		message: "Route was not found",
	})
})

server.use((err, req, res, next) => {
    console.log(err)
    res.status(500).json({
        error: "Something went wrong"
    })
})

server.listen(port,() => {
    console.log(`Server running at http://localhost:${port}`)
})


