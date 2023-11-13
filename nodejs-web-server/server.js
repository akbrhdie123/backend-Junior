const http = require("http");
const { chunk } = require("lodash");

const requestListener = (request, response) => {
  response.setHeader("Content-type", "application/json");
  response.setHeader("X-Powered-By", "NodeJS");

  const { method, url } = request;

  if (url === "/") {
    // TODO 2: logika respons bila url bernilai '/'
    if (method === "GET") {
      response.statusCode = 200;
      response.end("<h1>This Is HomePage!</h1>");
    } else {
      response.end;
      response.statusCode = 400;
      response.end(
        `<h1>The page cannot be accessed with ${method} request</h1>`
      );
    }
  } else if (url === "/about") {
    // TODO 3: logika respons bila url bernilai '/about'
    if (method === "GET") {
      // respons bila client menggunakan GET
      response.statusCode = 200;
      response.end("<h1>Hello! This is the about page.</h1>");
    } else if (method === "POST") {
      // respons bila client menggunakan POST
      let body = [];

      request.on("data", (chunk) => {
        body.push(chunk);
      });

      request.on("data", () => {
        body = Buffer.concat(body).toString();
        const { name } = JSON.parse(body);
        response.statusCode = 200;
        response.end(`<h1>Hai, ${name}!</h1>`);
      });
    } else {
      // respons bila client tidak menggunakan GET ataupun POST
      response.statusCode = 400;
      response.end(`<h1>Page cannot be accessed using ${method} request</h1>`);
    }
  } else {
    // TODO 1: logika respons bila url bukan '/' atau '/about'
    response.statusCode = 404;
    response.end("<h1>The Page Not Found!</h1>");
  }
};

const server = http.createServer(requestListener);

const port = 5000;
const host = "localhost";

server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});
