/*
*
* Primary file for APIs
*
* */

// dependencies
import { createServer,  IncomingMessage, ServerResponse } from 'http';
import {StringDecoder} from 'string_decoder';
import {URL} from "url";


// create a server
let server = createServer((req: IncomingMessage, res: ServerResponse) => {

    // parse url
    const  parsedURL = new URL((('http://localhost:3000/'+req.url) || ''));

    // get the path
    const path = parsedURL.pathname;
    const trimmedPath = path?.replace(/^\/+|\/+$/g, '');

    // get query params
    const queryParam = parsedURL.search;

    // get headers
    const headers = req.headers;
    // get method
    const  method = req.method;

    // get payload
    let buffer = '';
    const decoder = new StringDecoder('utf-8');

    req.on('data', (data) =>{
       buffer += decoder.write(data);
    });

    req.on('end', () => {
       buffer += decoder.end();

       const chosenHandler = typeof router[trimmedPath] !== 'undefined' ? router[trimmedPath] : handlers.not_found;

       const data = {
           path: trimmedPath,
           params: queryParam,
           method: method,
           payload: buffer,
           headers: headers
       }

       chosenHandler(data, (statusCode: number, payload: Object) => {
            statusCode = typeof statusCode === "number" ? statusCode : 200;

            payload = typeof payload === 'object' ? payload : {};

            const payloadString: string = JSON.stringify(payload);

            res.setHeader("content-type", "application/json");
            res.writeHead(statusCode);
            res.end(payloadString);
       });

    });
    }
);

// listening to the port.
server.listen(3000, () => {
    console.log("Server is listening to the port " + 3000);
});


const handlers : {[ handler: string]: Function } = {
    "sampleHandler": (data: any, callback: Function) => {
        callback(406, {name: 'Sample Handler'});
    },
    "not_found": (data: any, callback: Function) => {
        callback(404);
    }
};

const router: {[handler: string] : Function} = {
    'sample': handlers['sampleHandler']
}
