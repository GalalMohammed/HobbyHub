import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

const Groups = ({ category }) => {
  const [groups, setGroups] = useState([]);
  const nav = useNavigate();

  // send a request to join group
  const handleGroup = async (id) => {
    try {
      await axios.post(`http://localhost:8000/api/groups/${id}/join/`, {
        headers: {
          Authorization: `Token ${
            JSON.parse(localStorage.getItem("user"))?.token
          }`,
        },
      });
      console.log("success");
    } catch (error) {
      console.error("Error", error);
    }
  };

  // Fetch groups on component mount
  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/categories/${category}/groups/`, {
        headers: {
          Authorization: `Token ${
            JSON.parse(localStorage.getItem("user"))?.token
          }`,
        },
      })
      .then((res) => setGroups(res.data));
  }, [category]);
  return (
    <div class="chats">
      {groups.map((group) => (
        <div
          class="chat"
          onClick={() => nav(`/HobbyHub/main/groups/group/${group.id}`)}
          style={{ cursor: "pointer" }}
        >
          <div className="img-info">
            <img src={group.icon_url} alt="icon" />
            <div className="txt">
              <h4>{group.name}</h4>
              <p style={{ color: "GrayText" }}>
                {group.members.length} members
              </p>
            </div>
          </div>
          <Button className="addIcon" onClick={() => handleGroup(group.id)}>
            {group.joined ? "✔️" : "➕"}
          </Button>
        </div>
      ))}
    </div>
  );
};

export default Groups;
