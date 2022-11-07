import React, { useEffect } from "react";
import Select from "./BasicSelect";
import Container from "@mui/material/Container";
import axios from "axios";
import authHeader from "../services/auth-header";
import { useState } from "react";
import GlobalCard from "./GlobalCard";

const Dashboard = () => {
  return (
    <Container maxWidth="lg">
      <GlobalCard />
    </Container>
  );
};

export default Dashboard;
