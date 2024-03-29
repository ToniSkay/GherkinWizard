import {Avatar, Button, Popover} from "antd";
import {UserOutlined} from "@ant-design/icons";
import "./User.scss";
import {useState} from "react";
import {useUserStore} from "../../../stores/user-store";
import {useNavigate} from "react-router-dom";
import {nanoid} from "nanoid";
import {Path} from "../../../enums/index";

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
    navigate(Path.Login);
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
          <Avatar shape="square" icon={<UserOutlined width="1rem" height="1rem" rev={nanoid()} />} />
        </div>

        <div className="user-name">{userName}</div>
      </div>
    </Popover>
  );
};
