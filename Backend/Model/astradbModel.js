const cassandra = require('cassandra-driver');

const client = new cassandra.Client({
  cloud: {
    secureConnectBundle: "C:\\Users\\musta\\OneDrive\\Desktop\\secure-connect-f1-racing-data.zip", // double backslashes
  },
  credentials: {
    username: 'ZJKxIOafLNAvdMLescKjPZya',
    password: 'dofFXd7FsP.rh3Sb+SipmKCzEX2neNOa3XZC+hlwpf7Ft3OAD+NwCxjZaXN_1LQiAJcK32jKtA3jl2mOHIUPqZIS+hv0.3kgMUyUZuzd,2RksJo3lGDR6gxCReAHLSbn',
  },
});

async function connect() {
  try {
    await client.connect();
    console.log('Connected to AstraDB successfully.');
  } catch (error) {
    console.error('Error connecting to AstraDB:', error);
  }
}

module.exports = { client, connect };
