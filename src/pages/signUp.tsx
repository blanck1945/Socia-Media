import Image from "next/image";
import LinkComp from "../components/LinkComp/LinkComp";
import { useState } from "react";
import { form } from "../../styles/classes/variables";
import { useRouter } from "next/router";
import {
  AxiosSignUpUser,
  UserInterface,
} from "../redux/actions/userActions/userAxios";
import { useSelector, useDispatch } from "react-redux";
import Auth from "./Auth";

//Mui imports
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Alert from "@material-ui/lab/Alert";
import CircularProgress from "@material-ui/core/CircularProgress";
import { clearAllErrors } from "../redux/actions/uiActions/uiActions";

const signup = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const Uistate = useSelector((state) => state.ui);

  const [user, setUser] = useState<UserInterface>({
    user: "",
    email: "",
    confirmPassword: "",
    password: "",
  });

  const handleInput = (e: any) => {
    if (Uistate.errors?.wrongCredentials) {
      dispatch(clearAllErrors());
    }

    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleForm = async (e: any) => {
    e.preventDefault();
    await dispatch(AxiosSignUpUser(user, router));
  };

  return (
    <div className={form}>
      <Auth url={router.pathname} />
      {Uistate.loading && (
        <CircularProgress
          color="secondary"
          size={100}
          className="is-abs z-5 "
        />
      )}
      <div>
        <Image
          src="/../public/icons8-son-goku-64.png"
          alt="image-icon"
          width={125}
          className="pt-2"
          height={120}
        />
      </div>
      <form
        noValidate
        onSubmit={handleForm}
        className="is-flex is-w-70 is-dis-col is-align-center"
      >
        <TextField
          id="user"
          name="user"
          label="Usuario"
          className="my-2"
          fullWidth
          value={user.user}
          onChange={handleInput}
        />
        <TextField
          id="email"
          name="email"
          type="email"
          label="Email"
          className="my-2"
          fullWidth
          value={user.email}
          onChange={handleInput}
        />
        <TextField
          fullWidth
          id="password"
          name="password"
          type="password"
          label="Contraseña"
          className="my-2 mb-4"
          value={user.password}
          onChange={handleInput}
        />
        <TextField
          fullWidth
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          label="Confirmar Contraseña"
          className="my-2 mb-4"
          value={user.confirmPassword}
          onChange={handleInput}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className="is-h-35 my-4 "
        >
          Registrarse
        </Button>
        {Uistate.flag && (
          <Alert
            variant="filled"
            severity="success"
            className="my-2 is-click"
            onClick={() => console.log("removing flag")}
          >
            Usuario creado con exito
          </Alert>
        )}
        {Uistate.errors?.wrongCredentials &&
          !Uistate.errors?.email &&
          !Uistate.errors?.password && (
            <Alert severity="error">{Uistate.errors?.msg}</Alert>
          )}
        <Typography variant="body2" className="my-2">
          Si ya tiene una cuenta{" "}
          <LinkComp url="/signIn" linkClass="has-text-info">
            Ingrese
          </LinkComp>
        </Typography>
      </form>
    </div>
  );
};
export default signup;
