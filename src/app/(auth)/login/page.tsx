"use client";
import { useRouter } from "next/navigation";

// Third party
import { Form, Checkbox } from "antd";

// Custom components
import InputComponent from "@/components/InputComponent";
import ButtonComponent from "@/components/ButtonComponent";

// helper
import { setCookie } from "@/helper";

// Service
import { useApiCall } from "@/services/useApiCall";
import { login } from "@/services/auth";

export default function Home() {
  const { call } = useApiCall();
  const router = useRouter();

  const handleLogin = async (values: { email: string; password: string }) => {
    const { email, password } = values;
    call(
      () => login(email, password),
      (response: any) => {
        router.push("/");
        setCookie("token", JSON.stringify(response.data), 300);
      },
      (error: any) => {
        console.log(error);
      }
    );
  };

  return (
    <div className="auth-layout-wrapper">
      <div className="container">
        <div className="form-container">
          <h1 className="form-title">Sign in</h1>
          <Form
            className="form-inner-container"
            name="basic"
            labelCol={{ span: 8 }}
            layout="vertical"
            initialValues={{ remember: true }}
            autoComplete="off"
            onFinish={(value) => handleLogin(value)}
          >
            <InputComponent
              name="email"
              rules={[{ required: true, message: "Email is required" }]}
              placeholder="Email"
            />

            <InputComponent
              name="password"
              rules={[{ required: true, message: "Password is required" }]}
              placeholder="Password"
            />

            <Form.Item name="remember">
              <Checkbox className="form-checkbox-text">Remember me</Checkbox>
            </Form.Item>

            <Form.Item>
              <ButtonComponent text="Login" buttonType="submit" />
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}
