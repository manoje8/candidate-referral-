import { Bar, Pie } from "react-chartjs-2";
import axios from "axios";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import { useEffect, useState } from "react";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const MetricsDashboard = () => {
    const [metrics, setMetrics] = useState({ totalCandidates: 0, statusCounts: [] });
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem("token")
  
    useEffect(() => {
      const fetchMetrics = async () => {
        try {
          const response = await axios(`${import.meta.env.VITE_API_URL}/candidates/metrics`, {headers: {Authorization: `Bearer ${token}`}});
          setMetrics(response.data);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching metrics:", error);
          setLoading(false);
        }
      };
  
      fetchMetrics();
    }, [token]);
  
    if (loading) return <p>Loading metrics...</p>;
  
    const statusLabels = metrics.statusCounts.map((item) => item._id);
    const statusCounts = metrics.statusCounts.map((item) => item.count);
  
    // Bar chart data
    const barData = {
      labels: statusLabels,
      datasets: [
        {
          label: "Candidates by Status",
          data: statusCounts,
          backgroundColor: ["#f39c12", "#3498db", "#2ecc71"],
          borderColor: ["#e67e22", "#2980b9", "#27ae60"],
          borderWidth: 1,
        },
      ],
    };
  
    // Pie chart data
    const pieData = {
      labels: statusLabels,
      datasets: [
        {
          data: statusCounts,
          backgroundColor: ["#f39c12", "#3498db", "#2ecc71"],
          hoverBackgroundColor: ["#e67e22", "#2980b9", "#27ae60"],
        },
      ],
    };
  
    return (
      <div className="mt-5">
        <h2>Metrics Dashboard</h2>
        <h5>Total Candidates: {metrics.totalCandidates}</h5>
  
        <div className="mb-3" style={{ width: "50%", margin: "0 auto" }}>
          <h3>Bar Chart</h3>
          <div style={{width: "80%"}}>
            <Bar data={barData} />
          </div>
  
          <h3>Pie Chart</h3>
          <div style={{width: "50%"}}>
            <Pie data={pieData} />
          </div>
        </div>
      </div>
    );
  };
  
  export default MetricsDashboard;