import React, { useEffect, useState } from "react";
import { Table, Card, Statistic, Row, Col, Button, message, Tag } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [orders, setOrders] = useState([]);
  const [totalSales, setTotalSales] = useState(0);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token"); 
    navigate("/"); 
  };
  const fetchOrders = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get("/api/shopify/orders", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setOrders(data);
    
      calculateTotalSales(data);
    } catch (error) {
      message.error("Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  const calculateTotalSales = (orders) => {
    const total = orders.reduce(
      (sum, order) => sum + parseFloat(order.total_price),
      0
    );
    setTotalSales(total);
  };
 

  const columns = [
    {
      title: "Date",
      dataIndex: "created_at",
      key: "created_at",
      render: (text) => new Date(text).toLocaleDateString(),
      sorter: (a, b) => new Date(a.created_at) - new Date(b.created_at),
    },
    {
      title: "order_number",
      dataIndex: "order_number",
      key: "order_number",
      render: (text) => `${text}`,
    },
    {
      title: "Product Name",
      dataIndex: "line_items",
      key: "line_items",
      render: (line_items) =>
        line_items.map((item) => (
          <div key={item.id}>
            <div>{item.name}</div>
          </div>
        )),
    },
    {
      title: "Price",
      dataIndex: "line_items",
      key: "line_items",
      render: (line_items) =>
        line_items.map((item) => (
          <div key={item.id}>
            <div>{item.price}</div>
          </div>
        )),
    },
    {
      title: "Quantity",
      dataIndex: "line_items",
      key: "line_items",
      render: (line_items) =>
        line_items.map((item) => (
          <div key={item.id}>
            <div>{item.quantity}</div>
          </div>
        )),
    },
    {
      title: "Payment Status",
      dataIndex: "financial_status",
      key: "financial_status",
      render: (text) => `${text}`,
    },
    {
      title: "Sales Amount",
      dataIndex: "total_price",
      key: "total_price",
      render: (text) => `$${text}`,
      sorter: (a, b) => parseFloat(a.total_price) - parseFloat(b.total_price),
    },
    {
      title: "Status",
      dataIndex: "order_status_url",
      key: "order_status_url",
      render: (order_status_url) => (
        <Button onClick={() => window.open(order_status_url, "_blank")}>
          Check Status
        </Button>
      ),
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <Button type="primary" onClick={handleLogout} style={{ float: "right" }}>
        Logout
      </Button>

      <Row gutter={16}>
        <Col span={8}>
          <Card>
            <Statistic title="Total Orders" value={orders.length} />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="Total Sales"
              value={`$${totalSales}`}
              precision={2}
            />
          </Card>
        </Col>
      </Row>

      <Button
        type="primary"
        onClick={fetchOrders}
        style={{ margin: "20px 0" }}
        loading={loading}
      >
        Refresh Data
      </Button>

      <Table
        dataSource={orders}
        columns={columns}
        rowKey="id"
        loading={loading}
      />
    </div>
  );
};

export default Dashboard;
