import express from "express";
const app = express();
import cors from "cors";

import mediaRouter from "../routes/mediaRoute.js";

const PORT = 9000;
const corsOptions = {
  origin: ["https://enter-stream.vercel.app/", "http://localhost:3000"],
};

app.use((req, res, next) => {
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'none'; script-src 'self' https://vercel.live; style-src 'self' https://vercel.live; img-src 'self' data:; connect-src 'self' https://your-api-endpoint.com;"
  );
  next();
});

app.use(express.json());
app.use(cors(corsOptions));

app.use("/api/", mediaRouter);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

export default app;
