import React from "react";
import { Box, Typography } from "@mui/material";

const NewsTicker = ({ newsItems }) => {
  return (
    <Box
      sx={{
        boxShadow: "2px 2px 10px #424242",
        border: "2px solid #C79324",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "10px",
        height: "35px",
        marginTop: "15px",
      }}
    >
      <Typography
        className="flex justify-center items-center"
        sx={{
          background: "linear-gradient(to right, #C79324 0%, #011633 100%)",
          color: "white",
          fontWeight: "bold",
          textAlign: "center",
          fontSize: "1.1vw",
          width: "250px",
          height: "100%",
          borderRadius: "8px",
        }}
      >
        KING CHOICE
      </Typography>

      <Box
        sx={{
          width: "100%",
          overflow: "hidden",
          whiteSpace: "nowrap",
          position: "relative",
        }}
      >
        <Box
          component="div"
          sx={{
            display: "inline-block",
            animation: "scroll 40s linear infinite",
            color: "white",
            fontSize: "1.2vw",
            textAlign: "center",
          }}
        >
          {newsItems.map((item, index) => (
            <Typography
              key={index}
              component="span"
              sx={{
                marginRight: "4vw",
                display: "inline-block",
                color: "white",
                fontSize: "1.2vw",
              }}
            >
              {item.description}
            </Typography>
          ))}
        </Box>
        <style>
          {`
            @keyframes scroll {
              0% { transform: translateX(100%); }
              100% { transform: translateX(-100%); }
            }
          `}
        </style>
      </Box>
    </Box>
  );
};

export default NewsTicker;
