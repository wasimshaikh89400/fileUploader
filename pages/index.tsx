import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Bar, Doughnut } from "react-chartjs-2";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Daily User Engagement",
    },
  },
};

const dOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: "bottom" as const,
      display: true,
    },
    title: {
      display: true,
      text: "Industrial Percentage",
    },
    label: {
      display: false,
    },
  },
};

const days = [];
const today = new Date();
let ordData: string = "";
for (let i = 15; i >= 1; i--) {
  const day = new Date(today);
  day.setDate(today.getDate() - i + 1);
  let dayOfMonth: number = day.getDate();
  if (dayOfMonth % 10 === 1 && dayOfMonth !== 11) {
    ordData = `${dayOfMonth}st`;
  } else if (dayOfMonth % 10 === 2 && dayOfMonth !== 12) {
    ordData = `${dayOfMonth}nd`;
  } else if (dayOfMonth % 10 === 3 && dayOfMonth !== 13) {
    ordData = `${dayOfMonth}rd`;
  } else {
    ordData = `${dayOfMonth}th`;
  }
  days.push(ordData);
}

export const barData = {
  labels: days,
  datasets: [
    {
      label: "Users",
      data: days.map(() => Math.floor(Math.random() * 100)),
      backgroundColor: "#649a90",
    },
  ],
};

export const doughnutData = {
  labels: [
    "Information technology (IT)",
    "Energy",
    "Financial services",
    "Food and beverage",
    "Transportation",
    "Retail",
    "Construction",
    "Media and entertainment",
    "Education",
  ],
  datasets: [
    {
      label: "Uploaded files",
      data: new Array(9).fill("").map(() => Math.floor(Math.random() * 100)),
      backgroundColor: [
        "rgb(76, 175, 80)",
        "rgb(54, 162, 235)",
        "rgb(255, 206, 86)",
        "rgb(75, 192, 192)",
        "rgb(63, 81, 181)",
        "rgb(156, 39, 176)",
        "rgb(255, 235, 59, 1)",
        "rgba(0, 188, 212, 1)",
        "rgba(255, 87, 34, 1)",
      ],
      borderWidth: 1,
    },
  ],
};

console.log(days.map(() => 20));
const Dashboard = () => {
  return (
    <Grid container spacing={7} sx={{ mt: 1 }}>
      <Grid item sm={12} md={6}>
        <Card sx={{ height: "100%", p: 5, pt: 13 }}>
          <Bar options={options} data={barData} />
        </Card>
      </Grid>
      <Grid item sm={12} md={6}>
        <Card sx={{ p: 10, height: "100%" }}>
          <Box sx={{ display: "flex", width: "70%", mx: "auto" }}>
            <Doughnut options={dOptions} data={doughnutData} />
          </Box>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
