const http = require("http");

http.get("http://localhost:3000/en/work", (res) => {
  console.log("Status:", res.statusCode);
  let body = "";
  res.on("data", (chunk) => {
    body += chunk;
  });
  res.on("end", () => {
    console.log("Gallery has Live Project badge:", body.includes("Live Project"));
    console.log("Gallery has Offline Project badge:", body.includes("Offline Project"));
  });
}).on("error", (err) => {
  console.error("Error connecting to server:", err);
});
