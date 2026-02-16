import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import socket from "../socket";
const baseURL = import.meta.env.VITE_API_BASE_URL;

export default function PollRoom() {
  const { id } = useParams();
  const [poll, setPoll] = useState(null);
  const [voted, setVoted] = useState(
  localStorage.getItem(`voted-${id}`) === "true"
  );

  const shareLink = window.location.href;

  useEffect(() => {
    axios.get(`${baseURL}/api/polls/${id}`)
    .then((res) => setPoll(res.data))
    .catch(() => alert("Poll not found"));
    
    socket.emit("join-poll", id);
    
    socket.on("results-updated", setPoll);
    
    return () => socket.off("results-updated");
  
  }, [id, baseURL]);

  const vote = (index) => {
    if (voted || !poll) return;

    socket.emit("vote", { pollId: id, optionIndex: index });

    localStorage.setItem(`voted-${id}`, "true");
    setVoted(true);
  };

  if(!poll || !poll.options) {
    return ( 
    <div className="h-screen flex items-center justify-center"> 
      <p className="text-xl">Loading poll...</p> 
    </div>
    );
  }
  
  const totalVotes = poll.options.reduce(
  (sum, o) => sum + o.votes, 0
  );

  return ( 
  <div className="min-h-screen flex items-center justify-center bg-gray-100"> <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-lg">

    <h1 className="text-2xl font-bold mb-6 text-center">
      {poll.question}
    </h1>

    {poll.options.map((opt, i) => {
      const percent = totalVotes
        ? ((opt.votes / totalVotes) * 100).toFixed(1)
        : 0;

      return (
        <div
          key={i}
          onClick={() => vote(i)}
          className={`border rounded-lg p-4 mb-3 cursor-pointer transition
            ${voted ? "bg-gray-100" : "hover:bg-blue-50"}`}
        >
          <div className="flex justify-between font-medium">
            <span>{opt.text}</span>
            <span>{percent}%</span>
          </div>

          <div className="w-full bg-gray-200 h-2 mt-2 rounded">
            <div
              className="bg-blue-600 h-2 rounded"
              style={{ width: `${percent}%` }}
            />
          </div>

          <div className="text-sm text-gray-600 mt-1">
            {opt.votes} votes
          </div>
        </div>
      );
    })}

     {/* // sghare details */}
    <div className="mb-4 flex gap-2">
      <input
        value={shareLink}
        readOnly
        className="border rounded-lg p-2 w-full text-sm"
      />
      <button
        onClick={() => {
          navigator.clipboard.writeText(shareLink);
          alert("Link copied!");
        }}
        className="bg-gray-600 hover:bg-gray-700 text-white px-4 rounded-lg"
      >
        Copy
      </button>
    </div>

    <button
      onClick={() => {
        if (navigator.share) {
          navigator.share({
            title: "Vote in my poll!",
            url: shareLink,
          });
        }
      }}
      className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg mb-4"
    >
      Share Poll
    </button>

  </div> 
</div>
);
}
