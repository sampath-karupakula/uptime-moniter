/*
*
* Primary file for APIs
*
* */

// dependencies
import { createServer,  IncomingMessage, ServerResponse } from 'http';

// create a server
let server = createServer((req: IncomingMessage, res: ServerResponse) => {
        res.end("Hello World !");
    }
);

// listening to the port.
server.listen(3000, () => {
    console.log("Server is listening to the port 3000");
});
