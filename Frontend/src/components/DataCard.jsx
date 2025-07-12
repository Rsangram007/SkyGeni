import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableRow,
  useTheme,
} from "@mui/material";

const DataCard = ({
  title,
  children,
  data,
  colorScheme = "primary",
  chartHeight = 400,
}) => {
  const theme = useTheme();

  const colorMap = {
    primary: theme.palette.primary.main,
    secondary: theme.palette.secondary.main,
    info: theme.palette.info.main,
    success: theme.palette.success.main,
    warning: theme.palette.warning.main,
    error: theme.palette.error.main,
  };

  const accentColor = colorMap[colorScheme] || theme.palette.primary.main;

  return (
    <Card
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        borderRadius: "16px",
        boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
        borderLeft: `6px solid ${accentColor}`,
        transition: "transform 0.3s, box-shadow 0.3s",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 12px 40px rgba(0,0,0,0.12)",
        },
      }}
    >
      <CardContent
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          gap: 3,
          p: 4,
        }}
      >
        <Typography
          variant="h5"
          component="div"
          sx={{
            fontWeight: 700,
            color: theme.palette.text.primary,
            display: "flex",
            alignItems: "center",
            gap: 2,
            mb: 1,
          }}
        >
          <Box
            sx={{
              width: "8px",
              height: "32px",
              backgroundColor: accentColor,
              borderRadius: "4px",
            }}
          />
          {title}
        </Typography>

        <Box
          sx={{
            height: chartHeight,
            flexGrow: 1,
            position: "relative",
            mb: 3,
          }}
        >
          {children}
        </Box>

        {data && data.length > 0 && (
          <Box
            sx={{
              mt: "auto",
              backgroundColor: theme.palette.grey[50],
              borderRadius: "12px",
              p: 2,
              border: `1px solid ${theme.palette.divider}`,
            }}
          >
            <Table
              size="medium"
              sx={{
                border: "none",
                "& .MuiTableCell-root": {
                  fontSize: "0.95rem",
                  py: 1.5,
                },
              }}
            >
              <TableBody>
                {data.map((item, index) => (
                  <TableRow
                    key={index}
                    sx={{
                      "&:last-child td": { border: 0 },
                      "&:hover": {
                        backgroundColor: theme.palette.action.hover,
                      },
                    }}
                  >
                    <TableCell
                      sx={{
                        fontWeight: 600,
                        color: theme.palette.text.primary,
                      }}
                    >
                      {item.Cust_Type || item.range || item.industry}
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{
                        fontWeight: 700,
                        color: accentColor,
                      }}
                    >
                      ${item.acv}K
                    </TableCell>
                    <TableCell align="right">
                      <Box
                        sx={{
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          backgroundColor: `${accentColor}15`,
                          color: accentColor,
                          borderRadius: "16px",
                          px: 2,
                          py: 1,
                          fontSize: "0.85rem",
                          fontWeight: 700,
                          minWidth: "60px",
                        }}
                      >
                        {Math.round(
                          (item.acv / data.reduce((sum, d) => sum + d.acv, 0)) *
                            100
                        )}
                        %
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default DataCard;
