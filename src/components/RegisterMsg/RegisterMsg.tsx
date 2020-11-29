//Mui Imports
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

//Icons
import SearchIcon from "@material-ui/icons/Search";
import PeopleIcon from "@material-ui/icons/People";
import ForumIcon from "@material-ui/icons/Forum";

import React from "react";
import IconPara from "./IconPara/IconPara";

const RegisterMsg = () => {
  return (
    <Paper className="has-background-white has-rad-4 has-sha-s">
      <Typography className="text-center has-text-blue" variant="h3">
        Dont lose the flow of the wave
      </Typography>
      <Grid className="is-flex is-align-center is-dis-col is-w-full is-justify-center">
        <IconPara Icon={SearchIcon} para="Sigue lo que te interesa." />
        <IconPara
          Icon={PeopleIcon}
          para="Entérate de qué está hablando la gente.."
        />
        <IconPara Icon={ForumIcon} para="Únete a la conversación." />
      </Grid>
      <Grid></Grid>
    </Paper>
  );
};

export default RegisterMsg;
