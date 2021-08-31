const router = require("express").Router();
const {
  Facility,
  Doctor,
  Specialty,
  Appointment,
  Patient,
  Address
} = require("../models");

//CREATE DOCTOR
router.post("/doctor", async (req, res) => {
  const { name, crm, isActive, email, phone1, phone2 } = req.body;
  const { facilities, specialties } = req.body;

  try {
    const doctor = await Doctor.create({
      name,
      crm,
      isActive,
      email,
      phone1,
      phone2,
    });
    //IF THERE ARE ASSOCIATIONS, THEY ARE SET HERE WITH IDS RECEIVED FROM BODY
    if (specialties && specialties.length > 0) {
      doctor.setSpecialties(specialties);
    }
    if (facilities && facilities.length > 0) {
      doctor.setFacilities(facilities);
    }

    return res.json(doctor);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

//READ ALL DOCTORS
router.get("/doctors", async (req, res) => {
  try {
    const doctors = await Doctor.findAll({
      include: [
        {
          model: Facility,
          as: "facilities",
          through: { attributes: [] },
        },
        {
          model: Specialty,
          as: "specialties",
          through: { attributes: [] },
        },
        {
          model: Appointment,
          as: "appointments",
         
        },
      ],
    });

    return res.status(200).json(doctors);
  } catch (err) {
    console.error(err);
    res.status(500).json(err.errors);
  }
});

//FIND ONE DOCTOR
router.get("/doctor/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const doctor = await Doctor.findByPk(id, {
      include: [
        {
          model: Facility,
          as: "facilities",
          through: { attributes: [] },
          include: [
            {
            model: Specialty,
            as: "specialties",
            through: { attributes: [] },
            }
          ]
        },
        {
          model: Specialty,
          as: "specialties",
          through: { attributes: [] },
        },
        {
          model: Appointment,
          as: "appointments",
          include: [
            {
              model: Patient,
              as: "patient",
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
          ],
        },
      ],
    });

    return res.json(doctor);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong!" });
  }
});

//UPDATE ONE DOCTOR
router.put("/doctor-update/:id", async (req, res) => {
  const { id } = req.params;
  const { ...data } = req.body;
  const { facilities, specialties } = req.body;

  try {
    const doctor = await Doctor.findByPk(id);

    await doctor.update(data);
    //IF THERE ARE ASSOCIATIONS, THEY ARE SET HERE WITH IDS RECEIVED FROM BODY
    if (specialties && specialties.length > 0) {
      doctor.setSpecialties(specialties);
    }
    if (facilities && facilities.length > 0) {
      doctor.setFacilities(facilities);
    }

    return res.status(200).json(doctor);
  } catch (err) {
    console.log(err);
    return res.status(500).json("Something went wrong!");
  }
});

//DELETE ONE USER
router.delete("/doctor-delete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Appointment.destroy({where: {doctorId: id}})
    await Doctor.destroy({ where: { id } });

    return res.json({ message: "Doctor deleted!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong!" });
  }
});

module.exports = router;
