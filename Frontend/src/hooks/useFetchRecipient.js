import { useContext, useEffect, useState } from "react";
import { getRequest } from "../utils/services";
import { ChatContext } from "../context/chatContext";

export let useFetchRecipient = (chat, user, type = "exist") => {
  let [recipient, setRecipient] = useState(null);
  const [error, setError] = useState(null);
  const { chatType } = useContext(ChatContext);

  const recipientId =
    type === "exist" && chatType !== "group"
      ? chat?.members.find((id) => id != user.userId)
      : null;

  useEffect(() => {
    const getUser = async () => {
      if (!recipientId) return null;
      const res = await getRequest(
        `http://127.0.0.1:8000/api/users/${recipientId}`
      );
      if (res.error) {
        console.log("error");
        return setError(res.error);
      }
      setRecipient(res);
    };
    getUser();
  }, [recipientId]);

  return { recipient, recipientId, error };
};
