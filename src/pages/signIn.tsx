import Image from "next/image";
import Auth from "./Auth";
import LinkComp from "../components/LinkComp/LinkComp";
import React, { useEffect, useState } from "react";
import { form } from "../../styles/classes/variables";
import { useRouter } from "next/router";
import {
  AxiosLoginUser,
  UserInterface,
} from "../redux/actions/userActions/userAxios";
import { useSelector, useDispatch } from "react-redux";

//Mui imports
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Alert from "@material-ui/lab/Alert";
import CircularProgress from "@material-ui/core/CircularProgress";
import { clearAllErrors } from "../redux/actions/uiActions/uiActions";
import { GlobalState } from "../redux/store";
import { UiInitialState } from "../redux/reducers/uiReducers";

const signin = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const Uistate: UiInitialState = useSelector((state: GlobalState) => state.ui);

  const [user, setUser] = useState<UserInterface>({
    email: "",
    password: "",
  });

  useEffect(() => {
    return () => {
      setUser({
        email: "",
        password: "",
      });
    };
  }, []);

  const handleInput = (e: any) => {
    if (Uistate.errors) {
      dispatch(clearAllErrors());
    }

    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleForm = (e: any) => {
    e.preventDefault();
    dispatch(AxiosLoginUser(user, router));
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
          src="/images/icons8-son-goku-64.png"
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
          id="email"
          name="email"
          type="email"
          label="Email"
          helperText={Uistate.errors?.email}
          error={Uistate.errors?.email ? true : false}
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
          helperText={Uistate.errors?.password}
          error={Uistate.errors?.password ? true : false}
          label="Contraseña"
          className="my-2 mb-4"
          value={user.password}
          onChange={handleInput}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={Uistate.loading}
          className="is-h-35 my-4 "
        >
          Iniciar Sesión
        </Button>
        {Uistate.errors?.wrongCredentials &&
          !Uistate.errors?.email &&
          !Uistate.errors?.password && (
            <Alert severity="error">{Uistate.errors?.msg}</Alert>
          )}
        <Typography variant="body2" className="my-2">
          Si no tiene una cuenta{" "}
          <LinkComp url="/signUp" linkClass="has-text-info">
            Registrese
          </LinkComp>
        </Typography>
      </form>
    </div>
  );
};

export default signin;
