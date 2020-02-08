
const fs = require('fs');

const index = fs.readFileSync(`${__dirname}/../client/client.html`);
const css = fs.readFileSync(`${__dirname}/../client/Style.css`);

// load html
const getIndex = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(index);
  response.end();
};

// load css
const getCSS = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/css' });
  response.write(css);
  response.end();
};

// respond in xml
const respond = (request, response, status, content, type) => {
  if (type === 'text/xml') {
    response.writeHead(status, { 'Content-Type': 'text/xml' });

    let responseXML = '<response>';

    if (content.id) {
      responseXML = `${responseXML} <id>${content.id}</id>`;
    }

    responseXML = `${responseXML} <message>${content.message}</message>`;
    responseXML = `${responseXML} </response>`;
    response.write(responseXML);
  } else {
    response.writeHead(status, { 'Content-Type': 'application/json' });
    response.write(JSON.stringify(content));
  }

  response.end();
};


// success response
const success = (request, response, params, type) => {
  const responseJSON = {
    message: 'This is a successful response',
  };

  respond(request, response, 200, responseJSON, type);
};

// bad request with wrong params
const badRequest = (request, response, params, type) => {
  const responseJSON = {
    message: 'This request has the required parameters',
  };

  // if no valid = true param
  if (!params.valid || params.valid !== 'true') {
    responseJSON.message = 'Missing valid query parameter set to true';

    responseJSON.id = 'badRequest';

    return respond(request, response, 400, responseJSON, type);
  }

  return respond(request, response, 200, responseJSON);
};


// bad request for unauthorezed
const unauthorized = (request, response, params, type) => {
  const responseJSON = {
    message: 'This request has the required parameters',
  };

  // if no loggedin = yes param
  if (!params.loggedIn || params.loggedIn !== 'yes') {
    responseJSON.message = 'Missing loggedIn query parameter set to yes';

    responseJSON.id = 'unauthorized';

    return respond(request, response, 401, responseJSON, type);
  }


  return respond(request, response, 200, responseJSON, type);
};

// forbidden request
const forbidden = (request, response, params, type) => {
  const responseJSON = {
    message: 'You do not have access to this content.',
    id: 'forbidden',
  };


  respond(request, response, 403, responseJSON, type);
};

// internal not found request
const internal = (request, response, params, type) => {
  const responseJSON = {
    message: 'Internal Server Error. Something went wrong.',
    id: 'internal',
  };

  respond(request, response, 500, responseJSON, type);
};

// not implimented request
const notImplemented = (request, response, params, type) => {
  const responseJSON = {
    message: 'A get request for this page has not been implimented yet. check again later for updated content',
    id: 'notImplemented',
  };


  respond(request, response, 501, responseJSON, type);
};

// not found request
const notFound = (request, response, params, type) => {
  const responseJSON = {
    message: 'The page you are looking for was not found.',
    id: 'notFound',
  };

  respond(request, response, 404, responseJSON, type);
};

module.exports = {
  getIndex,
  getCSS,
  success,
  badRequest,
  unauthorized,
  forbidden,
  internal,
  notImplemented,
  notFound,
};
