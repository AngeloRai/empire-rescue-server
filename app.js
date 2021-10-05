const express = require("express");
const cors = require("cors");
require("dotenv").config();
//const swaggerUi = require('swagger-ui-express');
const { sequelize } = require("./models");
const PORT = process.env.PORT || 4000;
const app = express();

// const swaggerAutogen = require('swagger-autogen')();

// const outputFile = './swagger/swagger_output.json';
// const endpointsFiles = ['./app.js'];

// swaggerAutogen(outputFile, endpointsFiles);

app.use(cors());

app.use(express.json());

const userRoute = require("./routes/user.routes");
app.use("/", userRoute);

const patientRoute = require("./routes/patient.routes");
app.use("/", patientRoute);

const addressRoute = require("./routes/address.routes");
app.use("/", addressRoute);

const facilityRoute = require("./routes/facility.routes");
app.use("/", facilityRoute);

const examRoute = require("./routes/exam.routes");
app.use("/", examRoute);

const specialtyRoute = require("./routes/specialty.routes");
app.use("/", specialtyRoute);

const doctorRoute = require("./routes/doctor.routes");
app.use("/", doctorRoute);

const appointmentRoute = require("./routes/appointment.routes");
app.use("/", appointmentRoute);

app.listen(PORT, async () => {
  console.log(`server running on port ${PORT}`);
  await sequelize.authenticate();
  console.log("Database connected ");
});
