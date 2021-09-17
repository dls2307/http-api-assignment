const fs = require('fs');

const index = fs.readFileSync(`${__dirname}/../client/client.html`);
const css = fs.readFileSync(`${__dirname}/../client/style.css`);

const respond = (request, response, content, status, type) => {
  response.writeHead(status, { 'Content-Type': type });
  response.write(content);
  response.end();
};

const getIndex = (request, response) => {
  respond(request, response, index, 200, 'text/html');
};

const getCSS = (request, response) => {
  respond(request, response, css, 200, 'text/css');
};

const getSuccess = (request, response, type) => {
  const content = {
    title: 'Success',
    message: 'Message: This is a successful response',
  };

  // XML
  if (type[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML}<title>${content.title}</title>`;
    responseXML = `${responseXML}<message>${content.message}</message>`;
    responseXML = `${responseXML}</response>`;

    return respond(request, response, responseXML, 200, 'text/xml');
  }

  // JSON
  const contentString = JSON.stringify(content);
  return respond(request, response, contentString, 200, 'application/json');
};

const notFound = (request, response, type) => {
  const content = {
    title: 'Resource Not Found',
    message: 'Message: The page you were looking for was not found.',
  };

  if (type[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML}<title>${content.title}</title>`;
    responseXML = `${responseXML}<message>${content.message}</message>`;
    responseXML = `${responseXML}</response>`;

    return respond(request, response, responseXML, 404, 'text/xml');
  }

  const contentString = JSON.stringify(content);
  return respond(request, response, contentString, 404, 'application/json');
};

module.exports = {
  getIndex,
  getSuccess,
  getCSS,
  notFound,
};
