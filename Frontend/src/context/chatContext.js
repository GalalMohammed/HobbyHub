import { createContext, useEffect, useState } from "react";
import { getRequest } from "../utils.js/services";

export const ChatContext = createContext();

export const ChatContextProvider = ({ children, user }) => {
  const [chats, setChats] = useState(null);
  const [isChatsLoading, setIsChatsLoading] = useState(false);
  const [chatsError, setChatsError] = useState(null);
  const [selectedChat, setSelectedChat] = useState(null);
  const [potentialChats, setPotentialChats] = useState([]);

  useEffect(() => {
    const getUserChats = async () => {
      if (user?.userId) {
        setIsChatsLoading(true);
        setChatsError(null);
        const res = await getRequest(`/api/chats/${user.userId}`);
        setIsChatsLoading(false);
        if (res.error) setChatsError(res.error);
        setChats(res);
        if (res[0]) setSelectedChat(res[0]);
      }
    };
    getUserChats();
  }, [user]);

  useEffect(() => {
    const getUsers = async () => {
      const res = await getRequest(`/api/users`);
      if (res.error) return setChatsError(res.error);
      const pChats = res?.users.filter((u) => {
        let isChatCreated = false;
        if (user?._id === u._id) return false;
        if (chats) {
          isChatCreated = chats?.some((chat) => {
            return chat.members[0] === u._id || chat.members[1] === u._id;
          });
        }
        return !isChatCreated;
      });
      console.log("pchats in context", pChats);
      setPotentialChats(pChats);
    };
    getUsers();
  }, [chats]);

  return (
    <ChatContext.Provider
      value={{
        chats,
        isChatsLoading,
        chatsError,
        selectedChat,
        setSelectedChat,
        potentialChats,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
