const http = require("http");

function fetchPage() {
  console.log("Fetching http://localhost:3000/id ...");
  http.get("http://localhost:3000/id", (res) => {
    console.log(`STATUS: ${res.statusCode}`);
    console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
    let body = "";
    res.on("data", (chunk) => {
      body += chunk;
    });
    res.on("end", () => {
      console.log(`BODY LENGTH: ${body.length}`);
      console.log("First 500 chars of body:");
      console.log(body.substring(0, 500));
    });
  }).on("error", (e) => {
    console.error(`Got error: ${e.message}`);
  });
}

// Wait 5 seconds for next dev to boot up
setTimeout(fetchPage, 5000);
