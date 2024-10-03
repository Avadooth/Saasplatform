import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const { data } = await axios.post("/api/auth/login", values);
      localStorage.setItem("token", data.token); 
      message.success("Login successful");
      navigate("/dashboard");
    } catch (error) {
      message.error("Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto", paddingTop: "100px" }}>
      <h1>Login</h1>
      <Form name="login" onFinish={onFinish}>
        <Form.Item
          name="email"
          autoComplete="off"
          rules={[{ required: true, message: "Please enter your email!" }]}
        >
          <Input placeholder="Email" autoComplete="off" />
        </Form.Item>
        <Form.Item
          name="password"
          autoComplete="off"
          rules={[{ required: true, message: "Please enter your password!" }]}
        >
          <Input.Password placeholder="Password" autoComplete="off" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            Log In
          </Button>
        </Form.Item>
        <Form.Item>
          <Link to="/register">Don't have an account? Register here!</Link>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
