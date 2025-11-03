import React from "react";
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
} from "@mui/material";
import { useSpotRate } from "../context/SpotRateContext";

const CommodityTable = ({ commodities }) => {
  const { goldData, silverData } = useSpotRate();

  // Helper function to get bid and ask values based on metal type
  const getBidAskValues = (metal) => {
    if (
      metal === "gold" ||
      metal === "gold kilobar" ||
      metal === "gold ten tola"
    ) {
      return {
        bid: parseFloat(goldData.bid) || 0,
        ask: parseFloat(goldData.ask) || 0,
      };
    } else if (metal === "silver") {
      return {
        bid: parseFloat(silverData.bid) || 0,
        ask: parseFloat(silverData.ask) || 0,
      };
    }
    return { bid: 0, ask: 0 };
  };

  // Helper function to calculate purity power
  const calculatePurityPower = (purityInput) => {
    if (!purityInput || isNaN(purityInput)) return 1;
    return purityInput / Math.pow(10, purityInput.toString().length);
  };

  // Helper function to conditionally round values
  const formatValue = (value, weight) => {
    const formattedValue =
      weight === "GM"
        ? value.toFixed(2).toLocaleString()
        : Math.round(value).toLocaleString();
    return formattedValue;
  };

  // Helper function to get the correct metal name
  const getMetalName = (metal) => {
    switch (metal.toLowerCase()) {
      case "gold":
        return "GOLD";
      case "gold kilobar":
        return "GOLD";
      case "gold ten tola":
        return "GOLD";
      default:
        return metal.charAt(0).toUpperCase() + metal.slice(1);
    }
  };

  // --- Start of UI-specific calculations (for change/diff values) ---
  const getChangeValue = (metalType) => {
    if (metalType === "gold 9999 kg") return { value: 3.50, isPositive: true };
    if (metalType === "gold 9995 kg") return { value: 32.30, isPositive: true };
    if (metalType === "gold ten tola") return { value: 3.00, isPositive: true };
    return { value: 0, isPositive: true };
  };
  // --- End of UI-specific calculations ---

  return (
    <Box sx={{
      backgroundColor: "transparent",
      marginTop: "10px",
    }}>
      {/* Commodity Table */}
      <TableContainer
        component={Paper}
        sx={{
          backgroundColor: "transparent",
          borderRadius: "5px",
          border: "1px solid #C79324",
          boxShadow: "none",
        }}
      >
        <Table size="small">
          {/* Table Head */}
          <TableHead>
            <TableRow
              sx={{
                backgroundColor: "#000000",
              }}
            >
              <TableCell
                sx={{
                  color: "#FFFFFF",
                  fontWeight: "bold",
                  fontSize: { xs: "10px", sm: "11px", md: "15px", lg: "1.2vw" },
                  textAlign: "center",
                  border: "1px solid #C79324",
                  backgroundColor: "transparent",
                  padding: "4px 6px",
                }}
              >
                COMMODITY
              </TableCell>
              <TableCell
                sx={{
                  color: "#FFFFFF",
                  fontWeight: "bold",
                  fontSize: { xs: "10px", sm: "11px", md: "15px", lg: "1.2vw" },
                  textAlign: "center",
                  border: "1px solid #C79324",
                  backgroundColor: "transparent",
                  padding: "4px 6px",
                }}
              >
                BID (AED)
              </TableCell>
              <TableCell
                sx={{
                  color: "#FFFFFF",
                  fontWeight: "bold",
                  fontSize: { xs: "10px", sm: "11px", md: "15px", lg: "1.2vw" },
                  textAlign: "center",
                  border: "1px solid #C79324",
                  backgroundColor: "transparent",
                  padding: "4px 6px",
                }}
              >
                ASK (AED)
              </TableCell>
            </TableRow>
          </TableHead>

          {/* Table Body */}
          <TableBody>
            {commodities.map((commodity, index) => {
              const { bid, ask } = getBidAskValues(commodity.metal.toLowerCase());
              const {
                unit,
                weight,
                buyCharge,
                sellCharge,
                buyPremium,
                sellPremium,
                purity,
              } = commodity;

              const unitMultiplier =
                {
                  GM: 1,
                  KG: 1000,
                  TTB: 116.64,
                  TOLA: 11.664,
                  OZ: 31.1034768,
                }[weight] || 1;

              const purityValue = parseFloat(purity) || 0;
              const purityPower = calculatePurityPower(purityValue);
              const buyChargeValue = parseFloat(buyCharge) || 0;
              const sellChargeValue = parseFloat(sellCharge) || 0;
              const buyPremiumValue = parseFloat(buyPremium) || 0;
              const sellPremiumValue = parseFloat(sellPremium) || 0;

              const biddingValue = bid + buyPremiumValue;
              const askingValue = ask + sellPremiumValue;
              const biddingPrice = (biddingValue / 31.103) * 3.674; // Assuming conversion to AED
              const askingPrice = (askingValue / 31.103) * 3.674; // Assuming conversion to AED

              const buyPrice =
                biddingPrice * unitMultiplier * unit * purityPower +
                buyChargeValue;
              const sellPrice =
                askingPrice * unitMultiplier * unit * purityPower +
                sellChargeValue;

              const changeInfo = getChangeValue(
                `${commodity.metal.toLowerCase()} ${purity} ${weight}`.trim()
              );

              return (
                <TableRow
                  key={index}
                  sx={{
                    backgroundColor: "transparent",
                  }}
                >
                  {/* Commodity Name */}
                  <TableCell
                    sx={{
                      color: "#C79324",
                      fontWeight: "bold",
                      fontSize: { xs: "10px", sm: "11px", md: "15px", lg: "1.2vw" },
                      textAlign: "center",
                      border: "1px solid #C79324",
                      backgroundColor: "transparent",
                      padding: "4px 6px",
                    }}
                  >
                    {getMetalName(commodity.metal)}{" "}
                    {commodity.metal.toLowerCase() === "gold ten tola"
                      ? "TEN TOLA"
                      : purity}{" "}
                    {weight}
                  </TableCell>

                  {/* BID Price */}
                  <TableCell
                    sx={{
                      color: "#C79324",
                      fontWeight: "bold",
                      fontSize: { xs: "10px", sm: "11px", md: "15px", lg: "1.2vw" },
                      textAlign: "center",
                      border: "1px solid #C79324",
                      backgroundColor: "transparent",
                      padding: "4px 6px",
                    }}
                  >
                    {formatValue(buyPrice, weight)}
                  </TableCell>

                  {/* ASK Price */}
                  <TableCell
                    sx={{
                      color: "#C79324",
                      fontWeight: "bold",
                      fontSize: { xs: "10px", sm: "11px", md: "15px", lg: "1.2vw" },
                      textAlign: "center",
                      border: "1px solid #C79324",
                      backgroundColor: "transparent",
                      padding: "4px 6px",
                    }}
                  >
                    {formatValue(sellPrice, weight)}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default CommodityTable;