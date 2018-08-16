import React from "react";
import Header from "./header";
import Footer from "./footer";

import classes from "./wrapper.css";

const wrapper = props => (
  <React.Fragment>
    <Header {...props.set} />
      <div className={classes.body}>{props.children}</div>
    <Footer />
  </React.Fragment>
);

export default wrapper;
