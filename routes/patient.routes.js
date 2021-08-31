const router = require("express").Router();
const { request } = require("express");
const { Patient, User, Address, Appointment } = require("../models");

//CREATE PATIENT
router.post("/patient", async (req, res) => {
  const {
    postalCode,
    street,
    number,
    neighborhood,
    city,
    state,
    complement,
    observations,
  } = req.body;
  const { name, phone1, phone2, rg, cpf, userId } = req.body;

  console.log(req.body);
  try {
    const address = await Address.create({
      postalCode,
      street,
      number,
      neighborhood,
      city,
      state,
      complement,
      observations,
    });

    const patient = await Patient.create({
      name,
      phone1,
      phone2,
      rg,
      cpf,
      userId,
      addressId: address.id,
    });

    return res.json(patient);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

//READ ALL PATIENTS
router.get("/patients", async (req, res) => {
  try {
    const patients = await Patient.findAll({
      include: [
        {
          model: User,
          as: "user", // specifies how we want to be able to access our joined rows on the returned data
          attributes: { exclude: ["passwordHash"] },
        },
        {
          model: Address,
          as: "address",
        },
        {
          model: Appointment,
          as: "appointments",
        },
      ],
    });

    return res.json(patients);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong!" });
  }
});

//READ ALL PATIENTS BY USER ID
router.get("/user-patients/:id", async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const patients = await Patient.findAll({where: {userId: id},
      include: [
        {
          model: User,
          as: "user", // specifies how we want to be able to access our joined rows on the returned data
          attributes: { exclude: ["passwordHash"] },
        },
        {
          model: Address,
          as: "address",
        },
        {
          model: Appointment,
          as: "appointments",
        },
      ],
    });

    return res.json(patients);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong!" });
  }
});

//FIND ONE PATIENT
router.get("/patient/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const patient = await Patient.findByPk(id, {
      include: [
        {
          model: User,
          as: "user",
          attributes: { exclude: ["passwordHash"] },
        },
      ],
    });

    return res.json(patient);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong!" });
  }
});

//UPDATE ONE PATIENT
router.put("/patient/:id", async (req, res) => {
  const { id } = req.params;
  const { ...data } = req.body;
  try {
    const patient = await Patient.findOne({ where: { id } });

    await patient.update(data);

    return res.status(200).json(patient);
  } catch (err) {
    console.log(err);
    return res.status(500).json("Something went wrong!");
  }
});

//DELETE ONE PATIENT
router.delete("/patient/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await Appointment.destroy({ where: { patientId: id } });
    await Patient.destroy({ where: { id } });
    return res.json({ message: "Address deleted! " });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong!" });
  }
});

module.exports = router;
