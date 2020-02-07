const http = require('http');
const htmlHandler = require('./htmlResponses.js');
const jsonHandler = require('./jsonResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const urlStruct = {
  '/': htmlHandler.getIndex,
  '/success': jsonHandler.success,
  '/badRequest': jsonHandler.badRequest,
  notFound: jsonHandler.notFound,
};

const onRequest = (request, response) => {
  //const parsedUrl = url.parse(request.url);
  switch (request.url) {
    case '/':
      htmlHandler.getIndex(request, response);
      break;
      case '/success':
      htmlHandler.getIndex(request, response);
      jsonHandler.success(request, response);
      break;
      case '/badRequest':
      htmlHandler.getIndex(request, response);
      break;
      case '/unauthorized':
      htmlHandler.getIndex(request, response);
     jsonHandler.unathourized (request, response);
      break;
      case '/forbidden':
      htmlHandler.getIndex(request, response);
      break;
      case '/internal':
      htmlHandler.getIndex(request, response);
      break;
    default:
      htmlHandler.getIndex(request, response);
      break;
  }
};

http.createServer(onRequest).listen(port);
console.log(`listening on 127.0.0.1: ${port}`);
