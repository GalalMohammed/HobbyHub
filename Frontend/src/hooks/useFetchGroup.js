import { useContext, useEffect, useState } from "react";
import { getRequest } from "../utils/services";
import { ChatContext } from "../context/chatContext";

export let useFetchGroup = (groupId, user, type = "exist") => {
  const [group, setGroup] = useState(null);
  const [error, setError] = useState(null);
  const { chatType } = useContext(ChatContext);

  useEffect(() => {
    const getGroup = async () => {
      if (!groupId || chatType === "private") return null;
      if (type === "potential") return null;
      const res = await getRequest(
        `http://127.0.0.1:8000/api/groups/${groupId[0]}/`
      );
      if (res.error) {
        console.log("error");
        return setError(res.error);
      }
      setGroup(res);
    };
    getGroup();
  }, [groupId]);

  return { group, groupId, error };
};
