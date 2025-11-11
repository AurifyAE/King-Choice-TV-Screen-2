import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  Typography,
  Paper,
  CircularProgress,
} from "@mui/material";
import { fetchLondonFix } from "../api/api";

const SOCKET_URL = import.meta.env.VITE_APP_SOCKET_URL || "http://localhost:8000";

const LondonFix = () => {
  const [todayFix, setTodayFix] = useState(null);
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    setLoading(true);
    try {
      const res = await fetchLondonFix();
      if (res.data.success) {
        setTodayFix(res.data.todayFix || res.data.historyFix[0] || null);
      }
    } catch (err) {
      console.error("Error fetching London Fix:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();

    const socket = io(SOCKET_URL, {
      query: { secret: import.meta.env.VITE_APP_SOCKET_SECRET },
      transports: ["websocket"],
      withCredentials: true,
    });

    socket.on("londonfix-updated", (data) => {
      setTodayFix(data.todayFix || data.londonFix || null);
    });

    return () => socket.disconnect();
  }, []);

  const getMetal = (metalType) => todayFix?.metals?.find((m) => m.metalType === metalType);

  const formatPrice = (price) =>
    price !== null && price !== undefined ? price.toFixed(2).toLocaleString() : "-";

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress sx={{ color: "#C79324" }} />
      </Box>
    );
  }

  const gold = getMetal("Gold");
  const silver = getMetal("Silver");
  const goldChange =
    gold?.amPrice && gold?.pmPrice ? (gold.pmPrice - gold.amPrice).toFixed(2) : "-";

  return (
    <Box sx={{
      backgroundColor: "transparent",
    }}>
      <TableContainer
        component={Paper}
        sx={{
          backgroundColor: "transparent",
          borderRadius: "6px",
          border: "1px solid #D1A44F",
          overflow: "hidden",
          marginTop: "15px",
        }}
      >
        <Table size="small">
          {/* Table Header */}
          <TableHead>
            <TableRow sx={{ backgroundColor: "#000000" }}>
              {["METAL", "AM FIXING", "PM FIXING", "CHANGE"].map((header) => (
                <TableCell
                  key={header}
                  sx={{
                    color: "#FFFFFF",
                    fontWeight: "bold",
                    fontSize: { xs: "12px", sm: "14px", md: "18px", lg: "1.5vw" },
                    textAlign: "center",
                    border: "1px solid #C79324",
                    padding: "10px 12px",
                    letterSpacing: "0.05em",
                    background: " #0b0b0b",
                  }}
                >
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          {/* GOLD Row */}
          <TableBody>
            <TableRow
              sx={{
                backgroundColor: "transparent",
                "&:hover": { backgroundColor: "rgba(209,164,79,0.07)" },
              }}
            >
              <TableCell
                sx={{
                  color: "#D1A44F",
                  fontWeight: "bold",
                  fontSize: { xs: "12px", sm: "14px", md: "18px", lg: "1.5vw" },
                  textAlign: "center",
                  border: "1px solid #C79324",
                  padding: "10px 12px",
                  letterSpacing: "0.05em",
                }}
              >
                GOLD
              </TableCell>

              <TableCell sx={{ border: "1px solid #C79324", textAlign: "center", padding: "10px 12px" }}>
                <Typography
                  sx={{
                    color: "#C79324",
                    fontWeight: "bold",
                    fontSize: { xs: "12px", sm: "14px", md: "18px", lg: "1.5vw" },
                    fontFamily: "monospace",
                  }}
                >
                  {gold ? formatPrice(gold.amPrice) : "-"}
                </Typography>
              </TableCell>

              <TableCell sx={{ border: "1px solid #C79324", textAlign: "center", padding: "10px 12px" }}>
                <Typography
                  sx={{
                    color: "#C79324",
                    fontWeight: "bold",
                    fontSize: { xs: "12px", sm: "14px", md: "18px", lg: "1.5vw" },
                    fontFamily: "monospace",
                  }}
                >
                  {gold ? formatPrice(gold.pmPrice) : "-"}
                </Typography>
              </TableCell>

              <TableCell sx={{ border: "1px solid #C79324", textAlign: "center", padding: "10px 12px" }}>
                <Typography
                  sx={{
                    color:
                      goldChange !== "-" && parseFloat(goldChange) > 0
                        ? "#4CAF50"
                        : goldChange !== "-" && parseFloat(goldChange) < 0
                          ? "#F44336"
                          : "#FFFFFF",
                          fontSize: { xs: "12px", sm: "14px", md: "18px", lg: "1.5vw" },
                    fontWeight: "bold",
                    fontFamily: "monospace",
                  }}
                >
                  {goldChange !== "-" && parseFloat(goldChange) > 0 ? "+" : ""}
                  {goldChange}
                </Typography>
              </TableCell>
            </TableRow>
          </TableBody>

          {/* SILVER Row */}
          <TableBody>
            <TableRow
              sx={{
                backgroundColor: "transparent",
                "&:hover": { backgroundColor: "rgba(209,164,79,0.07)" },
              }}
            >
              <TableCell
                sx={{
                  color: "#D1A44F",
                  fontWeight: "bold",
                  fontSize: { xs: "12px", sm: "14px", md: "18px", lg: "1.5vw" },
                  textAlign: "center",
                  border: "1px solid #C79324",
                  padding: "10px 12px",
                  letterSpacing: "0.05em",
                }}
              >
                SILVER
              </TableCell>

              <TableCell sx={{ border: "1px solid #C79324", textAlign: "center", padding: "10px 12px" }}>
                <Typography
                  sx={{
                    color: "#C79324",
                    fontWeight: "bold",
                    fontSize: { xs: "12px", sm: "14px", md: "18px", lg: "1.5vw" },
                    fontFamily: "monospace",
                  }}
                >
                  {silver ? formatPrice(silver.noonPrice) : "-"}
                </Typography>
              </TableCell>

              <TableCell
                sx={{
                  border: "1px solid #C79324",
                  textAlign: "center",
                  padding: "10px 12px",
                }}
              >
                <Typography
                  sx={{
                    color: "#FFFFFF",
                    fontSize: { xs: "12px", sm: "14px", md: "18px", lg: "1.5vw" },
                    fontWeight: "bold",
                    fontFamily: "monospace",
                  }}
                >
                  -
                </Typography>
              </TableCell>

              <TableCell
                sx={{
                  border: "1px solid #C79324",
                  textAlign: "center",
                  padding: "10px 12px",
                }}
              >
                <Typography
                  sx={{
                    color: "#FFFFFF",
                    fontSize: { xs: "12px", sm: "14px", md: "18px", lg: "1.5vw" },
                    fontWeight: "bold",
                    fontFamily: "monospace",
                  }}
                >
                  -
                </Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default LondonFix;