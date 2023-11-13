const http = require("http");
const { buffer } = require("stream/consumers");

const requestListener = (request, response) => {
  response.setHeader("Content-Type", "text/html");
  response.statusCode = 200;

  const { method, url } = request;

  if (url === "/") {
    // TODO 2 : Logika Respons Bila URL bernilai '/'
    if (method === "GET") {
      response.end("<h1>My HomePage!</h1>");
    } else {
      response.end(
        `<h1>The page cannot be accessed with ${method} request</h1>`
      );
    }
  } else if (url === "/about") {
    // TODO 3 : logika respons bila url bernilai '/about'
    if (method === "GET") {
      response.end("<h1>This is the about page!</h1>");
    } else if (method === "POST") {
      if (method === "GET") {
        response.end("<h1>Hello!</h1>");
      }
      if (method === "POST") {
        let body = [];

        request.on("data", (chunk) => {
          body.push(chunk);
        });

        request.on("end", () => {
          body = Buffer.concat(body).toString();
          const { name } = JSON.parse(body);
          response.end(`<h1>Hai, ${name} Ini adalah halaman about!</h1>`);
        });
      }
    } else {
      response.end(`The page cannot be accessed using ${method} request`);
    }
  } else {
    // TODO 1: logika respons bila url bukan '/' atau '/about'
    response.end("<h1>Page not found!</h1>");
  }
};

const server = http.createServer(requestListener);

const port = 5000;
const host = "localhost";

server.listen(port, host, () => {
  console.log(`Server running at http://${host}:${port}/`);
});
