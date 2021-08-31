const router = require("express").Router();
const { Exam, Facility } = require("../models");

//CREATE EXAM
router.post("/exam", async (req, res) => {
  const { examName, examType } = req.body;
  console.log(req.body);
  try {
    const exam = await Exam.create({ examName, examType });

    return res.json(exam);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

//READ ALL EXAMS
router.get("/exams", async (req, res) => {
  try {
    const exams = await Exam.findAll({
      include: [
        {
          model: Facility,
          as: "facilities",
          through: { attributes: [] },
        },
      ],
    });

    return res.status(200).json(exams);
  } catch (err) {
    console.error(err);
    res.status(500).json(err.errors);
  }
});

//FIND ONE EXAM
router.get("/exam/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const exam = await Exam.findByPk(id, {
      include: [
        {
          model: Facility,
          as: "facilities",
          through: { attributes: [] },
        },
      ],
    });
    return res.status(200).json(exam);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong!" });
  }
});

//UPDATE ONE EXAM
router.put("/exam-update/:id", async (req, res) => {
  const { id } = req.params;
  const { ...data } = req.body;

  try {
    const exam = await Exam.findByPk(id);

    await exam.update(data);

    return res.status(200).json(exam);
  } catch (err) {
    console.log(err);
    return res.status(500).json("Something went wrong!");
  }
});

//DELETE ONE EXAM
router.delete("/exam-delete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Exam.destroy({ where: { id } });

    return res.status(200).json({ message: "Exam deleted!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong!" });
  }
});

module.exports = router;
