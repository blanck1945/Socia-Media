import { useContext, useEffect } from "react";
import Navbar from "./Navbar";
import Head from "next/head";
import AuthContext from "../context/auth";
import { useRouter } from "next/router";
import Auth from "../pages/Auth";

const Layout = ({ children }) => {
  const userCtx = useContext(AuthContext);
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Anime-Social-Web</title>
      </Head>
      <Navbar />
      <main className="main-class">{children}</main>
    </>
  );
};

export default Layout;
