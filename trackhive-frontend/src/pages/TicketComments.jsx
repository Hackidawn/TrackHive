import React, { useState, useEffect } from "react";
import axios from "axios";

function TicketComments({ ticketId }) {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");

  const fetchComments = async () => {
    const res = await axios.get(`/api/comments/${ticketId}`);
    setComments(res.data);
  };

  const addComment = async () => {
    await axios.post(`/api/comments/${ticketId}`, { text });
    setText("");
    fetchComments();
  };

  useEffect(() => { fetchComments(); }, [ticketId]);

  return (
    <div className="p-4">
      <h4 className="font-bold mb-2">Comments</h4>
      {comments.map(c => (
        <div key={c._id} className="mb-2 border-b pb-2">
          <p className="text-sm">{c.userName}:</p>
          <p>{c.text}</p>
        </div>
      ))}
      <textarea className="w-full p-2 border" value={text} onChange={(e) => setText(e.target.value)} />
      <button onClick={addComment} className="bg-blue-500 text-white mt-2 px-4 py-2 rounded">Add Comment</button>
    </div>
  );
}

export default TicketComments;
