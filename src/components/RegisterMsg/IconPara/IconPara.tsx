import React from "react";

import Grid from "@material-ui/core/Grid";

const IconPara = ({ Icon, para }) => {
  return (
    <Grid className="is-flex mt-4 ml-4 mb-2 is-align-start is-w-35">
      <Icon className="has-text-blue" />
      <p className="ml-4 is-bold">{para}</p>
    </Grid>
  );
};

export default IconPara;
