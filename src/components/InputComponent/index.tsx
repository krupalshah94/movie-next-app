import React from "react";

// Third party
import { Form, Input } from "antd";

interface InputComponentProps {
  name: string;
  rules?: {
    required: boolean;
    message: string;
  }[];
  placeholder?: string;
  isPassword?: boolean;
  customClass?: string;
}

function InputComponent({
  name,
  rules,
  placeholder,
  isPassword = false,
  customClass,
}: InputComponentProps) {
  return (
    <Form.Item name={name} rules={rules}>
      {isPassword ? (
        <Input.Password className={`input-field ${customClass}`} placeholder={placeholder} />
      ) : (
        <Input className={`input-field ${customClass}`} placeholder={placeholder} />
      )}
    </Form.Item>
  );
}

export default InputComponent;
