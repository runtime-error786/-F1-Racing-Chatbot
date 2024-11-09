const cassandra = require("cassandra-driver");
require("dotenv").config();

const client = new cassandra.Client({
  cloud: {
    secureConnectBundle: process.env.ASTRA_DB_SECURE_CONNECT_BUNDLE,
  },
  credentials: {
    username: process.env.ASTRA_DB_UserName,
    password: process.env.ASTRA_DB_CLIENT_Pass,
  },
  keyspace: "default_keyspace",
});

async function connect() {
  try {
    await client.connect();
    console.log("Connected to AstraDB successfully.");

    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS default_keyspace.text_embeddings (
    chunk_id UUID PRIMARY KEY,
    text TEXT,
    embedding LIST<FLOAT>
);

    `;

    await client.execute(createTableQuery);
    console.log('Table "text_embeddings" created successfully.');
  } catch (error) {
    console.error("Error connecting to AstraDB or creating table:", error);
  }
}

module.exports = { client, connect };
