import { createContext, useCallback, useEffect, useState } from "react";
import { getRequest, postRequest } from "../utils.js/services";
import { io } from "socket.io-client";

export const ChatContext = createContext();

export const ChatContextProvider = ({ children, user }) => {
  const [chats, setChats] = useState(null);
  const [isChatsLoading, setIsChatsLoading] = useState(false);
  const [chatsError, setChatsError] = useState(null);
  const [selectedChat, setSelectedChat] = useState(null);
  const [potentialChats, setPotentialChats] = useState([]);
  const [messages, setMessages] = useState(null);
  const [isMessagesLoading, setIsMessagesLoading] = useState(false);
  const [messagesError, setMessagesError] = useState(null);
  const [newMessage, setNewMessage] = useState(null);
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    const socket = io("http://localhost:5000");
    setSocket(socket);
    return () => {
      socket.disconnect();
    };
  }, [user]);

  useEffect(() => {
    if (!socket) return;
    socket.emit("addNewUser", user?.userId);
    socket.on("getOnlineUsers", (res) => setOnlineUsers(res));
    return () => socket.off("getOnlineUsers");
  }, [socket]);

  useEffect(() => {
    if (!socket) return;
    const recipientId = selectedChat?.members.find((id) => id !== user?.userId);
    socket.emit("sendMessage", { ...newMessage, recipientId });
  }, [newMessage]);

  useEffect(() => {
    if (!socket) return;
    socket.on("getMessage", (message) => {
      if (selectedChat?._id !== message.chatId) return;
      setMessages((prev) => [...prev, message]);
    });
    return () => socket.off("getMessage");
  }, [socket, selectedChat]);

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

  const createChat = useCallback(async (firstId, secondId) => {
    const res = await postRequest(
      `/api/chats`,
      JSON.stringify({ firstId, secondId })
    );
    if (res.error) setChatsError(res.error);
    setChats((prev) => [...prev, res]);
  }, []);

  useEffect(() => {
    const getChatMessages = async () => {
      setIsMessagesLoading(true);
      setMessagesError(null);
      const res = await getRequest(`/api/messages/${selectedChat?._id}`);
      setIsMessagesLoading(false);
      if (res.error) setMessagesError(res.error);
      setMessages(res);
    };
    getChatMessages();
  }, [selectedChat]);

  const sendNewMessage = useCallback(async (text, sender, currentChatId) => {
    if (text) {
      const res = await postRequest(
        `/api/messages`,
        JSON.stringify({ chatId: currentChatId, senderId: sender.userId, text })
      );
      if (res.error) setChatsError(res.error);
      setNewMessage(res);
      setMessages((prev) => [...prev, res]);
    }
  }, []);

  return (
    <ChatContext.Provider
      value={{
        chats,
        isChatsLoading,
        chatsError,
        selectedChat,
        setSelectedChat,
        potentialChats,
        createChat,
        messages,
        sendNewMessage,
        newMessage,
        onlineUsers,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
