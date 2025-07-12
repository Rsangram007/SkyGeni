import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Tabs,
  Tab,
  Select,
  MenuItem,
  FormControl,
  Button,
  useTheme,
  useMediaQuery,
  CircularProgress,
} from "@mui/material";
import {
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  People as UsersIcon,
  ShowChart as ChartLineIcon,
  Equalizer as GrowthIcon,
  Download as DownloadIcon,
} from "@mui/icons-material";
import BarChart from "./BarChart";
import DoughnutChart from "./DoughnutChart";
import { getUniqueQuarters } from "../utils/helpers";
import {
  TeamPerformanceCard,
  CustomerTypeDetailsCard,
  ACVRangeDetailsCard,
  IndustryDetailsCard,
  SectionSummary,
  DataTable,
  SummaryCard
} from "./Carddetails";

 

const Dashboard = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [activeTab, setActiveTab] = useState(0);
  const [selectedQuarter, setSelectedQuarter] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Get data from Redux store
  const teamData = useSelector((state) => state.team.data);
  const customerType = useSelector((state) => state.customerType.data);
  const acvRange = useSelector((state) => state.acvRange.data);
  const accountIndustry = useSelector((state) => state.accountIndustry.data);

  const filterByQuarter = (data) => {
    if (!data || data.length === 0) return [];
    return selectedQuarter
      ? data.filter((item) => item.closed_fiscal_quarter === selectedQuarter)
      : data;
  };

  const getPreviousQuarterData = (data, currentQuarter) => {
    if (!currentQuarter || !data || data.length === 0) return [];
    const quarters = getUniqueQuarters([
      ...teamData,
      ...customerType,
      ...acvRange,
      ...accountIndustry,
    ]);
    const currentIndex = quarters.indexOf(currentQuarter);
    if (currentIndex <= 0) return [];
    const prevQuarter = quarters[currentIndex - 1];
    return data.filter((item) => item.closed_fiscal_quarter === prevQuarter);
  };

  const allQuarters = React.useMemo(
    () =>
      getUniqueQuarters([
        ...teamData,
        ...customerType,
        ...acvRange,
        ...accountIndustry,
      ]),
    [teamData, customerType, acvRange, accountIndustry]
  );

  const currentQuarterData = filterByQuarter(teamData);
  const prevQuarterData = getPreviousQuarterData(teamData, selectedQuarter);

  const totalACV = currentQuarterData.reduce((sum, d) => sum + d.acv, 0);
  const prevTotalACV = prevQuarterData.reduce((sum, d) => sum + d.acv, 0);
  const acvChange = prevTotalACV
    ? ((totalACV - prevTotalACV) / prevTotalACV) * 100
    : 0;

  const totalCustomers = currentQuarterData.reduce(
    (sum, d) => sum + d.count,
    0
  );
  const prevTotalCustomers = prevQuarterData.reduce(
    (sum, d) => sum + d.count,
    0
  );
  const customerChange = prevTotalCustomers
    ? ((totalCustomers - prevTotalCustomers) / prevTotalCustomers) * 100
    : 0;

  const avgDealSize = totalACV / totalCustomers;
  const prevAvgDealSize = prevTotalACV / prevTotalCustomers;
  const dealSizeChange = prevAvgDealSize
    ? ((avgDealSize - prevAvgDealSize) / prevAvgDealSize) * 100
    : 0;

  useEffect(() => {
    if (!selectedQuarter && teamData.length > 0) {
      const quarters = getUniqueQuarters([
        ...teamData,
        ...customerType,
        ...acvRange,
        ...accountIndustry,
      ]);
      if (quarters.length > 0) {
        setSelectedQuarter(quarters[quarters.length - 1]);
      }
      setIsLoading(false);
    }
  }, [teamData, customerType, acvRange, accountIndustry, selectedQuarter]);

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }







  return (
    <Box
      component="main"
      sx={{ backgroundColor: theme.palette.grey[50], minHeight: "100vh", p: 0 }}
    >
      {/* Top Bar */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: 3,
          backgroundColor: theme.palette.background.paper,
          boxShadow: theme.shadows[1],
          mb: 3,
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            color: theme.palette.primary.main,
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Box
            component="span"
            sx={{
              width: 32,
              height: 32,
              bgcolor: theme.palette.primary.main,
              borderRadius: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
            }}
          >
            S
          </Box>
          Sales Analytics Dashboard
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <Select
              value={selectedQuarter}
              onChange={(e) => setSelectedQuarter(e.target.value)}
              displayEmpty
              inputProps={{ "aria-label": "Select quarter" }}
              sx={{
                backgroundColor: theme.palette.background.paper,
                borderRadius: 2,
                "& .MuiSelect-select": { py: 1 },
              }}
            >
              {allQuarters.map((quarter, index) => (
                <MenuItem key={`quarter-${index}`} value={quarter}>
                  {quarter}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button
            variant="contained"
            color="primary"
            startIcon={<DownloadIcon />}
            sx={{ borderRadius: 2, textTransform: "none", px: 3, py: 1 }}
          >
            Export
          </Button>
        </Box>
      </Box>

      {/* Main Content */}
      <Box sx={{ px: 4, maxWidth: "1800px", margin: "0 auto" }}>
        {/* Summary Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} lg={3}>
            <SummaryCard
              title="Total ACV"
              value={`$${(totalACV / 1000).toFixed(1)}K`}
              change={acvChange}
              icon={<TrendingUpIcon />}
              color={theme.palette.primary.main}
            />
          </Grid>
          <Grid item xs={12} sm={6} lg={3}>
            <SummaryCard
              title="Total Deals"
              value={totalCustomers}
              change={customerChange}
              icon={<UsersIcon />}
              color={theme.palette.success.main}
            />
          </Grid>
          <Grid item xs={12} sm={6} lg={3}>
            <SummaryCard
              title="Avg Deal Size"
              value={`$${(avgDealSize / 1000).toFixed(1)}K`}
              change={dealSizeChange}
              icon={<ChartLineIcon />}
              color={theme.palette.secondary.main}
            />
          </Grid>
          <Grid item xs={12} sm={6} lg={3}>
            <SummaryCard
              title="Growth Rate"
              value={`${acvChange.toFixed(1)}%`}
              change={acvChange}
              icon={<GrowthIcon />}
              color={theme.palette.warning.main}
            />
          </Grid>
        </Grid>

        {/* Main Chart Area */}
        <Card
          sx={{
            borderRadius: 3,
            boxShadow: theme.shadows[3],
            border: `1px solid ${theme.palette.divider}`,
            mb: 4,
          }}
        >
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={activeTab}
              onChange={(e, newValue) => setActiveTab(newValue)}
              variant={isMobile ? "scrollable" : "standard"}
              scrollButtons="auto"
              aria-label="Dashboard tabs"
              sx={{
                px: 3,
                "& .MuiTabs-indicator": {
                  height: 4,
                  borderRadius: "4px 4px 0 0",
                },
              }}
            >
              <Tab
                label="Team Performance"
                sx={{
                  textTransform: "none",
                  fontWeight: 600,
                  fontSize: "0.95rem",
                  py: 2,
                  px: 3,
                  minWidth: "unset",
                }}
              />
              <Tab
                label="Customer Analytics"
                sx={{
                  textTransform: "none",
                  fontWeight: 600,
                  fontSize: "0.95rem",
                  py: 2,
                  px: 3,
                  minWidth: "unset",
                }}
              />
              <Tab
                label="Revenue Analysis"
                sx={{
                  textTransform: "none",
                  fontWeight: 600,
                  fontSize: "0.95rem",
                  py: 2,
                  px: 3,
                  minWidth: "unset",
                }}
              />
              <Tab
                label="Industry Breakdown"
                sx={{
                  textTransform: "none",
                  fontWeight: 600,
                  fontSize: "0.95rem",
                  py: 2,
                  px: 3,
                  minWidth: "unset",
                }}
              />
            </Tabs>
          </Box>

          <CardContent sx={{ p: 0 }}>
            {/* Team Performance Tab */}
            {activeTab === 0 && (
              <Grid container>
                <Grid item xs={12} lg={8}>
                  <Box
                    sx={{
                      p: 4,
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      borderRight: {
                        lg: `1px solid ${theme.palette.divider}`,
                        xs: "none",
                      },
                      borderBottom: {
                        lg: "none",
                        xs: `1px solid ${theme.palette.divider}`,
                      },
                    }}
                    aria-label="ACV by Team"
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        mb: 3,
                        fontWeight: 700,
                        color: theme.palette.text.primary,
                      }}
                    >
                      ACV by Team
                    </Typography>
                    <Box
                      sx={{
                        flexGrow: 1,
                        minHeight: 500,
                        position: "relative",
                        width: "140%",
                      }}
                    >
                      {filterByQuarter(teamData).length > 0 ? (
                        <BarChart
                          data={filterByQuarter(teamData)}
                          colorScheme="purple"
                        />
                      ) : (
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            height: "100%",
                          }}
                        >
                          <Typography variant="body1">
                            No data available for selected quarter
                          </Typography>
                        </Box>
                      )}
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} lg={4}>
                  <Box
                    sx={{
                      p: 4,
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                    aria-label="Team Distribution"
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        mb: 3,
                        fontWeight: 700,
                        color: theme.palette.text.primary,
                      }}
                    >
                      Team Distribution
                    </Typography>
                    <Box
                      sx={{
                        flexGrow: 1,
                        minHeight: 500,
                        position: "relative",
                        width: "100%",
                      }}
                    >
                      {filterByQuarter(teamData).length > 0 ? (
                        <DoughnutChart
                          data={filterByQuarter(teamData)}
                          colorScheme="blue"
                          size={500}
                        />
                      ) : (
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            height: "100%",
                          }}
                        >
                          <Typography variant="body1">
                            No data available for selected quarter
                          </Typography>
                        </Box>
                      )}
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            )}

            {/* Customer Analytics Tab */}
            {activeTab === 1 && (
              <Grid container>
                <Grid item xs={12} lg={8}>
                  <Box
                    sx={{
                      p: 4,
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      borderRight: {
                        lg: `1px solid ${theme.palette.divider}`,
                        xs: "none",
                      },
                      borderBottom: {
                        lg: "none",
                        xs: `1px solid ${theme.palette.divider}`,
                      },
                    }}
                    aria-label="ACV by Customer Type"
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        mb: 3,
                        fontWeight: 700,
                        color: theme.palette.text.primary,
                      }}
                    >
                      ACV by Customer Type
                    </Typography>
                    <Box
                      sx={{
                        flexGrow: 1,
                        minHeight: 500,
                        position: "relative",
                        width: "140%",
                      }}
                    >
                      {filterByQuarter(customerType).length > 0 ? (
                        <BarChart
                          data={filterByQuarter(customerType)}
                          colorScheme="green"
                        />
                      ) : (
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            height: "100%",
                          }}
                        >
                          <Typography variant="body1">
                            No data available for selected quarter
                          </Typography>
                        </Box>
                      )}
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} lg={4}>
                  <Box
                    sx={{
                      p: 4,
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                    aria-label="Customer Distribution"
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        mb: 3,
                        fontWeight: 700,
                        color: theme.palette.text.primary,
                      }}
                    >
                      Customer Distribution
                    </Typography>
                    <Box
                      sx={{
                        flexGrow: 1,
                        minHeight: 500,
                        position: "relative",
                        width: "100%",
                      }}
                    >
                      {filterByQuarter(customerType).length > 0 ? (
                        <DoughnutChart
                          data={filterByQuarter(customerType)}
                          colorScheme="orange"
                          size={500}
                        />
                      ) : (
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            height: "100%",
                          }}
                        >
                          <Typography variant="body1">
                            No data available for selected quarter
                          </Typography>
                        </Box>
                      )}
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            )}

            {/* Revenue Analysis Tab */}
            {activeTab === 2 && (
              <Grid container>
                <Grid item xs={12} lg={8}>
                  <Box
                    sx={{
                      p: 4,
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      borderRight: {
                        lg: `1px solid ${theme.palette.divider}`,
                        xs: "none",
                      },
                      borderBottom: {
                        lg: "none",
                        xs: `1px solid ${theme.palette.divider}`,
                      },
                    }}
                    aria-label="ACV by Range"
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        mb: 3,
                        fontWeight: 700,
                        color: theme.palette.text.primary,
                      }}
                    >
                      ACV by Range
                    </Typography>
                    <Box
                      sx={{
                        flexGrow: 1,
                        minHeight: 500,
                        position: "relative",
                        width: "140%",
                      }}
                    >
                      {filterByQuarter(acvRange).length > 0 ? (
                        <BarChart
                          data={filterByQuarter(acvRange)}
                          colorScheme="red"
                        />
                      ) : (
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            height: "100%",
                          }}
                        >
                          <Typography variant="body1">
                            No data available for selected quarter
                          </Typography>
                        </Box>
                      )}
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} lg={4}>
                  <Box
                    sx={{
                      p: 4,
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                    aria-label="ACV Range Distribution"
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        mb: 3,
                        fontWeight: 700,
                        color: theme.palette.text.primary,
                      }}
                    >
                      ACV Range Distribution
                    </Typography>
                    <Box
                      sx={{
                        flexGrow: 1,
                        minHeight: 500,
                        position: "relative",
                        width: "100%",
                      }}
                    >
                      {filterByQuarter(acvRange).length > 0 ? (
                        <DoughnutChart
                          data={filterByQuarter(acvRange)}
                          colorScheme="teal"
                          size={500}
                        />
                      ) : (
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            height: "100%",
                          }}
                        >
                          <Typography variant="body1">
                            No data available for selected quarter
                          </Typography>
                        </Box>
                      )}
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            )}

            {/* Industry Breakdown Tab */}
            {activeTab === 3 && (
              <Grid container>
                <Grid item xs={12} lg={8}>
                  <Box
                    sx={{
                      p: 4,
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      borderRight: {
                        lg: `1px solid ${theme.palette.divider}`,
                        xs: "none",
                      },
                      borderBottom: {
                        lg: "none",
                        xs: `1px solid ${theme.palette.divider}`,
                      },
                    }}
                    aria-label="ACV by Industry"
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        mb: 3,
                        fontWeight: 700,
                        color: theme.palette.text.primary,
                      }}
                    >
                      ACV by Industry
                    </Typography>
                    <Box
                      sx={{
                        flexGrow: 1,
                        minHeight: 500,
                        position: "relative",
                        width: "140%",
                      }}
                    >
                      {filterByQuarter(accountIndustry).length > 0 ? (
                        <BarChart
                          data={filterByQuarter(accountIndustry)}
                          colorScheme="indigo"
                        />
                      ) : (
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            height: "100%",
                          }}
                        >
                          <Typography variant="body1">
                            No data available for selected quarter
                          </Typography>
                        </Box>
                      )}
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} lg={4}>
                  <Box
                    sx={{
                      p: 4,
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                    aria-label="Industry Distribution"
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        mb: 3,
                        fontWeight: 700,
                        color: theme.palette.text.primary,
                      }}
                    >
                      Industry Distribution
                    </Typography>
                    <Box
                      sx={{
                        flexGrow: 1,
                        minHeight: 500,
                        position: "relative",
                        width: "100%",
                      }}
                    >
                      {filterByQuarter(accountIndustry).length > 0 ? (
                        <DoughnutChart
                          data={filterByQuarter(accountIndustry)}
                          colorScheme="pink"
                          size={500}
                        />
                      ) : (
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            height: "100%",
                          }}
                        >
                          <Typography variant="body1">
                            No data available for selected quarter
                          </Typography>
                        </Box>
                      )}
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            )}
          </CardContent>
        </Card>

        {/* Detailed Data Sections */}
        {activeTab === 0 && filterByQuarter(teamData).length > 0 && (
          <>
            <SectionSummary
              title="Team Performance"
              stats={[
                {
                  label: "Total Teams",
                  value: filterByQuarter(teamData).length,
                },
                {
                  label: "Total ACV",
                  value: `$${(totalACV / 1000).toFixed(1)}K`,
                },
                {
                  label: "Total Deals",
                  value: filterByQuarter(teamData).reduce(
                    (sum, d) => sum + d.count,
                    0
                  ),
                },
                {
                  label: "Avg Deal Size",
                  value: `$${(
                    totalACV /
                    filterByQuarter(teamData).reduce(
                      (sum, d) => sum + d.count,
                      0
                    ) /
                    1000
                  ).toFixed(1)}K`,
                },
              ]}
            />
            <TeamPerformanceCard
              data={filterByQuarter(teamData)}
              totalACV={totalACV}
            />
            <DataTable
              data={filterByQuarter(teamData)}
              columns={["Team", "count", "acv", "closed_fiscal_quarter"]}
            />
          </>
        )}

        {activeTab === 1 && filterByQuarter(customerType).length > 0 && (
          <>
            <SectionSummary
              title="Customer Analytics"
              stats={[
                {
                  label: "Customer Types",
                  value: filterByQuarter(customerType).length,
                },
                {
                  label: "Total ACV",
                  value: `$${(totalACV / 1000).toFixed(1)}K`,
                },
                {
                  label: "Total Customers",
                  value: filterByQuarter(customerType).reduce(
                    (sum, d) => sum + d.count,
                    0
                  ),
                },
                {
                  label: "Avg Value",
                  value: `$${(
                    totalACV /
                    filterByQuarter(customerType).reduce(
                      (sum, d) => sum + d.count,
                      0
                    ) /
                    1000
                  ).toFixed(1)}K`,
                },
              ]}
            />
            <CustomerTypeDetailsCard
              data={filterByQuarter(customerType)}
              totalACV={totalACV}
            />
            <DataTable
              data={filterByQuarter(customerType)}
              columns={["Cust_Type", "count", "acv", "closed_fiscal_quarter"]}
            />
          </>
        )}

        {activeTab === 2 && filterByQuarter(acvRange).length > 0 && (
          <>
            <SectionSummary
              title="Revenue Analysis"
              stats={[
                {
                  label: "ACV Ranges",
                  value: filterByQuarter(acvRange).length,
                },
                {
                  label: "Total ACV",
                  value: `$${(totalACV / 1000).toFixed(1)}K`,
                },
                {
                  label: "Total Deals",
                  value: filterByQuarter(acvRange).reduce(
                    (sum, d) => sum + d.count,
                    0
                  ),
                },
                {
                  label: "Avg Deal Size",
                  value: `$${(
                    totalACV /
                    filterByQuarter(acvRange).reduce(
                      (sum, d) => sum + d.count,
                      0
                    ) /
                    1000
                  ).toFixed(1)}K`,
                },
              ]}
            />
            <ACVRangeDetailsCard
              data={filterByQuarter(acvRange)}
              totalACV={totalACV}
            />
            <DataTable
              data={filterByQuarter(acvRange)}
              columns={["ACV_Range", "count", "acv", "closed_fiscal_quarter"]}
            />
          </>
        )}

        {activeTab === 3 && filterByQuarter(accountIndustry).length > 0 && (
          <>
            <SectionSummary
              title="Industry Breakdown"
              stats={[
                {
                  label: "Industries",
                  value: filterByQuarter(accountIndustry).length,
                },
                {
                  label: "Total ACV",
                  value: `$${(totalACV / 1000).toFixed(1)}K`,
                },
                {
                  label: "Total Deals",
                  value: filterByQuarter(accountIndustry).reduce(
                    (sum, d) => sum + d.count,
                    0
                  ),
                },
                {
                  label: "Avg Deal Size",
                  value: `$${(
                    totalACV /
                    filterByQuarter(accountIndustry).reduce(
                      (sum, d) => sum + d.count,
                      0
                    ) /
                    1000
                  ).toFixed(1)}K`,
                },
              ]}
            />
            <IndustryDetailsCard
              data={filterByQuarter(accountIndustry)}
              totalACV={totalACV}
            />
            <DataTable
              data={filterByQuarter(accountIndustry)}
              columns={[
                "Acct_Industry",
                "count",
                "acv",
                "closed_fiscal_quarter",
              ]}
            />
          </>
        )}
      </Box>
    </Box>
  );
};

 
export default Dashboard;
