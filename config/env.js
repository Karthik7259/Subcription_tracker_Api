 import { config } from "dotenv";

config({path:`./config/.env.${process.env.NODE_ENV || 'development'}.local`});

export const PORT = process.env.PORT;
export const NODE_ENV = process.env.NODE_ENV || "development";
//BGtVks60eF16MsUv
export const DB_URI="mongodb+srv://karthik172180:BGtVks60eF16MsUv@cluster0.y3h2j.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
export const JWT_SECREAT='secret';
export const JWT_EXPIRES_IN='365d';
export const ARCJET_KEY="ajkey_01jm472000ecmap3d8yzybzqyq"
export const ARCJET_ENV="development" 
export const QSTASH_URL="http://127.0.0.1:8080"
export const QSTASH_TOKEN="eyJVc2VySUQiOiJkZWZhdWx0VXNlciIsIlBhc3N3b3JkIjoiZGVmYXVsdFBhc3N3b3JkIn0="
export const QSTASH_CURRENT_SIGNING_KEY="sig_7kYjw48mhY7kAjqNGcy6cr29RJ6r"
export const QSTASH_NEXT_SIGNING_KEY="sig_5ZB6DVzB1wjE8S6rZ7eenA8Pdnhs"
export const SERVER_URL="http://localhost:7000"
