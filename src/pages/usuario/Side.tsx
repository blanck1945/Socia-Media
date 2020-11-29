//Mui imports
import Grid from "@material-ui/core/Grid";
import SideBox from "./SideBox";

interface SideProps {
  bio: string;
  location: string;
  watching?: string;
  birth?: string;
}

const Side = ({ bio, location, birth, watching }: SideProps) => {
  return (
    <Grid className="has-background-white is-w-25 is-h-300 has-rad-4 has-sha-m">
      <SideBox header={"Bio"} text={bio} />
      <SideBox header={"Location"} text={location} />
      <SideBox header={"Birthday"} text={birth} />
      <SideBox header={"Watching"} text={watching} />
    </Grid>
  );
};

export default Side;
