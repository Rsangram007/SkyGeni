import React from "react";
import * as d3 from "d3";
import { useTheme } from "@mui/material";

const DoughnutChart = ({ data, colorScheme = "blue", size = 360 }) => {
  const svgRef = React.useRef(null);
  const theme = useTheme();
  const tooltipRef = React.useRef(null);

  React.useEffect(() => {
    if (!svgRef.current || !data || data.length === 0) return;

    // Clear existing chart
    d3.select(svgRef.current).selectAll("*").remove();
    if (tooltipRef.current) {
      tooltipRef.current.remove();
    }

    // Set up color scales
    const colorMap = {
      purple: [theme.palette.primary.light, theme.palette.primary.dark],
      blue: [theme.palette.info.light, theme.palette.info.dark],
      green: [theme.palette.success.light, theme.palette.success.dark],
      orange: [theme.palette.warning.light, theme.palette.warning.dark],
    };
    const colorRange = colorMap[colorScheme] || [
      theme.palette.primary.light,
      theme.palette.primary.dark,
    ];

    // Data preparation
    const totalACV = d3.sum(data, (d) => d.acv);
    const chartData = data.map((d) => ({
      label: d.Cust_Type || d.range || d.industry,
      value: d.acv,
      percentage: (d.acv / totalACV) * 100,
    }));

    // Dimensions
    const width = size;
    const height = size;
    const radius = Math.min(width, height) / 2 - 40;

    // Color scale with interpolation
    const color = d3
      .scaleOrdinal()
      .domain(chartData.map((d) => d.label))
      .range(
        d3.quantize(
          (t) => d3.interpolate(colorRange[0], colorRange[1])(t),
          chartData.length
        )
      );

    // Arc generator with rounded corners
    const arc = d3
      .arc()
      .innerRadius(radius * 0.7)
      .outerRadius(radius)
      .cornerRadius(6);

    // Pie generator
    const pie = d3
      .pie()
      .value((d) => d.value)
      .sort(null)
      .padAngle(0.015);

    // Create SVG
    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .style("background", "transparent");

    const g = svg
      .append("g")
      .attr("transform", `translate(${width / 2},${height / 2})`);

    // Create arcs
    const arcs = g
      .selectAll(".arc")
      .data(pie(chartData))
      .enter()
      .append("g")
      .attr("class", "arc");

    // Add paths with hover effects
    arcs
      .append("path")
      .attr("d", arc)
      .attr("fill", (d) => color(d.data.label))
      .attr("stroke", theme.palette.background.paper)
      .attr("stroke-width", 3)
      .style("cursor", "pointer")
      .style("opacity", 0.9)
      .on("mouseover", function (event, d) {
        d3.select(this)
          .transition()
          .duration(200)
          .attr("stroke-width", 6)
          .style("opacity", 1)
          .attr("transform", "scale(1.02)");

        tooltip.style("visibility", "visible").html(`
            <div style="font-weight:700;margin-bottom:6px;color:${
              theme.palette.text.primary
            };font-size:1.1rem">
              ${d.data.label}
            </div>
            <div style="color:${
              theme.palette.text.secondary
            };font-size:0.95rem">
              ACV: $${d.data.value.toLocaleString()}K
            </div>
            <div style="color:${
              theme.palette.text.secondary
            };font-size:0.95rem">
              ${d.data.percentage.toFixed(1)}% of total
            </div>
          `);
      })
      .on("mousemove", function (event) {
        tooltip
          .style("top", event.pageY - 15 + "px")
          .style("left", event.pageX + 15 + "px");
      })
      .on("mouseout", function () {
        d3.select(this)
          .transition()
          .duration(200)
          .attr("stroke-width", 3)
          .style("opacity", 0.9)
          .attr("transform", "scale(1)");
        tooltip.style("visibility", "hidden");
      });

    // Add center text with total value
    const centerGroup = g.append("g").attr("text-anchor", "middle");

    centerGroup
      .append("text")
      .attr("dy", "-0.6em")
      .style("font-size", "24px")
      .style("font-weight", "800")
      .style("fill", theme.palette.text.primary)
      .text(`$${Math.round(totalACV / 1000).toLocaleString()}K`);

    centerGroup
      .append("text")
      .attr("dy", "1.5em")
      .style("font-size", "16px")
      .style("fill", theme.palette.text.secondary)
      .text("Total ACV");

    // Add tooltip
    const tooltip = d3
      .select("body")
      .append("div")
      .attr("class", "tooltip")
      .style("position", "absolute")
      .style("visibility", "hidden")
      .style("background", theme.palette.background.paper)
      .style("border-radius", "12px")
      .style("padding", "16px")
      .style("box-shadow", theme.shadows[6])
      .style("z-index", 1000)
      .style("font-family", theme.typography.fontFamily)
      .style("font-size", "14px")
      .style("border", `1px solid ${theme.palette.divider}`)
      .style("max-width", "240px")
      .style("transition", "all 0.3s ease");

    tooltipRef.current = tooltip.node();

    return () => {
      if (tooltipRef.current) {
        tooltipRef.current.remove();
        tooltipRef.current = null;
      }
    };
  }, [data, colorScheme, theme, size]);

  return (
    <svg
      ref={svgRef}
      style={{ width: "100%", height: "100%", maxHeight: size }}
    />
  );
};

export default DoughnutChart;
