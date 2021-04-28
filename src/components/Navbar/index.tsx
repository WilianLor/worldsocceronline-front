import React from 'react'
import { 
  makeStyles, 
  Theme, 
  createStyles 
} from '@material-ui/core/styles'

import { 
  useSelector, 
  useDispatch 
} from 'react-redux'

import {UserState} from '../../store/userReducer'
import {logout} from '../../store/actions'

import colors from '../../styles/colors'

import { ButtonSvg } from './styles'

import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import AppBar from '@material-ui/core/AppBar'
import NotificationCard from '../NotificationCard'

import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Badge from '@material-ui/core/Badge'
import Menu from '@material-ui/core/Menu'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import clsx from "clsx"
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import Fade from '@material-ui/core/Fade';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import PopupState, { 
  bindToggle, 
  bindPopper 
} from 'material-ui-popup-state';
import Button from '@material-ui/core/Button';

import MenuItem from '@material-ui/core/MenuItem'
import MenuIcon from '@material-ui/icons/Menu'
import AccountCircle from '@material-ui/icons/AccountCircle'
import NotificationsIcon from '@material-ui/icons/Notifications'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import HomeIcon from '@material-ui/icons/Home'
import AssignmentIcon from '@material-ui/icons/Assignment';
import TableChartIcon from '@material-ui/icons/TableChart';
import ApartmentIcon from '@material-ui/icons/Apartment';
import DateRangeIcon from '@material-ui/icons/DateRange';
import PeopleIcon from '@material-ui/icons/People';
import SettingsIcon from '@material-ui/icons/Settings';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import SearchIcon from '@material-ui/icons/Search';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import AddIcon from '@material-ui/icons/Add';
import CancelIcon from '@material-ui/icons/Cancel';
import StorageIcon from '@material-ui/icons/Storage';
import PersonIcon from '@material-ui/icons/Person';
import IconButton from '@material-ui/core/IconButton'

  interface Infos {
    profession: String,
    username: String,
    teamId: String
}
    
const NavBar:React.FC = () => {

  const userInfos = useSelector<UserState, Infos>((state) => ({
    profession: state.profession,
    username: state.user.username,
    teamId: state.user.teamId
  }))

  const dispatch = useDispatch()

  const onLogout = () => {
    dispatch(logout())
  }

  const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    alertButton: {
      height: 150,
    },
    iconButton: {
      padding: 12,
      boxShadow: "none",
      backgroundColor: "transparent",
      borderRadius: "50%",
      
      "&:hover": {
        backgroundColor: "transparent",
        boxShadow: "none"
      }
    },
    typography: {
      padding: theme.spacing(2),
    },
    menu: {
      "& .MuiPaper-root": {
        backgroundColor: colors.dark,
        color: colors.lightGray
      },
    },
    list: {
      width: 250,
      height: "100vh",
    },
    fullList: {
      width: 'auto',
    },
    grow: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
    sectionDesktop: {
      [theme.breakpoints.up('md')]: {
        display: 'flex',
      },
    },
    sectionMobile: {
      display: 'flex',
      [theme.breakpoints.up('md')]: {
        display: 'none',
      },
    },  
  }),
);

