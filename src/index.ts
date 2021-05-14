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

    // parse the incoming request.
    console.log(req.url);
    console.log(req.httpVersion);

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


        // set response.
        res.end("Hello World !"+trimmedPath + ' requested method '+ method
            + " with query params "+ JSON.stringify(queryParam) +" including headers" + JSON.stringify(headers)
            + " payload is " + buffer);

        // log the requested url path
        console.log(buffer);

    });
    }
);

// listening to the port.
server.listen(3000, () => {
    console.log("Server is listening to the port 3000");
});
