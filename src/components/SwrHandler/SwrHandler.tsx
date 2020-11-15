import CircularProgress from "@material-ui/core/CircularProgress";

const SwrHandler = ({ control }) => {
  switch (control) {
    case "loading":
      return (
        <div className="is-w-full is-h-full is-flex is-align-center is-justify-center">
          <CircularProgress size={90} />
        </div>
      );
      break;
    case "error":
      return (
        <div className="has-backgroun-danger">
          <h3 className="has-text-white">Error</h3>
        </div>
      );
  }
};

export default SwrHandler;
