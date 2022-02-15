import { useContext, useState } from "react";
import * as React from "react";
import Switch from "@mui/material/Switch";

import api from "../../api/api";
import GlobalContext from "../../context/globalContext";

const UserActiveToggle = (props) => {
  const { global } = useContext(GlobalContext);
  const { user } = props;
  const [isActive, setIsActive] = useState(user.is_active);

  const switchOnChangeHandler = async () => {
    await api.editUserStatus(user.id, !isActive);
    setIsActive(!isActive);
  };

  return (
    <>
      <Switch
        checked={isActive ? true : false}
        onChange={switchOnChangeHandler}
        value={isActive}
      />
    </>
  );
};

export default UserActiveToggle;
