const http = require('http');
const url = require('url');
const query = require('querystring');
const htmlHandler = require('./htmlResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const urlStruct = {
  '/': htmlHandler.getIndex,
  '/style.css': htmlHandler.getCSS,
  '/success': htmlHandler.success,
  '/badRequest': htmlHandler.badRequest,
  '/unauthorized': htmlHandler.unauthorized,
  '/forbidden': htmlHandler.forbidden,
  '/internal': htmlHandler.internal,
  '/notImplemented': htmlHandler.notImplemented,
  notFound: htmlHandler.notFound,
};

const onRequest = (request, response) => {
  console.log(request.url);

  const parsedUrl = url.parse(request.url);
  const paramaters = query.parse(parsedUrl.query);
  const acceptTypes = request.headers.accept.split(',');

  if (urlStruct[parsedUrl.pathname]) {
    urlStruct[parsedUrl.pathname](request, response, paramaters, acceptTypes);
  } else {
    urlStruct.notFound(request, response, paramaters, acceptTypes);
  }
};


/*
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
}; */

http.createServer(onRequest).listen(port);
console.log(`listening on 127.0.0.1: ${port}`);
