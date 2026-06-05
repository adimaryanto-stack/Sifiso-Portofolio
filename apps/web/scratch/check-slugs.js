const http = require("http");

const urls = [
  "/en/services/ui-ux-design",
  "/en/services/web-development",
  "/en/services/brand-identity",
  "/id/services/ui-ux-design",
];

let done = 0;
urls.forEach((url) => {
  http.get("http://localhost:3000" + url, (res) => {
    let b = "";
    res.on("data", (c) => (b += c));
    res.on("end", () => {
      const hasProcess = b.includes("The Process");
      const hasError = b.includes("Something went wrong");
      console.log(`${url} => ${res.statusCode} | Process: ${hasProcess} | Error: ${hasError} | Size: ${b.length}`);
      done++;
      if (done === urls.length) process.exit(0);
    });
  });
});
