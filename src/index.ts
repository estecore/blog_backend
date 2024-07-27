import express from "express";

import jwt from "jsonwebtoken";

const PORT: number = 1337;

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/auth/login", (req, res) => {
  console.log(req.body);

  const token = jwt.sign(
    {
      email: req.body.email,
      password: req.body.password,
      fullName: "Karl",
    },

    "secret123"
  );

  res.json({
    success: true,
    token,
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
