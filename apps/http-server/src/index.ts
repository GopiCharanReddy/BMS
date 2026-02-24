import express from "express";
import { db } from "@repo/db/client"
import { users } from "@repo/db/schema"
const app = express();

const port = 3001;

app.use(express.json());

app.get('/', (req, res) => {
  res.send("Hello.");
})

app.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  const data = await db.insert(users).values({
    name, email, password
  });
  if (!data) {
    return res.status(400).json({
      error: "Error while pushing data to database."
    })
  }
  return res.status(200).json({
    message: "Signup successful."
  })
})
app.listen(port, () => {
  console.log("Server is listening on port: ", port);
});