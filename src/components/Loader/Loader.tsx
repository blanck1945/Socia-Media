//Mui imports
import Grid from "@material-ui/core/Grid";
import Loader from "react-loader-spinner";
const PageLoader = () => {
  const selectPic = () => {
    let random = Math.floor(Math.random() * (3 - 1 + 1) + 1);
    switch (random.toString()) {
      case "1":
        return "/images/icons8-sailor-moon-48.png";
      case "2":
        return "/images/icons8-son-goku-64.png";
      case "3":
        return "/images/icons8-pokemon-48.png";
    }
  };

  const pic = selectPic();

  return (
    <Grid
      xl={12}
      className="is-flex is-align-center is-justify-center is-h-full is-dis-col is-hv-90"
    >
      <img src={pic} />
      <Loader type="ThreeDots" color="#00BFFF" height={80} width={80} />
    </Grid>
  );
};

export default PageLoader;
