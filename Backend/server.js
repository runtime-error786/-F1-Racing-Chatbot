const express = require('express');
const cors = require('cors');

// Start the Express server
function startServer(app) {
  const port = process.env.PORT || 3000;

  app.use(cors()); // Enable CORS for the application

  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
}

module.exports = { startServer };
