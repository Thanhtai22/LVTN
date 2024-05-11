import React, { useState, useEffect } from "react";
import { apiUserById } from "../../services/user";

const CommentSection = ({ content, dateTime, userId }) => {
  const [nameOfUser, setNameOfUser] = useState("");
  useEffect(() => {
    let isApiSubribed = false;
    const fetchData = async () => {
      if (!isApiSubribed && userId) {
        const user = await apiUserById(userId);
        setNameOfUser(user.data.response.name);
      }
    };
    fetchData();
    return () => {
      isApiSubribed = true;
    };
  }, []);
  return (
    <div style={{ borderTop: "1px solid black" }}>
      <h3>{nameOfUser}</h3>
      <p style={{ fontStyle: "italic", color: "gray" }}>{dateTime}</p>
      <p>{content}</p>
    </div>
  );
};

export default CommentSection;
