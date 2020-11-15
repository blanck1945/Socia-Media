import Layout from "../layout/Layout";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import ContextWrapper from "../context/Wrapper";

//Redux Imports
import { store } from "../redux/store";
import { Provider } from "react-redux";

//SCSS main import
import "../../styles/main.scss";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#33c9dc",
      main: "#00bcd4",
      dark: "#008394",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ff6333",
      main: "#ff3d00",
      dark: "#b22a00",
      contrastText: "#fff",
    },
  },
});

function MyApp({ Component, pageProps }) {
  return (
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <ContextWrapper>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ContextWrapper>
      </Provider>
    </MuiThemeProvider>
  );
}

export default MyApp;
