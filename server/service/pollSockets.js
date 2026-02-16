const Poll = require("../models/Poll");

const pollSocket = (io) => {
  io.on("connection", (socket) => {

    socket.on("join-poll", (pollId) => {
      socket.join(pollId);
    });

    socket.on("vote", async ({ pollId, optionIndex }) => {
      const ip = socket.handshake.headers["x-forwarded-for"] || socket.handshake.address;

      const poll = await Poll.findOne({ pollId });
      if (!poll || poll.voters.includes(ip)) return;

      poll.options[optionIndex].votes++;
      poll.voters.push(ip);

      await poll.save();

      io.to(pollId).emit("results-updated", poll);
    });
  });
};

module.exports = pollSocket;
