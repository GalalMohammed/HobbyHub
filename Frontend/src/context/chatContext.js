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
  const [chatType, setChatType] = useState("private");

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
        const res = await getRequest(`/api/chats/${chatType}/${user.userId}`);
        setIsChatsLoading(false);
        if (res.error) setChatsError(res.error);
        const sortedChats = res?.sort(
          (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
        );
        setChats(sortedChats);
        if (sortedChats[0]) {
          setSelectedChat(sortedChats[0]);
        }
        console.log("chats", sortedChats);
      }
    };
    getUserChats();
  }, [user, chatType]);

  useEffect(() => {
    const getUsers = async () => {
      if (user && chatType === "private") {
        const res = await getRequest(`http://127.0.0.1:8000/api/users/`);
        console.log("list users", res);
        if (res.error) return setChatsError(res.error);
        const pChats = res?.filter((u) => {
          let isChatCreated = false;
          if (user?.userId == u.id) {
            return false;
          }
          if (chats) {
            isChatCreated = chats?.some((chat) => {
              return chat.members[0] == u.id || chat.members[1] == u.id;
            });
          }
          return !isChatCreated;
        });
        setPotentialChats(pChats);
      }
    };
    getUsers();
  }, [chats]);

  useEffect(() => {
    setChats((prevChats) => {
      const updatedChats = prevChats?.map((chat) => {
        if (chat._id === selectedChat._id) {
          return { ...chat, updatedAt: new Date().toISOString() }; // Update the selected chat's updatedAt property
        }
        return chat;
      });
      return updatedChats?.sort(
        (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
      ); // Sort the updated chats
    });
  }, [newMessage]);

  const createChat = useCallback(async (firstId, secondId) => {
    const res = await postRequest(
      `/api/chats`,
      JSON.stringify({ firstId, secondId })
    );
    if (res.error) setChatsError(res.error);
    setChats((prev) => [...prev, res]);
  }, []);

  const createGroupChat = useCallback(async (groupId, members) => {
    if (chatType === "group") {
      const res = await postRequest(
        `/api/chats/group`,
        JSON.stringify({ groupId, members })
      );
      if (res.error) setChatsError(res.error);
      setChats((prev) => [...prev, res]);
      setSelectedChat(res);
      console.log("created chat: ", res);
    }
  }, []);

  useEffect(() => {
    const getGroups = async () => {
      if (user && chatType === "group") {
        const res = await getRequest(
          `http://127.0.0.1:8000/api/groups/user_groups/`
        );
        if (res.error) return setChatsError(res.error);
        console.log("groups", res);
        const groups = res?.filter((g) => {
          let isChatCreated = false;
          if (chats) {
            console.log("chat filter", chats);
            isChatCreated = chats?.some((chat) => {
              return chat.type === "group" && chat._id[0] == g.id;
            });
          }
          return !isChatCreated;
        });
        setPotentialChats(groups);
        console.log("pgchats", groups);
      }
    };
    getGroups();
  }, [chats]);

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
        chatType,
        setChatType,
        createGroupChat,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
