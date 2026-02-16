const express = require("express");
const { v4: uuidv4 } = require("uuid");
const Poll = require("../models/Poll");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { question, options } = req.body;

    if (!question || !options || options.length < 2) {
      return res.status(400).json({ error: "Invalid poll" });
    }

    const poll = new Poll({
      pollId: uuidv4(),
      question,
      options: options.map(opt => ({ text: opt })),
    });

    await poll.save();

    res.json({ pollId: poll.pollId });

  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
});


router.get("/:id", async (req, res) => {
  const poll = await Poll.findOne({ pollId: req.params.id });

  if (!poll) return res.status(404).json({ error: "Not found" });

  res.json(poll);
});

module.exports = router;
