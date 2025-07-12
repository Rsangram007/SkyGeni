import React from "react";
import * as d3 from "d3";
import { useTheme } from "@mui/material";
const BarChart = ({ data, colorScheme = "purple" }) => {
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

    // Dimensions
    const width = svgRef.current.clientWidth;
    const height = 350;
    const margin = { top: 30, right: 20, bottom: 60, left: 60 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // Data
    const categories = data.map((d) => d.Cust_Type || d.range || d.industry);
    const values = data.map((d) => d.acv);
    const maxValue = d3.max(values);
    const totalValue = d3.sum(values);

    // Color scale
    const colorMap = {
      purple: theme.palette.primary.main,
      blue: theme.palette.info.main,
      green: theme.palette.success.main,
      orange: theme.palette.warning.main,
    };
    const mainColor = colorMap[colorScheme] || theme.palette.primary.main;

    // Scales
    const xScale = d3
      .scaleBand()
      .domain(categories)
      .range([0, innerWidth])
      .padding(0.4);

    const yScale = d3
      .scaleLinear()
      .domain([0, maxValue * 1.1])
      .range([innerHeight, 0]);

    // Create SVG
    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height);

    const chartGroup = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Add gradient
    const defs = svg.append("defs");
    const gradient = defs
      .append("linearGradient")
      .attr("id", "bar-gradient")
      .attr("x1", "0%")
      .attr("y1", "0%")
      .attr("x2", "0%")
      .attr("y2", "100%");

    gradient
      .append("stop")
      .attr("offset", "0%")
      .attr("stop-color", d3.color(mainColor).brighter(0.3));

    gradient
      .append("stop")
      .attr("offset", "100%")
      .attr("stop-color", mainColor);

    // Create bars with rounded tops
    chartGroup
      .selectAll(".bar")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", (d) => xScale(d.Cust_Type || d.range || d.industry))
      .attr("y", (d) => yScale(d.acv))
      .attr("width", xScale.bandwidth())
      .attr("height", (d) => innerHeight - yScale(d.acv))
      .attr("rx", 6)
      .attr("ry", 6)
      .style("fill", "url(#bar-gradient)")
      .style("stroke", "none")
      .style("cursor", "pointer")
      .on("mouseover", function (event, d) {
        d3.select(this).style("opacity", 0.8);
        tooltip.style("visibility", "visible").html(`
            <div style="font-weight:600;margin-bottom:4px;">${
              d.Cust_Type || d.range || d.industry
            }</div>
            <div>ACV: $${d.acv}K</div>
            <div>${((d.acv / totalValue) * 100).toFixed(1)}% of total</div>
          `);
      })
      .on("mousemove", function (event) {
        tooltip
          .style("top", event.pageY - 10 + "px")
          .style("left", event.pageX + 10 + "px");
      })
      .on("mouseout", function () {
        d3.select(this).style("opacity", 1);
        tooltip.style("visibility", "hidden");
      });

    // Add value labels on top of bars
    chartGroup
      .selectAll(".bar-label")
      .data(data)
      .enter()
      .append("text")
      .attr("class", "bar-label")
      .attr(
        "x",
        (d) =>
          xScale(d.Cust_Type || d.range || d.industry) + xScale.bandwidth() / 2
      )
      .attr("y", (d) => yScale(d.acv) - 8)
      .attr("text-anchor", "middle")
      .text((d) => `$${d.acv}K`)
      .style("font-size", "12px")
      .style("font-weight", "600")
      .style("fill", theme.palette.text.primary);

    // Add axes
    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale).tickFormat((d) => `$${d}K`);

    chartGroup
      .append("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(0,${innerHeight})`)
      .call(xAxis)
      .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", ".15em")
      .attr("transform", "rotate(-45)")
      .style("font-size", "12px")
      .style("fill", theme.palette.text.secondary);

    chartGroup
      .append("g")
      .attr("class", "y-axis")
      .call(yAxis)
      .selectAll("text")
      .style("font-size", "12px")
      .style("fill", theme.palette.text.secondary);

    // Add grid lines
    chartGroup
      .append("g")
      .attr("class", "grid")
      .call(d3.axisLeft(yScale).tickSize(-innerWidth).tickFormat(""))
      .selectAll("line")
      .style("stroke", theme.palette.divider)
      .style("stroke-opacity", 0.3)
      .style("stroke-dasharray", "2,2");

    // Add tooltip
    const tooltip = d3
      .select("body")
      .append("div")
      .attr("class", "tooltip")
      .style("position", "absolute")
      .style("visibility", "hidden")
      .style("background", theme.palette.background.paper)
      .style("border-radius", "8px")
      .style("padding", "12px")
      .style("box-shadow", theme.shadows[3])
      .style("font-family", theme.typography.fontFamily)
      .style("font-size", "14px")
      .style("z-index", 1000)
      .style("border", `1px solid ${theme.palette.divider}`);

    tooltipRef.current = tooltip.node();

    return () => {
      if (tooltipRef.current) {
        tooltipRef.current.remove();
        tooltipRef.current = null;
      }
    };
  }, [data, colorScheme, theme]);

  return <svg ref={svgRef} style={{ width: "100%", height: "400px" }} />;
};

export default BarChart;
