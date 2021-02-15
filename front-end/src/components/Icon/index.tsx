import React from "react";
import * as Father from "react-icons/fi";

interface IconProps {
  iconName: string | undefined;
  size: number;
  color: string;
}

const Icon: React.FC<IconProps> = (props) => {
  const { iconName, size, color } = props;
  // @ts-ignore
  const icon = React.createElement(Father[iconName || "FiCoffee"]);
  return (
    <div style={{ fontSize: size, color: color, display: "flex" }}>{icon}</div>
  );
};

export default Icon;
