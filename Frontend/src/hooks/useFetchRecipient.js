import { useEffect, useState } from "react";
import { getRequest } from "../utils.js/services";

export let useFetchRecipient = (chat, user, type = "exist") => {
  let [recipient, setRecipient] = useState(null);
  const [error, setError] = useState(null);

  const recipientId =
    type === "exist" ? chat?.members.find((id) => id !== user.userId) : null;

  useEffect(() => {
    const getUser = async () => {
      if (!recipientId) return null;
      const res = await getRequest(`/api/users/find/${recipientId}`);
      console.log("rec", res);
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
