const express = require('express');
const cors = require('cors');
const { connect } = require('./Model/astradbModel'); 

const app = express();
const port = 3001;

connect();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('AstraDB setup complete!');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
