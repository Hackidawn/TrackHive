import React, { useState, useEffect } from "react";
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

function TicketComments({ ticketId }) {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");

  const fetchComments = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${API}/api/comments/${ticketId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setComments(res.data);
    } catch (err) {
      console.error("Error fetching comments", err);
    }
  };

  const addComment = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${API}/api/comments/${ticketId}`,
        { text },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setText("");
      fetchComments();
    } catch (err) {
      console.error("Error adding comment", err);
    }
  };

  useEffect(() => {
    if (ticketId) fetchComments();
  }, [ticketId]);

  return (
    <div className="p-4">
      <h4 className="font-bold mb-2">Comments</h4>
      {comments.map((c) => (
        <div key={c._id} className="mb-2 border-b pb-2">
          <p className="text-sm text-slate-400">{c.userName}:</p>
          <p>{c.text}</p>
        </div>
      ))}
      <textarea
        className="w-full p-2 border rounded mt-2 bg-slate-800 text-white"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a comment..."
      />
      <button
        onClick={addComment}
        className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Add Comment
      </button>
    </div>
  );
}

export default TicketComments;
