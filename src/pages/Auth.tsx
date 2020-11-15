import React, { useEffect, useState, useContext } from "react";
import jwtDecode from "jwt-decode";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import {
  axiosLogOut,
  getUserData,
} from "../redux/actions/userActions/userAxios";

interface AuthProps {
  url?: string;
}

const Auth = ({ url }: AuthProps) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const UserState = useSelector((state) => state.user);
  const [dis, setDis] = useState<boolean>(false);

  useEffect(() => {
    if (url === "/signIn" || url === "/signUp") {
      handleSignRoutes();
    } else {
      handlerOtherRoutes();
    }
  }, []);

  const handleSignRoutes = () => {
    const token = localStorage.FBIdToken;
    if (token) {
      router.push("/");
    } else {
      setDis(true);
    }
  };

  const handlerOtherRoutes = async () => {
    const token = localStorage.FBIdToken;

    if (token) {
      const decodedToken: any = jwtDecode(token);
      if (decodedToken.exp * 1000 < Date.now()) {
        dispatch(axiosLogOut(router));
        setDis(true);
      } else {
        if (!UserState.authenticateUser) {
          await dispatch(getUserData(token));
          setDis(true);
        }
        setDis(true);
      }
    } else {
      setDis(true);
    }
  };

  if (dis) {
    return null;
  } else {
    return (
      <div className="abs-screen">
        <img src="/icons8-son-goku-64.png" alt="gokuIcon" />
        <h4>Reedirigiendo</h4>
      </div>
    );
  }
};

export default Auth;
