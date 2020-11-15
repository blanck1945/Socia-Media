import React from "react";

//Mui imports
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";

interface CustomBtnProps {
  children: any;
  tip?: string;
  toolClass?: string;
  func?: Function;
  btnClass?: string;
}

const CustomBtn = ({
  children,
  tip,
  toolClass,
  func,
  btnClass,
}: CustomBtnProps) => {
  return (
    <Tooltip title={tip} placement="top" className={toolClass}>
      <IconButton onClick={func ? () => func() : null} className={btnClass}>
        {children}
      </IconButton>
    </Tooltip>
  );
};

export default CustomBtn;
