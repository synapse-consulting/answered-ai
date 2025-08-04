import ApexCharts from "apexcharts";

// ===== donutChart
const donutChart = () => {
  const donutChartOptions = {
    chart: {
      type: "donut",
      height: 260,
      fontFamily: "Outfit, sans-serif",
    },
    series: [45, 35, 20], // WhatsApp, Instagram, Facebook
    labels: ["WhatsApp", "Instagram", "Facebook"],
    colors: ["#1F2937", "#6B7280", "#D1D5DB"],
    legend: {
      show: false, // External legend (outside chart)
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: false,
    },
    plotOptions: {
      pie: {
        donut: {
          size: "75%", // Thick ring
        },
      },
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return `${val}%`;
        },
      },
    },
  };

  const chartEl = document.querySelector("#donutChart");

  if (chartEl) {
    const chart = new ApexCharts(chartEl, donutChartOptions);
    chart.render();
  }
};

export default donutChart;
