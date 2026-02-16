import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const baseURL = import.meta.env.VITE_API_BASE_URL;

export default function CreatePoll() {
const [question, setQuestion] = useState("");
const [options, setOptions] = useState(["", ""]);
const [loading, setLoading] = useState(false);
const navigate = useNavigate();

const handleSubmit = async () => {
if (!question.trim() || options.some(o => !o.trim())) {
alert("Please fill all fields");
return;
}

try {
  setLoading(true);
  const res = await axios.post(`${baseURL}/api/polls`, {
    question,
    options,
  });

  navigate(`${baseURL}/poll/${res.data.pollId}`);
} catch (err) {
  alert("Failed to create poll");
  console.log("createPoll Error: ", err.message);
} finally {
  setLoading(false);
}
};

return ( 
<div className="min-h-screen flex items-center justify-center bg-gray-100"> <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-lg">

 <h1 className="text-3xl font-bold text-center mb-6">
      Create a Poll
    </h1>

    <input
      className="border rounded-lg p-3 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
      placeholder="Enter your question..."
      value={question}
      onChange={(e) => setQuestion(e.target.value)}
    />

    {options.map((opt, i) => (
      <input
        key={i}
        className="border rounded-lg p-3 w-full mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder={`Option ${i + 1}`}
        value={opt}
        onChange={(e) => {
          const copy = [...options];
          copy[i] = e.target.value;
          setOptions(copy);
        }}
      />
    ))}

    <button
      onClick={() => setOptions([...options, ""])}
      className="w-full mb-3 bg-gray-200 hover:bg-gray-300 transition rounded-lg py-2"
    >
      + Add Option
    </button>

    <button
      onClick={handleSubmit}
      disabled={loading}
      className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-3 font-semibold transition"
    >
      {loading ? "Creating..." : "Create Poll"}
    </button>

  </div>
</div>
)}
