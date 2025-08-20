import React from "react";
import { Container, Box } from "@mui/material";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Container maxWidth="md">
      <Box sx={{ paddingY: 4 }}>{children}</Box>
    </Container>
  );
};

export default Layout;
