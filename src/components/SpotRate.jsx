import React from "react";
import { Box, Typography, Grid } from "@mui/material";
import { useSpotRate } from "../context/SpotRateContext";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

const SpotRate = () => {
  const { goldData, silverData } = useSpotRate();

  const getBackgroundColor = (change) => {
    if (change === "up") return "linear-gradient(135deg, #22c55e, #16a34a)";
    if (change === "down") return "linear-gradient(135deg, #ef4444, #dc2626)";
    return "linear-gradient(135deg, #374151, #1f2937)";
  };

  const getChangeIcon = (change) => {
    if (change === "up")
      return <ArrowUpwardIcon sx={{ fontSize: "0.8rem", marginLeft: "4px" }} />;
    if (change === "down")
      return <ArrowDownwardIcon sx={{ fontSize: "0.8rem", marginLeft: "4px" }} />;
    return null;
  };

  const renderCompactSpotSection = (metal, data, isPrimary = false) => (
    <Box
      sx={{
        border: "2px solid #C79324",
        borderRadius: "7px",
        padding: "22px",
        height: "100%",
        transition: "all 0.3s ease",
        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow: "0 6px 18px rgba(209, 164, 79, 0.15)",
        },
      }}
    >
      {/* Metal Header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "8px",
        }}
      >
        <Typography
          sx={{
            color: "#C79324",
            fontSize: isPrimary ? "1.5rem" : "1.35rem",
            fontWeight: "700",
            textTransform: "uppercase",
            letterSpacing: "0.06em",
          }}
        >
          {metal}
        </Typography>
        <Typography
          sx={{
            color: "rgba(255, 255, 255, 0.6)",
            fontSize: "1.1rem",
            fontWeight: "500",
          }}
        >
          USD/OZ
        </Typography>
      </Box>

      {/* BID ASK Row */}
      <Grid container spacing={1} sx={{ marginBottom: "10px" }}>
        {/* BID */}
        <Grid item xs={6}>
          <Box sx={{ display: "flex", alignItems: "center", gap: "6px" }}>
            {/* Vertical BID text */}
            <Typography
              sx={{
                color: "rgba(255, 255, 255, 0.8)",
                fontSize: "0.85rem",
                fontWeight: "600",
                writingMode: "vertical-rl",
                textOrientation: "mixed",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              BID
            </Typography>
            <Box
              sx={{
                background: getBackgroundColor(data.bidChanged),
                borderRadius: "6px",
                padding: "8px 10px",
                textAlign: "center",
                border: "1px solid rgba(209, 164, 79, 0.3)",
                flex: 1,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Typography
                  sx={{
                    color: "#FFFFFF",
                    fontSize: isPrimary ? "2rem" : "2rem",
                    fontWeight: "bold",
                    fontFamily: "monospace",
                  }}
                >
                  {data.bid}
                </Typography>
                {getChangeIcon(data.bidChanged)}
              </Box>
            </Box>
          </Box>
        </Grid>

        {/* ASK */}
        <Grid item xs={6}>
          <Box sx={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <Typography
              sx={{
                color: "rgba(255, 255, 255, 0.8)",
                fontSize: "0.85rem",
                fontWeight: "600",
                writingMode: "vertical-rl",
                textOrientation: "mixed",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              ASK
            </Typography>
            <Box
              sx={{
                background: getBackgroundColor(data.bidChanged),
                borderRadius: "6px",
                padding: "8px 10px",
                textAlign: "center",
                border: "1px solid rgba(209, 164, 79, 0.3)",
                flex: 1,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Typography
                  sx={{
                    color: "#FFFFFF",
                    fontSize: isPrimary ? "2rem" : "2rem",
                    fontWeight: "bold",
                    fontFamily: "monospace",
                  }}
                >
                  {data.ask}
                </Typography>
                {getChangeIcon(data.bidChanged)}
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>

      {/* HIGH LOW Row */}
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              background: "rgba(34, 197, 94, 0.12)",
              border: "1px solid rgba(34, 197, 94, 0.35)",
              borderRadius: "5px",
              padding: "5px 6px",
              textAlign: "center",
            }}
          >
            <Typography
              sx={{
                color: "rgba(34, 197, 94, 0.9)",
                fontSize: "1rem",
                fontWeight: "600",
                textTransform: "uppercase",
              }}
            >
              HIGH
            </Typography>
            <Typography
              sx={{
                color: "#22c55e",
                fontSize: "1.2rem",
                fontWeight: "bold",
                fontFamily: "monospace",
              }}
            >
              {data.high}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              background: "rgba(239, 68, 68, 0.12)",
              border: "1px solid rgba(239, 68, 68, 0.35)",
              borderRadius: "5px",
              padding: "5px 6px",
              textAlign: "center",
            }}
          >
            <Typography
              sx={{
                color: "rgba(239, 68, 68, 0.9)",
                fontSize: "1.2rem",
                fontWeight: "600",
                textTransform: "uppercase",
              }}
            >
              LOW
            </Typography>
            <Typography
              sx={{
                color: "#ef4444",
                fontSize: "1rem",
                fontWeight: "bold",
                fontFamily: "monospace",
              }}
            >
              {data.low}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );

  return (
    <Box sx={{ backgroundColor: "transparent", marginTop: "4px" }}>
      {/* Custom Header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "12px",
          padding: "0 4px",
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
              SPOT RATE
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
      <Grid container spacing={1.5} sx={{ maxWidth: "1000px" }}>
        <Grid item xs={12} sm={6}>
          {renderCompactSpotSection("GOLD", goldData, true)}
        </Grid>
        <Grid item xs={12} sm={6}>
          {renderCompactSpotSection("SILVER", silverData, false)}
        </Grid>
      </Grid>
    </Box>
  );
};

export default SpotRate;