import { WebSocketServer } from "ws";
import { db } from "@repo/db/client"
import { users } from "@repo/db/schema"

const socket = new WebSocketServer({
  port: 8080
});
socket.on("connection", async (ws) => {
  console.log("Client connected. Attempting DB insert..."); // Add this log!
  
  try {
    // 1. Use a unique email to avoid "Unique Constraint" errors
    const uniqueEmail = `charan-${Date.now()}@gmail.com`;

    const data = await db.insert(users).values({
      name: "charan",
      email: uniqueEmail,
      password: "password"
    }).returning(); // Add .returning() to get data back

    console.log("Insert Success:", data);
    ws.send(JSON.stringify({ message: "User created", user: data[0] }));

  } catch (error) {
    // LOG THE ACTUAL ERROR TO YOUR TERMINAL
    console.error("DATABASE ERROR:", error); 
    
    ws.send(JSON.stringify({ 
      error: error instanceof Error ? error.message : "Database error" 
    }));
  }
});
