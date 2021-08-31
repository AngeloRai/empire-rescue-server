const router = require("express").Router();
const {
  Exam,
  Address,
  Facility,
  Doctor,
  Specialty,
  Appointment,
  FacilitySpecialty,
} = require("../models");
const specialty = require("../models/specialty");

//CREATE FACILITY
router.post("/facility", async (req, res) => {
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
  const {
    name,
    unit,
    email,
    phone1,
    phone2,
    phone3,
    clinic,
    hospital,
    laboratory,
    emergency,
  } = req.body;
  const { exams, doctors, specialties } = req.body;

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

    const facility = await Facility.create({
      name,
      unit,
      email,
      phone1,
      phone2,
      phone3,
      clinic,
      hospital,
      laboratory,
      emergency,
      addressId: address.id,
    });
    //IF THERE ARE ASSOCIATIONS, THEY ARE SET HERE WITH IDS RECEIVED FROM BODY
    if (exams && exams.length > 0) {
      facility.setExams(exams);
    }
    if (doctors && doctors.length > 0) {
      facility.setDoctors(doctors);
    }
    if (specialties && specialties.length > 0) {
      facility.setSpecialties(specialties);
    }

    return res.status(200).json({ facility, address });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

//READ ALL FACILITIES WITH ASSOCIATIONS
router.get("/facilities-info", async (req, res) => {
  try {
    const facility = await Facility.findAll({
      include: [
        {
          model: Address,
          as: "address",
        },
        {
          model: Exam,
          as: "exams",
          through: { attributes: [] },
        },
        {
          model: Doctor,
          as: "doctors",
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

    return res.status(200).json(facility);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong!" });
  }
});

router.get("/selected-facilities", async (req, res) => {
  const { specialty } = req.body;
  try {
    const facility = await Facility.findAll({
      where: { specialtyId: specialty },
      include: [
        {
          model: Address,
          as: "address",
        },
        {
          model: Exam,
          as: "exams",
          through: { attributes: [] },
        },
        {
          model: Doctor,
          as: "doctors",
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

    return res.status(200).json(facility);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong!" });
  }
});

//READ ALL FACILITIES (NO ASSOCIATIONS)
router.get("/facilities", async (req, res) => {
  try {
    const facility = await Facility.findAll();

    return res.status(200).json(facility);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong!" });
  }
});

//FIND ONE FACILITY
router.get("/facility/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const facility = await Facility.findByPk(id, {
      include: [
        {
          model: Address,
          as: "address",
        },
        {
          model: Exam,
          as: "exams",
        },
        {
          model: Doctor,
          as: "doctors",
          include: [
            {
              model: Specialty,
              as: "specialties"
            }
          ]
        },
        {
          model: Specialty,
          as: "specialties",
        },
      ],
    });

    return res.json(facility);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong!" });
  }
});

//UPDATE ONE FACILITY
router.put("/facility-update/:id", async (req, res) => {
  const { id } = req.params;
  const { exams, doctors, specialties, ...data } = req.body;
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

  try {
    const facility = await Facility.findByPk(id);
    console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
    console.log(facility.addressId);
    const facilityAddress = await Address.findByPk(facility.addressId);

    facility.update(data);
    facilityAddress.update(data);
    //IF THERE ARE ASSOCIATIONS, THEY ARE SET HERE WITH IDS RECEIVED FROM BODY
    if (exams && exams.length > 0) {
      facility.setExams(exams);
    }
    if (doctors && doctors.length > 0) {
      facility.setDoctors(doctors);
    }
    if (specialties && specialties.length > 0) {
      facility.setSpecialties(specialties);
    }

    return res.status(200).json(facility);
  } catch (err) {
    console.log(err);
    return res.status(500).json("Something went wrong!");
  }
});

//DELETE ONE FACILITY
router.delete("/facility-delete/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await Appointment.destroy({ where: { facilityId: id } });
    const facility = await Facility.findByPk(id);
    await Address.destroy({ where: { id: facility.addressId } });
    await Facility.destroy({ where: { id } });

    return res.json({ message: "Address deleted! " });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong!" });
  }
});

module.exports = router;
