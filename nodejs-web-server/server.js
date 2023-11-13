const http = require("http");
const { chunk } = require("lodash");
const { join } = require("path");

const requestListener = (request, response) => {
  response.setHeader("Content-type", "application/json");
  response.setHeader("X-Powered-By", "NodeJS");

  const { method, url } = request;

  if (url === "/") {
    // TODO 2: logika respons bila url bernilai '/'
    if (method === "GET") {
      response.statusCode = 200;
      response.end(
        JSON.stringify({
          message: "This Is HomePage!",
        })
      );
    } else {
      response.end;
      response.statusCode = 400;
      response.end(
        JSON.stringify({
          message: `Page cannot be accessed using ${method} request`,
        })
      );
    }
  } else if (url === "/about") {
    // TODO 3: logika respons bila url bernilai '/about'
    if (method === "GET") {
      // respons bila client menggunakan GET
      response.statusCode = 200;
      response.end(
        JSON.stringify({
          message: "This Is About Page!",
        })
      );
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
        response.end(
          JSON.stringify({
            message: `Hello ${name}! This Is About Page!`,
          })
        );
      });
    } else {
      // respons bila client tidak menggunakan GET ataupun POST
      response.statusCode = 400;
      response.end(
        JSON.stringify({
          message: `Page cannot be accessed using ${method} request!`,
        })
      );
    }
  } else {
    // TODO 1: logika respons bila url bukan '/' atau '/about'
    response.statusCode = 404;
    response.end(
      JSON.stringify({
        message: "The page not found!",
      })
    );
  }
};

const server = http.createServer(requestListener);

const port = 5000;
const host = "localhost";

server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});
