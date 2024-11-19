/* eslint-disable */
import React from "react";

// Third party
import { Button } from "antd";

interface ButtonComponentProps {
  text: string;
  customClass?: string;
  buttonType?: "button" | "submit" | "reset" | undefined;
  onClick?: () => void;
  disabled?: boolean;
}

function ButtonComponent({
  customClass,
  text,
  buttonType = "button",
  onClick,
  disabled = false,
}: ButtonComponentProps) {
  return (
    <Button
      className={`form-button ${customClass}`}
      htmlType={buttonType}
      type="primary"
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </Button>
  );
}

export default ButtonComponent;