const [state, setState] = React.useState({
  open: false,
  coachWithTeamList: [{
    title: "Plantel",
    icon: <AssignmentIcon/>,
    route: ""
  },
  {
    title: "Tabelas",
    icon: <TableChartIcon/>,
    route: ""
  },
  {
    title: "Instalações de treinamento",
    icon: <ApartmentIcon/>,
    route: ""
  },
  {
    title: "Calendário",
    icon: <DateRangeIcon/>,
    route: ""
  },
  {
    title: "Escalação",
    icon: <PeopleIcon/>,
    route: ""
  },
  {
    title: "Táticas",
    icon: <SettingsIcon/>,
    route: ""
  },
  {
    title: "Diretoría",
    icon: <SupervisorAccountIcon/>,
    route: ""
  },
  {
    title: "Pesquisar Jogador",
    icon: <SearchIcon/>,
    route: ""
  },
  {
    title: "Negociações",
    icon: <AutorenewIcon/>,
    route: "/coachtenders"
  },
  {
    title: "Buscar time",
    icon: <SearchIcon/>,
    route: "/findteam"
  }
],

  presidentWithTeamList: [{
    title: "Plantel",
    icon: <AssignmentIcon/>,
    route: ""
  },
  {
    title: "Tabelas",
    icon: <TableChartIcon/>,
    route: ""
  },
  {
    title: "Estádio",
    icon: <AccountBalanceIcon/>,
    route: ""
  },
  {
    title: "Calendário",
    icon: <DateRangeIcon/>,
    route: ""
  },
  {
    title: "Técnico",
    icon: <EmojiPeopleIcon/>,
    route: ""
  },
  {
    title: "Buscar time",
    icon: <SearchIcon/>,
    route: "/findteam"
  },
  {
    title: "Balanço do clube",
    icon: <AttachMoneyIcon/>,
    route: ""
  },
  {
    title: "Negociações com Treinadores",
    icon: <AutorenewIcon/>,
    route: "/coachtenders"
  },
  {
    title: "Buscar Treinador",
    icon: <SearchIcon/>,
    route: "/findcoach"
  },
  {
    title: "Funcionário",
    icon: <GroupAddIcon/>,
    route: ""
  },
],

coachWithoutTeam: [{
  title: "Buscar time",
  icon: <SearchIcon/>,
  route: "/findteam"
  },
  {
    title: "Negociações com Times",
    icon: <AutorenewIcon/>,
    route: "/coachtenders"
  },
],

presidentWithoutTeam: [{
  title: "Buscar time",
  icon: <SearchIcon/>,
  route: "/findteam"
  },
],

noProfessionList: [{
  title: "Escolher Profissão",
  icon: <AddIcon/>,
  route: "/choise"
  }
],
});

const toggleDrawer = ( open: boolean) => (
  event: React.KeyboardEvent | React.MouseEvent,
) => {
  setState({ ...state,  open });
};

interface option {
  title: String,
  icon: JSX.Element,
  route: string
}

type list = option[]

const whatIsTheList = ():list  => {
  if(userInfos.profession === "" ){
    return state.noProfessionList
  }
  else if(userInfos.teamId === ""){
    if(userInfos.profession === "President"){
      return state.presidentWithoutTeam
    } else {
      return state.coachWithoutTeam
    }
  }
  else if (userInfos.profession === "Coach"){
    return state.coachWithTeamList
  }
  else {
    return state.presidentWithTeamList
  }
}

