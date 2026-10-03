// Import built-in modules
const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 3000;

// Create the server
const server = http.createServer((req, res) => {
  // Log every request with a timestamp
  const time = new Date().toLocaleString();
  console.log(`[${time}] ${req.method} ${req.url}`);

  // Choose which file to send
  let fileName;
  if (req.url === "/" || req.url === "/index.html") {
    fileName = "index.html";
  } else if (req.url === "/about") {
    fileName = "about.html";
  } else {
    fileName = "404.html";
  }

  const filePath = path.join(__dirname, "public", fileName);
  const statusCode = fileName === "404.html" ? 404 : 200;

  // Read the HTML file and send it as the response
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("500 - Server Error");
      return;
    }
    res.writeHead(statusCode, { "Content-Type": "text/html" });
    res.end(data);
  });
});

// Start the server
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
