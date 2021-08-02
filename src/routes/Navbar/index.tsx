import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

import useData from '../../hooks/useData'

import colors from "../../styles/colors";

import {
  ButtonSvg,
  Divider,
  NameContainer,
  Title,
  Avatar,
  FirstLetter,
  ListContainer
} from "./styles";

import {
  SwipeableDrawer,
  AppBar,
  Toolbar,
  Typography,
  Badge,
  Menu,
  List,
  ListItem,
  ListItemText,
  Fade,
  Paper,
  Popper,
  Button,
  MenuItem,
  ListItemIcon,
  IconButton,
} from "@material-ui/core";

import {
  Menu as MenuIcon,
  AccountCircle,
  Notifications,
  Home,
  Cancel,
  Storage,
  Person,
} from "@material-ui/icons";

import PopupState, { bindToggle, bindPopper } from "material-ui-popup-state";

import ConfirmationMenu from "../../components/ConfirmationMenu";
import NotificationCard from "../../components/NotificationCard";

import {
  coachWithTeamList,
  coachWithoutTeam,
  presidentWithoutTeam,
  presidentWithTeamList,
  noProfessionList,
} from "./lists";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    alertButton: {
      height: 150,
    },
    iconButton: {
      padding: 12,
      boxShadow: "none",
      backgroundColor: colors.dark,
      borderRadius: "50%",

      "&:hover": {
        backgroundColor: "transparent",
        boxShadow: "none",
      },
    },
    typography: {
      padding: theme.spacing(2),
    },
    menu: {
      "& .MuiPaper-root": {
        backgroundColor: colors.dark,
        color: colors.lightGray,
      },
    },
    listBackground: {
      "& .MuiList-root": {
        backgroundColor: colors.dark
      }
    },
    fullList: {
      width: "auto",
    },
    grow: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      display: "none",
      fontFamily: "Roboto",
      [theme.breakpoints.up("sm")]: {
        display: "block",
      },
    },
    sectionDesktop: {
      [theme.breakpoints.up("md")]: {
        display: "flex",
      },
    },
    sectionMobile: {
      display: "flex",
      [theme.breakpoints.up("md")]: {
        display: "none",
      },
    },
  })
);

