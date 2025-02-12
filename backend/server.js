const express = require("express");
const app = express();

// Use Render's assigned PORT or default to 4000
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Server is running!");
});

app.listen(PORT, () => {
  console.log(Server is running on port ${PORT});
});
