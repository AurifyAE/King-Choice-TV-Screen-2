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
      {/* Custom Header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "12px",
          padding: "0 4px",
          marginTop: "25px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <Box
            sx={{
              width: "4px",
              height: "20px",
              backgroundColor: "#C79324",
              borderRadius: "2px",
            }}
          />
          <Box>
            <Box
              sx={{
                color: "#C79324",
                fontSize: { xs: "12px", sm: "14px", md: "18px", lg: "1.5vw" },
                fontWeight: "700",
                letterSpacing: "0.05em",
              }}
            >
              LONDON FIX
            </Box>
          </Box>
        </Box>

        {/* Live Indicator */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            background: "rgba(34, 197, 94, 0.1)",
            border: "1px solid rgba(34, 197, 94, 0.3)",
            borderRadius: "20px",
            padding: "4px 10px",
          }}
        >
          <Box
            sx={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              backgroundColor: "#22c55e",
              animation: "pulse 2s infinite",
              "@keyframes pulse": {
                "0%": {
                  boxShadow: "0 0 0 0 rgba(34, 197, 94, 0.7)",
                },
                "70%": {
                  boxShadow: "0 0 0 10px rgba(34, 197, 94, 0)",
                },
                "100%": {
                  boxShadow: "0 0 0 0 rgba(34, 197, 94, 0)",
                },
              },
            }}
          />
          <Box
            sx={{
              color: "#22c55e",
              fontSize: "0.6rem",
              fontWeight: "600",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            LIVE
          </Box>
        </Box>
      </Box>
      <TableContainer
        component={Paper}
        sx={{
          backgroundColor: "transparent",
          borderRadius: "6px",
          border: "1px solid #D1A44F",
          overflow: "hidden",
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