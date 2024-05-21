const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const {
  getPatientData,
  addPatientData,
} = require("./controllers/requests.controller");
const { createUser } = require("./controllers/users.controller");

const port = 3002;
const app = express();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cors({ origin: "*" }));

app.get("/", (req, res) => {
  res.json({ message: "Message from server" });
});

app.get("/patient-data", async (req, res) => {
  try {
    const { search, sortBy, order } = req.query;
    const query = {
      $or: [
        { name: { $regex: search || "", $options: "i" } },
        { description: { $regex: search || "", $options: "i" } },
      ],
    };
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    res.send({
      data: await getPatientData(query, sortBy, order, page, limit),
      error: undefined,
    });
  } catch (e) {
    console.log(e);
    res.send({ data: [], error: e.message });
  }
});

app.post("/form", async (req, res) => {
  const newPatientRequest = req.body;
  try {
    const serverRes = await addPatientData(newPatientRequest);
    res.json({
      data: serverRes,
      redirect: true,
      redirectUrl: "/patient-data",
      error: false,
      message: `Request of ${serverRes.name} has been added`,
    });
  } catch (e) {
    console.log(e);
    res.json({
      error: true,
      message: e.message,
    });
  }
});

app.post("/login", async (req, res) => {
  const newUserData = req.body;

  try {
    const newUser = await createUser(newUserData);
    res.json({
      data: newUser,
      error: false,
      message: `User with login ${newUser.email} has been added`,
    });
  } catch (e) {
    res.json({
      error: true,
      message: e.message,
    });
  }
});

mongoose
  .connect(
    "mongodb+srv://nikaleksenko:an3KaRbbFRhb40i4@cluster0.vxcl4ie.mongodb.net/medrequests?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  });