const NavBar: React.FC = () => {
  const history = useHistory();

  const { user, logout } = useData()

  const [state, setState] = React.useState({
    open: false,
  });

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      setState({ ...state, open });
    };

  interface option {
    title: String;
    icon: JSX.Element;
    route: string;
  }

  type list = option[];

  const whatIsTheList = (): list => {
    if (user.profession === "") {
      return noProfessionList;
    } else if (user.user.teamId === "") {
      if (user.profession === "President") {
        return presidentWithoutTeam;
      } else {
        return coachWithoutTeam;
      }
    } else if (user.profession === "Coach") {
      return coachWithTeamList;
    } else {
      return presidentWithTeamList;
    }
  };

  function SwipeableTemporaryDrawer() {
    const classes = useStyles();

    const list = () => (
      <ListContainer
        style={{
          backgroundColor: colors.dark,
          width: "25rem"
        }}
        role="presentation"
        onClick={toggleDrawer(false)}
        onKeyDown={toggleDrawer(false)}
      >
        <NameContainer>
          <Title>{user.user.username}</Title>
          <Avatar>
            <FirstLetter>{user.user.username.split("")[0]}</FirstLetter>
          </Avatar>
        </NameContainer>
        <List>
          {whatIsTheList().map((item, index) => (
            <div key={index}>
              <ListItem
                button
                onClick={() => {
                  history.push(item.route);
                }}
              >
                <ListItemIcon style={{ color: colors.green }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.title}
                  style={{ color: colors.lightGray }}
                />
              </ListItem>
              <Divider />
            </div>
          ))}
        </List>
      </ListContainer>
    );

    return (
      <SwipeableDrawer
        className={classes.listBackground}
        anchor={"left"}
        open={state["open"]}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        {list()}
      </SwipeableDrawer>
    );
  }

  function PrimarySearchAppBar() {
    const classes = useStyles();

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const isMenuOpen = Boolean(anchorEl);

    const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
      setAnchorEl(null);
    };

    const [open, setOpen] = useState(false);

    const handleClickOpenConfirmLogout = () => {
      handleMenuClose();
      setOpen(true);
    };

    const handleCloseConfirmLogout = () => {
      setOpen(false);
      history.push("/login");
      logout();
    };

    const handleCloseMenu = () => {
      setOpen(false);
    };

    const goHome = () => {
      if (user.profession === "") {
        history.push("/choise");
        return;
      } else if (user.user.teamId === "") {
        history.push("/findteam");
        return;
      }
      history.push("/home");
      return;
    };

    const goToProfille = () => {
      return history.push("/userprofile");
    };

    const menuId = "primary-search-account-menu";
    const renderMenu = (
      <Menu
        className={classes.menu}
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        id={menuId}
        keepMounted
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={isMenuOpen}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={goToProfille}>
          <Person style={{ marginRight: "10px", color: colors.green }} />
          Perfil
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <Storage style={{ marginRight: "10px", color: colors.green }} />
          Meus dados
        </MenuItem>
        <MenuItem onClick={handleClickOpenConfirmLogout}>
          <Cancel style={{ marginRight: "10px", color: colors.green }} />
          Sair
        </MenuItem>
      </Menu>
    );

    const renderDialog = (
      <ConfirmationMenu open={open} onClose={handleCloseConfirmLogout} title="Quer mesmo sair?">
        <IconButton
          onClick={handleCloseMenu}
          className={classes.alertButton}
          style={{ color: colors.red }}
        >
          <ButtonSvg width="80" height="81" viewBox="0 0 31.515 35.311">
            <path
              id="Noooo"
              d="M875.558,9903.624H862.806v-6.556l1.084-1.085,1.04,1.04v4.477h10.627v-19.125l8.5-4.251H864.93v6.472l-1.04,1.039-1.084-1.084V9876h25.5v27.624L875.558,9910Zm-11.667-10.8-3.875,3.875L858,9894.686l3.877-3.875L858,9886.934l2.017-2.015,3.875,3.875,3.877-3.875,1.99,2.042-3.85,3.85,3.875,3.875-2.015,2.018Z"
              transform="translate(-857.291 -9875.5)"
              fill={colors.red}
              stroke="rgba(0,0,0,0)"
              strokeWidth="1"
            ></path>
          </ButtonSvg>
        </IconButton>
        <IconButton
          onClick={handleCloseConfirmLogout}
          className={classes.alertButton}
          style={{ color: colors.green }}
        >
          <ButtonSvg width="80" height="81" viewBox="0 0 31.875 34">
            <path
              id="Sair"
              d="M-1067.666-128.647h-10.625V-131.6h10.625v-4.9l6.375,6.375-6.375,6.375Zm21.25-16.353v27.625l-12.75,6.375v-6.375h-12.75v-8.5h2.125v6.375h10.625v-19.125l8.5-4.25h-19.125v8.5h-2.125V-145Z"
              transform="translate(1078.291 145)"
              fill={colors.green}
            ></path>
          </ButtonSvg>
        </IconButton>
      </ConfirmationMenu>
    );

    return (
      <div className={classes.grow}>
        <AppBar
          position="static"
          style={{ backgroundColor: colors.dark, color: colors.green }}
        >
          <Toolbar>
            <IconButton
              style={{ color: colors.green }}
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              className={classes.title}
              variant="h6"
              noWrap
              style={{ color: colors.green, fontSize: 12 }}
            >
              W O R L D S O C C E R O N L I N E
            </Typography>
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              <IconButton
                aria-label="show new notifications"
                color="inherit"
                onClick={goHome}
              >
                <Home />
              </IconButton>
              <PopupState variant="popper" popupId="demo-popup-popper">
                {(popupState) => (
                  <>
                    <Button
                      variant="contained"
                      {...bindToggle(popupState)}
                      color="inherit"
                      className={classes.iconButton}
                    >
                      <Badge badgeContent={1} color="error">
                        <Notifications />
                      </Badge>
                    </Button>
                    <Popper
                      {...bindPopper(popupState)}
                      transition
                      className={classes.menu}
                    >
                      {({ TransitionProps }) => (
                        <Fade {...TransitionProps} timeout={350}>
                          <Paper>
                            <Typography
                              className={classes.typography}
                              style={{
                                color: colors.green,
                                fontWeight: 500,
                                fontSize: 18,
                              }}
                            >
                              Notificações
                            </Typography>
                            <Divider />
                            <NotificationCard
                              id="djfsfg373rywg"
                              title="Notificação"
                              text="O conteúdo da notificação."
                            />
                            <Divider />
                            <NotificationCard
                              id="gkfgjdf8gdug9dfg"
                              title="Notificação"
                              text="O conteúdo da notificação fgsdgdfgdgdfgssssssssssssssssssss."
                            />
                            <Divider />
                            <NotificationCard
                              id="jfhs7834hgdfyr78"
                              title="Notificação"
                              text="O conteúdo da notificação."
                            />
                          </Paper>
                        </Fade>
                      )}
                    </Popper>
                  </>
                )}
              </PopupState>
              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        {renderMenu}
        {renderDialog}
      </div>
    );
  }

  return (
    <>
      <PrimarySearchAppBar />
      <SwipeableTemporaryDrawer />
    </>
  );
};

export default NavBar;