function SwipeableTemporaryDrawer() {

  const classes = useStyles();

  const list = () => (
    <div
      style={{backgroundColor: colors.dark}}
      className={clsx(classes.list)}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <Typography className={classes.title} variant="h6" noWrap style={{color: colors.green, display: "flex", alignItems: "center", justifyContent: "center", marginTop: 20, marginBottom: 10 }}>
        {userInfos.username}
      </Typography>
      <Divider />
      <List>
        {
        whatIsTheList().map((item, index) => (
          <ListItem button key={index} onClick={() => {window.location.href = item.route}}>
            <ListItemIcon style={{color: colors.green}}>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.title}  style={{color: colors.lightGray,}}/>
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
      <SwipeableDrawer
        anchor={'left'}
        open={state['open']}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        >
        {list()}
      </SwipeableDrawer>
  );
}

 function PrimarySearchAppBar() {

  const classes = useStyles()

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  
    const isMenuOpen = Boolean(anchorEl)
  
    const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget)
    };
  
    const handleMenuClose = () => {
      setAnchorEl(null)
    };

    const [open, setOpen] = React.useState(false);
    
    const handleClickOpenConfirmLogout = () => {
      handleMenuClose()
      setOpen(true)
    };
    
    const handleCloseConfirmLogout = () => {
      setOpen(false)
      window.location.href = "/login"
      onLogout()
    };

    const handleCloseMenu = () => {
      setOpen(false)
    }

    const goHome = () => {
      if(userInfos.profession === ""){
        window.location.href = "/choise"
        return;
      }
      else if(userInfos.teamId === ""){
        window.location.href = "/findteam"
        return;
      }
      window.location.href = "/home"
      return;
    }

    const goToProfille = () => {
      return window.location.href = "/userprofile"
    }
  
    const menuId = 'primary-search-account-menu';
    const renderMenu = (
      <Menu
        className={classes.menu}
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        id={menuId}
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMenuOpen}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={goToProfille}><PersonIcon style={{marginRight: "10px", color: colors.green}}/>Perfil</MenuItem >
        <MenuItem onClick={handleMenuClose} ><StorageIcon style={{marginRight: "10px", color: colors.green}}/>Meus dados</MenuItem>
        <MenuItem onClick={handleClickOpenConfirmLogout} ><CancelIcon style={{marginRight: "10px", color: colors.green}}/>Sair</MenuItem>
      </Menu>
    );

    const renderDialog = (
        <Dialog
            open={open}
            className={classes.menu}
            onClose={handleCloseConfirmLogout}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title" style={{marginBottom: "0px"}}>{"Quer mesmo sair?"}</DialogTitle>
            <DialogActions>
              
              <IconButton onClick={handleCloseMenu} className={classes.alertButton} style={{color: colors.red}}>
                <ButtonSvg width="80" height="81" viewBox="0 0 31.515 35.311"><path id="Noooo" d="M875.558,9903.624H862.806v-6.556l1.084-1.085,1.04,1.04v4.477h10.627v-19.125l8.5-4.251H864.93v6.472l-1.04,1.039-1.084-1.084V9876h25.5v27.624L875.558,9910Zm-11.667-10.8-3.875,3.875L858,9894.686l3.877-3.875L858,9886.934l2.017-2.015,3.875,3.875,3.877-3.875,1.99,2.042-3.85,3.85,3.875,3.875-2.015,2.018Z" transform="translate(-857.291 -9875.5)" fill={colors.red} stroke="rgba(0,0,0,0)" strokeWidth="1"></path></ButtonSvg>
              </IconButton>
              <IconButton onClick={handleCloseConfirmLogout} className={classes.alertButton} style={{color: colors.green}}>
                <ButtonSvg width="80" height="81" viewBox="0 0 31.875 34"><path id="Sair" d="M-1067.666-128.647h-10.625V-131.6h10.625v-4.9l6.375,6.375-6.375,6.375Zm21.25-16.353v27.625l-12.75,6.375v-6.375h-12.75v-8.5h2.125v6.375h10.625v-19.125l8.5-4.25h-19.125v8.5h-2.125V-145Z" transform="translate(1078.291 145)" fill={colors.green}></path></ButtonSvg>
              </IconButton>
            </DialogActions>
          </Dialog>
    )
  
    return (
      <div className={classes.grow}>
        <AppBar position="static" style={{backgroundColor: colors.dark, color: colors.green}}>
          <Toolbar>
            <IconButton
              style={{color: colors.green}}
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
            <Typography className={classes.title} variant="h6" noWrap style={{color: colors.green, fontSize: 12}}>
              W O R L D S O C C E R O N L I N E
            </Typography>
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              <IconButton aria-label="show new notifications" color="inherit" onClick={goHome}>
                <HomeIcon />
              </IconButton>
              <PopupState variant="popper" popupId="demo-popup-popper">
              {(popupState) => (<>
                  <Button variant="contained" {...bindToggle(popupState)} color="inherit" className={classes.iconButton}>
                    <Badge badgeContent={1} color="error">
                      <NotificationsIcon />
                    </Badge>
                  </Button>
                  <Popper {...bindPopper(popupState)} transition className={classes.menu}>
                    {({ TransitionProps }) => (
                      <Fade {...TransitionProps} timeout={350}>
                        <Paper>
                          <Typography className={classes.typography} style={{color: colors.green}}>Notificações</Typography>
                          <Divider />
                          <NotificationCard id="djfsfg373rywg" title="Notificação" text="O conteúdo da notificação."/>
                          <Divider />
                          <NotificationCard id="gkfgjdf8gdug9dfg" title="Notificação" text="O conteúdo da notificação fgsdgdfgdgdfg."/>
                          <Divider />
                          <NotificationCard id="jfhs7834hgdfyr78" title="Notificação" text="O conteúdo da notificação."/>
                        </Paper>
                      </Fade>
                    )}
                  </Popper>
              </>)}
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
    <div>
      <PrimarySearchAppBar />
      <SwipeableTemporaryDrawer />
    </div>
  );
}

export default NavBar



