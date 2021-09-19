const fs = require('fs');

const index = fs.readFileSync(`${__dirname}/../client/client.html`);
const css = fs.readFileSync(`${__dirname}/../client/style.css`);

const respondJSON = (request, response, content, status, type) => {
  response.writeHead(status, { 'Content-Type': type });
  response.write(content);
  response.end();
};

const respondXML = (request, response, content, status, type) => {
  let responseXML = '<response>';
  responseXML = `${responseXML}<title>${content.title}</title>`;
  responseXML = `${responseXML}<message>${content.message}</message>`;
  if (content.id) {
    responseXML = `${responseXML}<id>${content.id}</id>`;
  }
  responseXML = `${responseXML}</response>`;

  response.writeHead(status, { 'Content-Type': type });
  response.write(responseXML);
  response.end();
};

const getIndex = (request, response) => {
  respondJSON(request, response, index, 200, 'text/html');
};

const getCSS = (request, response) => {
  respondJSON(request, response, css, 200, 'text/css');
};

const getSuccess = (request, response, type) => {
  const content = {
    title: 'Success',
    message: 'Message: This is a successful response',
  };

  // XML
  if (type[0] === 'text/xml') {
    return respondXML(request, response, content, 200, 'text/xml');
  }

  // JSON
  const contentString = JSON.stringify(content);
  return respondJSON(request, response, contentString, 200, 'application/json');
};

const getBadRequest = (request, response, type, params) => {
  let statusCode = 200;
  const content = {
    title: 'Bad Request',
    message: 'Message: This request has the required parameters',
  };

  if (!params.valid || params.valid !== 'true') {
    content.message = 'Message: Missing valid query parameter set to true';
    content.id = 'badRequest';
    statusCode = 400;
  }

  // XML
  if (type[0] === 'text/xml') {
    return respondXML(request, response, content, statusCode, 'text/xml');
  }

  // JSON
  const contentString = JSON.stringify(content);
  return respondJSON(request, response, contentString, statusCode, 'application/json');
};

const getUnauthorized = (request, response, type, params) => {
  let statusCode = 200;
  const content = {
    title: 'Unauthorized',
    message: 'Message: This request has the required parameters',
  };

  if (!params.loggedIn || params.loggedIn !== 'true') {
    content.message = 'Message: Missing loggedIn query parameter set to true';
    content.id = 'unauthorized';
    statusCode = 401;
  }

  // XML
  if (type[0] === 'text/xml') {
    return respondXML(request, response, content, statusCode, 'text/xml');
  }

  // JSON
  const contentString = JSON.stringify(content);
  return respondJSON(request, response, contentString, statusCode, 'application/json');
};

const getForbidden = (request, response, type) => {
  const content = {
    title: 'Forbidden',
    message: 'Message: You do not have access to this content',
    id: 'forbidden',
  };

  // XML
  if (type[0] === 'text/xml') {
    return respondXML(request, response, content, 403, 'text/xml');
  }

  // JSON
  const contentString = JSON.stringify(content);
  return respondJSON(request, response, contentString, 403, 'application/json');
};

const getInternal = (request, response, type) => {
  const content = {
    title: 'Internal Server Error',
    message: 'Message: Internal server error. Something went wrong.',
    id: 'internal',
  };

  // XML
  if (type[0] === 'text/xml') {
    return respondXML(request, response, content, 500, 'text/xml');
  }

  // JSON
  const contentString = JSON.stringify(content);
  return respondJSON(request, response, contentString, 500, 'application/json');
};

const getNotImplemented = (request, response, type) => {
  const content = {
    title: 'Not Implemented',
    message: 'Message: A get request for this page has not been implemented yet. Check again later for updated content',
    id: 'Not implemented',
  };

  // XML
  if (type[0] === 'text/xml') {
    return respondXML(request, response, content, 501, 'text/xml');
  }

  // JSON
  const contentString = JSON.stringify(content);
  return respondJSON(request, response, contentString, 501, 'application/json');
};

const notFound = (request, response, type) => {
  const content = {
    title: 'Resource Not Found',
    message: 'Message: The page you were looking for was not found.',
    id: 'notFound',
  };

  // XML
  if (type[0] === 'text/xml') {
    return respondXML(request, response, content, 404, 'text/xml');
  }

  // JSON
  const contentString = JSON.stringify(content);
  return respondJSON(request, response, contentString, 404, 'application/json');
};

module.exports = {
  getIndex,
  getSuccess,
  getNotImplemented,
  getUnauthorized,
  getBadRequest,
  getForbidden,
  getInternal,
  getCSS,
  notFound,
};
