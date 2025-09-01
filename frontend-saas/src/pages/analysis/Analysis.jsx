import { useEffect, useState } from "react";
import { FaDollarSign, FaShoppingCart, FaUsers } from "react-icons/fa"; // ikonlar
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import "./AnalysisStyles.css";

const Analysis = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((products) => {
        const categoryCount = products.reduce((acc, item) => {
          acc[item.category] = (acc[item.category] || 0) + 1;
          return acc;
        }, {});

        const chartData = Object.entries(categoryCount).map(
          ([name, value]) => ({ name, value })
        );

        setData(chartData);
      });
  }, []);

  // Sabit renk paleti (grayscale)
  const COLORS = ["#111827", "#374151", "#6B7280", "#9CA3AF"];

  // Fake sales data
  const salesData = [
    { month: "Jan", sales: 400 },
    { month: "Feb", sales: 600 },
    { month: "Mar", sales: 800 },
    { month: "Apr", sales: 500 },
    { month: "May", sales: 700 },
  ];

  // Fake revenue data
  const revenueData = [
    { category: "Electronics", revenue: 1200 },
    { category: "Clothes", revenue: 800 },
    { category: "Jewelry", revenue: 600 },
    { category: "Others", revenue: 400 },
  ];

  // Fake users growth
  const usersData = [
    { month: "Jan", users: 200 },
    { month: "Feb", users: 300 },
    { month: "Mar", users: 450 },
    { month: "Apr", users: 600 },
    { month: "May", users: 750 },
  ];

  // ✅ Özet veriler
  const totalSales = salesData.reduce((sum, item) => sum + item.sales, 0);
  const totalUsers = usersData[usersData.length - 1].users;
  const avgRevenue = Math.round(
    revenueData.reduce((sum, item) => sum + item.revenue, 0) /
      revenueData.length
  );

  return (
    <div className="responsive-container">
      <h2 className="page-title">Analytics</h2>

      {/* Özet kutucuklar */}
      <div className="metrics-grid">
        <div className="metric-card">
          <FaShoppingCart className="metric-icon" />
          <div>
            <h4>Total Sales</h4>
            <p>{totalSales}</p>
          </div>
        </div>
        <div className="metric-card">
          <FaUsers className="metric-icon" />
          <div>
            <h4>Total Users</h4>
            <p>{totalUsers}</p>
          </div>
        </div>
        <div className="metric-card">
          <FaDollarSign className="metric-icon" />
          <div>
            <h4>Avg. Revenue</h4>
            <p>${avgRevenue}</p>
          </div>
        </div>
      </div>

      {/* Grafikler */}
      <div className="analytics-grid">
        {/* Orders PieChart */}
        <div className="analytics-card">
          <h3>Orders per Category</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Sales LineChart */}
        <div className="analytics-card">
          <h3>Sales Trend</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="sales" stroke="#111827" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Revenue BarChart */}
        <div className="analytics-card">
          <h3>Revenue Breakdown</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="revenue" fill="#374151" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Users Growth AreaChart */}
        <div className="analytics-card">
          <h3>Users Growth</h3>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={usersData}>
              <defs>
                <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6B7280" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#6B7280" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="users"
                stroke="#111827"
                fillOpacity={1}
                fill="url(#colorUsers)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Analysis;
