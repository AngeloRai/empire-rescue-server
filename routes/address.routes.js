const router = require("express").Router();
const { Address, Patient, User, Facility } = require("../models");

//CREATE ADDRESS
router.post("/address", async (req, res) => {
  const { postalCode, street, number, neighborhood, city, state, complement, observations } = req.body;
  console.log(req.body);
  try {
    const address = await Address.create({ postalCode, street, number, neighborhood, city, state, complement, observations });

    return res.json(address);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

//READ ALL ADDRESSES
router.get("/addresses", async (req, res) => {
  try {
    const addresses = await Address.findAll({
      include: [
        {
          model: Patient,
          as: "patient", // specifies how we want to be able to access our joined rows on the returned data
          include: [
            {
              model: User,
              as: "user", // specifies how we want to be able to access our joined rows on the returned data
              attributes: {exclude: ['passwordHash']},
            },
          ],
        },
        {
          model: Facility,
          as: "facilities",
        }
      ],
    });

    return res.json(addresses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong!" });
  }
});

//FIND ONE ADDRESS
router.get("/address/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const address = await Address.findOne({ where: { id }, include: [
      {
        model: Patient,
        as: "patient", 
        include: [
          {
            model: User,
            as: "user",
            attributes: {exclude: ['passwordHash']},
          },
        ],
      },
    ],});

    return res.json(address);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong!" });
  }
});

//UPDATE ONE ADDRESS
router.put("/address/:id", async (req, res) => {
  const { id } = req.params;
  const { ...data } = req.body;
  console.log(req.body);
  try {
    const address = await Address.findOne({ where: { id } });

    await address.update(data);

    return res.json(address);
  } catch (err) {
    console.log(err);
    return res.status(500).json("Something went wrong!");
  }
});

//DELETE ONE ADDRESS
router.delete("/address-delete/:id", async (req, res) => {
  const { id } = req.params;
  
  try {
    
    await Address.destroy({ where: { id } });

    return res.json({ message: "Address deleted! "});
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong!" });
  }
});

module.exports = router;
