import Content from "./Content";
import classes from "./Layout.module.css";
import Navigation from "./Navigation";

const Layout = () => {
  return (
    <div className={classes.wraper}>
      <div className={classes.card}>
        <Navigation />
        <Content />
      </div>
    </div>
  );
};

export default Layout;
