import { Avatar, Button, Popover } from "antd";
import { UserOutlined } from "@ant-design/icons";
import "./User.scss";
import { useState } from "react";
import { useUserStore } from "../../../stores/user-store";
import { useNavigate } from "react-router-dom";

interface IProps {
  userName: string;
}

export const User = ({ userName }: IProps) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const logout = useUserStore((state) => state.logout);

  const onLogoutClick = () => {
    logout();
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };

  return (
    <Popover
      content={
        <Button type="primary" danger onClick={onLogoutClick}>
          Log out
        </Button>
      }
      trigger="click"
      open={open}
      destroyTooltipOnHide={true}
      onOpenChange={handleOpenChange}
    >
      <div className="user-container animate__animated animate__fadeInRight">
        <div className="user-avatar">
          <Avatar size={"small"} shape="square" icon={<UserOutlined rev />} />
        </div>
        <div className="user-name">{userName}</div>
      </div>
    </Popover>
  );
};
