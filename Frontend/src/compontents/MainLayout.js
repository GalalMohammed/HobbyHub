import React from "react";
import Layout from "./Layout";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Group from "./Group";
import GroupPosts from "./GroupPosts";

const MainLayout = () => {
  return (
    <div>
      <Layout>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/groups/group/:groupId" element={<Group />} />
          <Route path="/groups/group/:groupId/posts" element={<GroupPosts />} />
        </Routes>
      </Layout>
    </div>
  );
};

export default MainLayout;
