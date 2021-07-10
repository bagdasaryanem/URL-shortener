import { AppBar, Button, Toolbar, Typography } from "@material-ui/core";
import React, { useContext } from "react";
import AuthContext from "../store/auth-context";

const Header = (props) => {
  const authContext = useContext(AuthContext);
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h5" style={{ flexGrow: 1 }}>
          URL Shortener
        </Typography>
        <Button color="inherit" onClick={authContext.logout}>
          Log Out
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
