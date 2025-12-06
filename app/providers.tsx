"use client";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import React from "react";

const theme = createTheme();

export function Providers({ children }: { children: React.ReactNode }) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
