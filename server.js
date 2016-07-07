"use strict";


const finalhandler = require('finalhandler');
const bodyParser   = require('body-parser');
const http         = require('http');
const Router       = require('router');

const router = new Router();

let messages = [];
let nextId = 1;

class Message{
  constructor(message){
    this.id = nextId;
    this.message = message;
    nextId++;
  }
};


router.use(bodyParser.json());

router.get('/', (request, response) => {
  // A good place to start!
  response.setHeader('Content-Type', 'text/plain; charset=utf-8');
  response.end('Hello, World!');
});

router.get('/messages', (request, response) => {
  response.setHeader('Content-Type', 'text/plain; charset=utf-8');
  let allMessages = JSON.stringify(messages);
  response.end(allMessages);
});

router.post('/message', (request, response) =>{
  let newMessage;
  response.setHeader('Content-Type', 'application/json; charset=utf-8');
  if (!request.body){
    response.statusCode = 400;
    response.statusMessage = "Message data not found";
    response.end();
    console.log(response.statusCode)
    console.log(response.statusMessage);
  }else{
    //console.log(JSON.stringify(request.body));

    newMessage = new Message(request.body.message);
    messages.push(newMessage);
    response.end(JSON.stringify(newMessage.id));
}
  console.log(newMessage);
  //why is it showing the message as undefined when i self test?


});

const server = http.createServer((request, response) => {
  router(request, response, finalhandler(request, response));
});

exports.listen = function(port, callback) {
  server.listen(port, callback);
};

exports.close = function(callback) {
  server.close(callback);
};
