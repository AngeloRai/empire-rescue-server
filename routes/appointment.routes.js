const router = require("express").Router();
const {
  Appointment,
  Patient,
  Address,
  Facility,
  Doctor,
  Specialty,
  Exam,
  User,
} = require("../models");

//CREATE APPOINTMENT
router.post("/appointment", async (req, res) => {
  const {
    appointmentType,
    status,
    dateTime,
    patientId,
    facilityId,
    doctorId,
    specialtyId,
    examId,
  } = req.body;

  try {
    const appointment = await Appointment.create({
      appointmentType,
      status,
      dateTime,
      patientId,
      facilityId,
      doctorId,
      specialtyId,
      examId,
    });

    return res.status(200).json(appointment);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

//READ ALL APPOINTMENTS
router.get("/appointments", async (req, res) => {
  try {
    const appointment = await Appointment.findAll({
      include: [
        {
          model: Exam,
          as: "exam",
        },
        {
          model: Facility,
          as: "facility",
          include: [
            {
              model: Address,
              as: "address",
            },
          ],
        },
        {
          model: Patient,
          as: "patient",
        },
        {
          model: Doctor,
          as: "doctor",
        },
        {
          model: Specialty,
          as: "specialty",
        },
      ],
    });

    return res.status(200).json(appointment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong!" });
  }
});

//FIND ONE APPOINTMENT
router.get("/appointment/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const appointment = await Appointment.findByPk(id, {
      include: [
        {
          model: Facility,
          as: "facility",
          include: [
            {
              model: Address,
              as: "address",
            },
          ],
        },
        {
          model: Patient,
          as: "patient",
          include: [
            {
              model: User,
              as: "user",
            },
          ],
        },
        {
          model: Doctor,
          as: "doctor",
        },
        {
          model: Exam,
          as: "exam",
        },
        {
          model: Specialty,
          as: "specialty",
        },
        {
          model: Facility,
          as: "facility",
        },
      ],
    });

    return res.json(appointment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong!" });
  }
});

//UPDATE ONE APPOINTMENT
router.put("/appointment-update/:id", async (req, res) => {
  const { id } = req.params;
  const { ...data } = req.body;
  console.log(req.body);
  try {
    const appointment = await Appointment.findByPk(id);
    console.log(appointment.dataValues);
    appointment.update(data);

    return res.status(200).json(appointment);
  } catch (err) {
    console.log(err);
    return res.status(500).json("Something went wrong!");
  }
});

//DELETE ONE APPOINTMENT
router.delete("/appointment-delete/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const appointment = await Appointment.findByPk(id);

    await appointment.destroy({ where: { id } });

    return res.json({ message: "Appointment deleted! " });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong!" });
  }
});

module.exports = router;
