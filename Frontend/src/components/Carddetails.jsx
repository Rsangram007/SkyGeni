// Team Performance Card
import React from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  useTheme,
 
} from "@mui/material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";

export const TeamPerformanceCard = ({ data, totalACV }) => {
  const theme = useTheme();

  return (
    <Card sx={{ mb: 4 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Team Performance Details
        </Typography>
        <Grid container spacing={2}>
          {data.map((team, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Box
                sx={{
                  p: 2,
                  border: `1px solid ${theme.palette.divider}`,
                  borderRadius: 1,
                }}
              >
                <Typography variant="subtitle1" fontWeight="bold">
                  {team.Team}
                </Typography>
                <Typography>ACV: ${(team.acv / 1000).toFixed(1)}K</Typography>
                <Typography>Deals: {team.count}</Typography>
                <Typography>
                  Avg Deal Size: ${(team.acv / team.count / 1000).toFixed(1)}K
                </Typography>
                <Typography>
                  Share: {((team.acv / totalACV) * 100).toFixed(1)}%
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
};

// Customer Type Details Card
export const CustomerTypeDetailsCard = ({ data, totalACV }) => {
  const theme = useTheme();

  return (
    <Card sx={{ mb: 4 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Customer Type Details
        </Typography>
        <Grid container spacing={2}>
          {data.map((type, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Box
                sx={{
                  p: 2,
                  border: `1px solid ${theme.palette.divider}`,
                  borderRadius: 1,
                }}
              >
                <Typography variant="subtitle1" fontWeight="bold">
                  {type.Cust_Type}
                </Typography>
                <Typography>ACV: ${(type.acv / 1000).toFixed(1)}K</Typography>
                <Typography>Customers: {type.count}</Typography>
                <Typography>
                  Avg Value: ${(type.acv / type.count / 1000).toFixed(1)}K
                </Typography>
                <Typography>
                  Share: {((type.acv / totalACV) * 100).toFixed(1)}%
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
};

// ACV Range Details Card
export const ACVRangeDetailsCard = ({ data, totalACV }) => {
  const theme = useTheme();

  return (
    <Card sx={{ mb: 4 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          ACV Range Details
        </Typography>
        <Grid container spacing={2}>
          {data.map((range, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Box
                sx={{
                  p: 2,
                  border: `1px solid ${theme.palette.divider}`,
                  borderRadius: 1,
                }}
              >
                <Typography variant="subtitle1" fontWeight="bold">
                  {range.ACV_Range}
                </Typography>
                <Typography>
                  Total ACV: ${(range.acv / 1000).toFixed(1)}K
                </Typography>
                <Typography>Deals: {range.count}</Typography>
                <Typography>
                  Avg Deal Size: ${(range.acv / range.count / 1000).toFixed(1)}K
                </Typography>
                <Typography>
                  Share: {((range.acv / totalACV) * 100).toFixed(1)}%
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
};

// Industry Details Card
export const IndustryDetailsCard = ({ data, totalACV }) => {
  const theme = useTheme();

  return (
    <Card sx={{ mb: 4 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Industry Breakdown Details
        </Typography>
        <Grid container spacing={2}>
          {data.map((industry, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Box
                sx={{
                  p: 2,
                  border: `1px solid ${theme.palette.divider}`,
                  borderRadius: 1,
                }}
              >
                <Typography variant="subtitle1" fontWeight="bold">
                  {industry.Acct_Industry}
                </Typography>
                <Typography>
                  ACV: ${(industry.acv / 1000).toFixed(1)}K
                </Typography>
                <Typography>Deals: {industry.count}</Typography>
                <Typography>
                  Avg Deal Size: $
                  {(industry.acv / industry.count / 1000).toFixed(1)}K
                </Typography>
                <Typography>
                  Share: {((industry.acv / totalACV) * 100).toFixed(1)}%
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
};




export const SectionSummary = ({ title, stats }) => {
  const theme = useTheme();
  
  return (
    <Card sx={{ 
      mb: 4,
      borderRadius: 3,
      boxShadow: theme.shadows[3],
      background: `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.background.paper} 100%)`,
      border: `1px solid ${theme.palette.divider}`
    }}>
      <CardContent>
        <Typography variant="h6" gutterBottom sx={{ 
          fontWeight: 700,
          color: theme.palette.primary.dark,
          display: 'flex',
          alignItems: 'center',
          gap: 1
        }}>
          {title} Summary
        </Typography>
        <Grid container spacing={2}>
          {stats.map((stat, index) => (
            <Grid item xs={6} sm={3} key={index}>
              <Box sx={{ 
                textAlign: "center",
                p: 2,
                backgroundColor: theme.palette.background.paper,
                borderRadius: 2,
                boxShadow: theme.shadows[1],
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
              }}>
                <Typography variant="subtitle2" color="text.secondary" sx={{ 
                  fontWeight: 600,
                  mb: 1
                }}>
                  {stat.label}
                </Typography>
                <Typography variant="h5" fontWeight="bold" sx={{
                  color: theme.palette.primary.main
                }}>
                  {stat.value}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
};

export const DataTable = ({ data, columns }) => {
  const theme = useTheme();
  
  return (
    <Card sx={{ 
      mt: 4,
      borderRadius: 3,
      boxShadow: theme.shadows[3],
      border: `1px solid ${theme.palette.divider}`
    }}>
      <CardContent>
        <Typography variant="h6" gutterBottom sx={{
          fontWeight: 700,
          color: theme.palette.primary.dark,
          mb: 3,
          display: 'flex',
          alignItems: 'center',
          gap: 1
        }}>
          Detailed Data View
        </Typography>
        <Box sx={{ 
          overflowX: "auto",
          borderRadius: 2,
          border: `1px solid ${theme.palette.divider}`
        }}>
          <table style={{ 
            width: "100%", 
            borderCollapse: "collapse",
            fontFamily: theme.typography.fontFamily
          }}>
            <thead>
              <tr>
                {columns.map((col, index) => (
                  <th
                    key={index}
                    style={{
                      textAlign: "left",
                      padding: "12px 16px",
                      borderBottom: `2px solid ${theme.palette.primary.main}`,
                      backgroundColor: theme.palette.primary.light,
                      color: theme.palette.primary.contrastText,
                      fontWeight: 600,
                      fontSize: '0.875rem'
                    }}
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, rowIndex) => (
                <tr 
                  key={rowIndex}
                  style={{
                    backgroundColor: rowIndex % 2 === 0 
                      ? theme.palette.background.paper 
                      : theme.palette.grey[50],
                    transition: 'background-color 0.2s',
                    '&:hover': {
                      backgroundColor: theme.palette.action.hover
                    }
                  }}
                >
                  {columns.map((col, colIndex) => (
                    <td
                      key={colIndex}
                      style={{
                        padding: "12px 16px",
                        borderBottom: `1px solid ${theme.palette.divider}`,
                        color: theme.palette.text.primary,
                        fontSize: '0.875rem'
                      }}
                    >
                      {col === "acv" || col === "ACV"
                        ? `$${(row[col] / 1000).toFixed(1)}K`
                        : row[col]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </Box>
      </CardContent>
    </Card>
  );
};



export   const SummaryCard = ({ title, value, change, icon, color }) => {
    const theme = useTheme();

    return (
      <Card
        sx={{
          borderRadius: "16px",
          boxShadow: theme.shadows[2],
          border: "none",
          height: "100%",
          background: theme.palette.background.paper,
          transition: "transform 0.2s, box-shadow 0.2s",
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: theme.shadows[4],
          },
        }}
      >
        <CardContent sx={{ p: 3, height: "100%" }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              sx={{ fontWeight: 600 }}
            >
              {title}
            </Typography>
            <Box
              sx={{
                width: 48,
                height: 48,
                bgcolor: `${color}10`,
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: color,
              }}
            >
              {React.cloneElement(icon, { fontSize: "large" })}
            </Box>
          </Box>

          <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>
            {value}
          </Typography>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              color:
                change >= 0
                  ? theme.palette.success.main
                  : theme.palette.error.main,
              backgroundColor:
                change >= 0
                  ? `${theme.palette.success.main}10`
                  : `${theme.palette.error.main}10`,
              borderRadius: "12px",
              px: 2,
              py: 1,
              width: "fit-content",
              mt: 2,
            }}
          >
            {change >= 0 ? (
              <TrendingUpIcon sx={{ fontSize: "1.2rem", mr: 1 }} />
            ) : (
              <TrendingDownIcon sx={{ fontSize: "1.2rem", mr: 1 }} />
            )}
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              {change >= 0 ? "+" : ""}
              {Math.abs(change).toFixed(1)}% vs last quarter
            </Typography>
          </Box>
        </CardContent>
      </Card>
    );
  };