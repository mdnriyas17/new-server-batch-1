const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv").config();
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const jsonParser = bodyParser.json();
const cors = require("cors");
const morgan = require("morgan");
const routers = require("./routes/routes");
const { notFound, errorHandler } = require("./mildware/errorhandlure");
const path = require("path");
const db = require("./db/db");
const app = express();
const cookieParser = require("cookie-parser");
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:3000", "https://yourliveserver.com"],
    credentials: true,
  })
);
app.use(urlencodedParser);
app.use(jsonParser);
app.use(morgan("dev"));
app.use(
  "/public/uploads/",
  express.static(path.join(__dirname, "public/uploads"))
);
app.use("/api", routers);
app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT; //line by line execution

app.listen(port, () => {
  db();
  console.log(`Server running on port ${port}`);
});
