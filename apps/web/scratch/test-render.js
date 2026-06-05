const http = require("http");

http.get("http://localhost:3000/en/work/aura-commerce", (res) => {
  console.log("Status:", res.statusCode);
  let body = "";
  res.on("data", (chunk) => {
    body += chunk;
  });
  res.on("end", () => {
    // Check if the markdown parser split the text into headings and lists
    const hasHeader = body.includes("Project Summary");
    const hasList = body.includes("Responsive and mobile-first user interface");
    const hasLiveLink = body.includes('href="https://sifiso-portofolio-web.vercel.app"');
    const hasParagraphSplit = body.includes("<p");
    
    console.log("--- TEST RESULTS ---");
    console.log("Has parsed Headers (e.g. Project Summary)?", hasHeader);
    console.log("Has parsed List items (e.g. Customer-Facing Features list)?", hasList);
    console.log("Has Live Experience link to Vercel?", hasLiveLink);
    console.log("Has paragraph splits (<p>)?", hasParagraphSplit);
  });
}).on("error", (err) => {
  console.error("Error connecting to server:", err);
});
