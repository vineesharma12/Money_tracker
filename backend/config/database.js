import dns from "node:dns";
import mongoose from "mongoose";

mongoose.set("bufferCommands", false);

export async function connectDatabase() {
  const uri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/khataflow";

  if (uri.startsWith("mongodb+srv://") && process.env.DNS_SERVERS) {
    const servers = process.env.DNS_SERVERS
      .split(",")
      .map(server => server.trim())
      .filter(Boolean);

    if (servers.length) dns.setServers(servers);
  }

  await mongoose.connect(uri, { serverSelectionTimeoutMS: 10000 });
  console.log("MongoDB connected");
}

export function databaseStatus() {
  return mongoose.connection.readyState === 1 ? "connected" : "disconnected";
}
