const router = require("express").Router();
const { Specialty, Facility, Doctor, Address } = require("../models");

//CREATE SPECIALTY
router.post("/specialty", async (req, res) => {
  const { name } = req.body;
  console.log(req.body);
  try {
    const specialty = await Specialty.create({ name });

    return res.status(200).json(specialty);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

//READ ALL SPECIALTIES
router.get("/specialties", async (req, res) => {
  try {
    const specialties = await Specialty.findAll({
      include: [
        {
          model: Facility,
          as: "facilities",
          through: { attributes: [] },
        },
        {
          model: Doctor,
          as: "doctors",
          through: { attributes: [] },
        },
      ],
    });

    return res.status(200).json(specialties);
  } catch (err) {
    console.error(err);
    res.status(500).json(err.errors);
  }
});

//FIND ONE SPECIALTY
router.get("/specialty/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const exam = await Specialty.findByPk(id, {
      include: [
        {
          model: Facility,
          as: "facilities",
          through: { attributes: [] },
          include: [
            {
              model: Address,
              as: "address"
            },
            {
              model: Specialty,
              as: "specialties"
            },
            {
              model: Doctor,
              as: "doctors"
            }
          ]
        },
        {
          model: Doctor,
          as: "doctors",
          through: { attributes: [] },
          include: [
            {
              model: Specialty,
              as: "specialties"
            },
            {
              model: Facility,
              as: "facilities"
            },
          ]
        },
      ],
    });

    return res.status(200).json(exam);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong!" });
  }
});

//UPDATE ONE SPECIALTY
router.put("/specialty-update/:id", async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  console.log(name);
  try {
    const specialty = await Specialty.findByPk(id);

    specialty.update({name});

    console.table(specialty);
    return res.status(200).json(specialty);
  } catch (err) {
    console.log(err);
    return res.status(500).json("Something went wrong!");
  }
});

//DELETE ONE SPECIALTY
router.delete("/specialty-delete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Specialty.destroy({ where: { id } });

    return res.status(200).json({ message: "Specialty deleted!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong!" });
  }
});

module.exports = router;
