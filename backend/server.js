import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import xss from "xss";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

app.use(express.json());


// Simple XSS check function
function isSafeInput(input) {
  // Block any < or > characters (basic check)
  const xssPattern = /<|>/g;
  return !xssPattern.test(input);
}


// Handle form submission
app.post("/api/submit", (req, res) => {
  const { input } = req.body;

  console.log("Received:", input);
  

  // Sanitize the input
  const sanitizedInput = xss(input);

  if (sanitizedInput !== input) {
    console.log("Blocked XSS attempt:", input);
    return res.status(400).json({
      success: false,
      message: "Invalid input. Please remove special tags or code."
    });
  }

 
  // Redirect user to second.html
  //res.redirect("/second.html");
  res.redirect(`/second.html?term=${encodeURIComponent(sanitizedInput)}`);
});

// a simple / route to test the server 
app.get("/", (req, res) => {
  res.send("Hello World! This is the backend server.");
});

app.listen(port, () => {
  console.log(`Backend running on http://localhost:${port}`);
});
