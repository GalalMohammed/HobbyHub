import React from "react";
import Layout from "./Layout";
import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Group from "./Group";
import GroupPosts from "./GroupPosts";
import MyMessages from "../pages/MyMessages";

const MainLayout = () => {
  return (
    <div>
      <Layout>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/groups/group/:groupId" element={<Group />} />
          <Route path="/groups/group/:groupId/posts" element={<GroupPosts />} />
          <Route path="/chats" element={<MyMessages />} />
        </Routes>
      </Layout>
    </div>
  );
};

export default MainLayout;
