const http = require("http");

http.get("http://localhost:3000/en/admin/projects/52f2b290-08ad-43c4-be06-bd68e7a214dc/edit", (res) => {
  console.log("Status:", res.statusCode);
  let body = "";
  res.on("data", (chunk) => {
    body += chunk;
  });
  res.on("end", () => {
    const hasStatusInput = body.includes('name="projectStatus"');
    const hasUrlInput = body.includes('name="liveUrl"');
    
    console.log("--- ADMIN FORM TEST ---");
    console.log("Has projectStatus input?", hasStatusInput);
    console.log("Has liveUrl input?", hasUrlInput);
  });
}).on("error", (err) => {
  console.error("Error connecting to server:", err);
});
