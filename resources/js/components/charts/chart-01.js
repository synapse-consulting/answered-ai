import ApexCharts from "apexcharts";

// ===== chartOne (Updated: Conversation Activity)
const chart01 = () => {
  const chartOneOptions = {
    chart: {
      type: 'bar',
      height: 180,
      fontFamily: 'Outfit, sans-serif',
      toolbar: { show: false },
    },
    series: [
      {
        name: 'Received',
        data: [10, 15, 20, 25, 18, 14, 12],
      },
      {
        name: 'Resolved',
        data: [9, 14, 19, 20, 17, 13, 11],
      },
    ],
    colors: ['#1F2937', '#9CA3AF'], // Tailwind gray-800 and gray-400
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '45%',
        borderRadius: 6,
        borderRadiusApplication: 'end',
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent'],
    },
    xaxis: {
      categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    legend: {
      show: false, // hidden like the screenshot
    },
    yaxis: {
      title: { text: undefined },
      labels: { style: { fontSize: '12px', colors: '#6B7280' } },
    },
    grid: {
      borderColor: '#E5E7EB', // Tailwind gray-200
      strokeDashArray: 3,
      yaxis: {
        lines: { show: true },
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      x: { show: false },
      y: {
        formatter: function (val) {
          return val;
        },
      },
    },
  };

  const chartSelector = document.querySelectorAll("#chartOne");

  if (chartSelector.length) {
    const chart = new ApexCharts(document.querySelector("#chartOne"), chartOneOptions);
    chart.render();
  }
};

export default chart01;
