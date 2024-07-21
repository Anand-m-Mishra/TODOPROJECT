import jsonServer from "json-server"
import cors from "cors"
import { configDotenv } from "dotenv";

const server = jsonServer.create();
const router = jsonServer.router('db.json');

configDotenv();// Replace with your database file path if different

// Configure CORS options (adjust origins as needed)
const corsOptions = {
  origin: 'http://localhost:3000', // Replace with your frontend domain
  optionsSuccessStatus: 200
};

server.use(cors(corsOptions));
server.use(router);

server.listen(3000, () => {
  console.log('JSON Server is running on port 3000');
});


