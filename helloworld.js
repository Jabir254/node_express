const http = require("http");
const port = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("HEllow World!");
});

server.listen(
  (port,
  () =>
    console.log(
      `server started on port ${port}; ` + "press CTRL-c to terminate...."
    ))
);
