//Mui imports
import Grid from "@material-ui/core/Grid";
//imports
import React from "react";

interface SideBoxProps {
  header: string;
  text: string;
}

const SideBox = ({ header, text }) => {
  return (
    <Grid className="my-1">
      <p className="pl-2">{header}</p>
      <p className="has-text-blue pl-4">{text ? text : "No data submit"}</p>
    </Grid>
  );
};

export default SideBox;
