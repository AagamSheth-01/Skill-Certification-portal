import Test from "../model/Test.js";

// ========== Create Test (Admin) ==========
export const createTest = async (req, res) => {
  try {
    const { courseId, questions } = req.body;

    if (!courseId || !questions?.length) {
      return res.status(400).json({ message: "Course ID and questions are required" });
    }

    const newTest = new Test({ courseId, questions });
    await newTest.save();

    res.status(201).json({ message: "Test created successfully", test: newTest });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// ========== Get Test for Course ==========
export const getTestByCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const test = await Test.findOne({ courseId });

    if (!test) return res.status(404).json({ message: "Test not found" });

    // Hide correct answers for frontend
    const safeQuestions = test.questions.map((q) => ({
      _id: q._id,
      questionText: q.questionText,
      options: q.options,
    }));

    res.json({ courseId, questions: safeQuestions });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// ========== Submit Test ==========
export const submitTest = async (req, res) => {
  try {
    const { courseId, answers } = req.body; // answers = [{questionId, selectedOption}]
    const test = await Test.findOne({ courseId });
    if (!test) return res.status(404).json({ message: "Test not found" });

    let score = 0;
    test.questions.forEach((q) => {
      const userAnswer = answers.find((a) => a.questionId === q._id.toString());
      if (userAnswer && userAnswer.selectedOption === q.correctAnswer) score++;
    });

    res.json({ score, total: test.questions.length });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
