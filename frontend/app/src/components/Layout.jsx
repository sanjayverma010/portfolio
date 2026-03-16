import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <Navbar />

      <main style={styles.main}>
        <Outlet />
      </main>
    </>
  );
}

const styles = {
  main: {
    paddingTop: "90px",
    minHeight: "100vh",
  },
};
