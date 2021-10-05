const router = require("express").Router();
const bcrypt = require("bcrypt");
const generateToken = require("../config/jwt.config");
// const isAuthenticated = require("../middlewares/isAuthenticated");
// const attachCurrentUser = require("../middlewares/attachCurrentUser");
// const isAdmin = require("../middlewares/isAdmin");
const { User, Patient, Address } = require("../models");

//CREATE USER
router.post("/sign-up", async (req, res) => {
  const { password, email } = req.body;
  console.log(req.body);
  try {

    const findUser = await User.findOne({where: {email: email}})
    
    if (findUser) {
      return res.status(500).json({ msg: "Este email já está registrado. Escolha outro email." });
    }
    let hashedPassword = ""
    
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10)
    }
   
    const newUser = await User.create({
      ...req.body,
      passwordHash: hashedPassword,
    });

    
    return res.json(newUser);
  } catch (err) {
    console.log(err.errors);
    return res.status(500).json(err.errors);
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  try {
    // Extract email and password from body request
    const { email, password } = req.body;

    // Search user in the database by email
    const user = await User.findOne({ where: { email } });
    ;
    // If user is not found, user is not registered
    if (!user) {
      return res
        .status(400)
        .json({ msg: "Este email não está registrado." });
    }

    // Verify if password matches with incoming password from the form

    if (await bcrypt.compare(password, user.passwordHash)) {
      // Generate JWT token with the logged user data
     const token = generateToken(user);

      return res.status(200).json({
        user: {
          email: user.email,
          role: user.role,
          id: user.id,
        },
        token,
      });
    } else {
      // 401 Unauthorized
      return res.status(401).json({ msg: "Senha errada" });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: JSON.stringify(err) });
  }
});

//READ ALL USERS
router.get("/users", async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ["passwordHash"] },
      include: [
        {
          model: Patient,
          as: "patients", // specifies how we want to be able to access our joined rows on the returned data
          include: [
            {
              model: Address,
              as: "address", 
            },
          ]
        },
      ],
    });

    return res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json(err.errors);
  }
});

//FIND ONE USER
router.get("/user/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id, {
      attributes: { exclude: ["passwordHash"] },
      include: [
        {
          model: Patient,
          as: "patients", // specifies how we want to be able to access our joined rows on the returned data
          include: [
            {
              model: Address,
              as: "address",
            },
          ],
        },
      ],
    });

    if (!user) {
      return res.status(404).json({msg: "Usuario nao encontrado!"})
    }

    return res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong!" });
  }
});

// //UPDATE ONE USER
router.put("/user-update/:id", async (req, res) => {
  const { id } = req.params;
  const { email, role } = req.body;

  try {
    const user = await User.findOne({ where: { id } });

    console.log(role);
    user.email = email;
    user.role = role;

    await user.save();

    console.table(user);
    return res.json(user);
  } catch (err) {
    console.log(err);
    return res.status(500).json("Something went wrong!");
  }
});

//DELETE ONE USER
router.delete("/user-delete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Patient.destroy({ where: { userId: id } });
    await User.destroy({ where: { id } });

    return res.json({ message: "User deleted!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong!" });
  }
});

module.exports = router;
