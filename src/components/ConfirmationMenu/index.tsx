import {
  Dialog,
  DialogActions,
  DialogTitle,
  makeStyles,
  createStyles,
} from "@material-ui/core";

import { MenuProps } from "./types";
import colors from "../../styles/colors";

const useStyles = makeStyles(() =>
  createStyles({
    menu: {
      "& .MuiPaper-root": {
        backgroundColor: colors.dark,
        color: colors.lightGray,
      },
    },
  })
);

const Menu = ({ children, title, ...rest }: MenuProps) => {
  const classes = useStyles();

  return (
    <Dialog
      className={classes.menu}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      {...rest}
    >
      <DialogTitle id="alert-dialog-title" style={{ marginBottom: "0px" }}>
        {title}
      </DialogTitle>
      <DialogActions>{children}</DialogActions>
    </Dialog>
  );
};

export default Menu;
