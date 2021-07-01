import React, { useRef } from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MailIcon from "@material-ui/icons/Mail";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MoreIcon from "@material-ui/icons/MoreVert";
import EmailOutlinedIcon from "@material-ui/icons/EmailOutlined";
import NotificationImportantOutlinedIcon from "@material-ui/icons/NotificationImportantOutlined";
import User from "../../assets/images/Ellipse 2.png";
import Collapse from "@material-ui/core/Collapse";
import DraftsIcon from "@material-ui/icons/Drafts";
import SendIcon from "@material-ui/icons/Send";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import StarBorder from "@material-ui/icons/StarBorder";
import { sideBarData } from "./SideBarData";
import { IndeterminateCheckBox, Payment } from "@material-ui/icons";
import { useHistory, useLocation } from "react-router-dom";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import LibraryAddIcon from "@material-ui/icons/LibraryAdd";
import WifiIcon from "@material-ui/icons/Wifi";
import FlagIcon from "@material-ui/icons/Flag";
import LinkIcon from "@material-ui/icons/Link";
import HeadsetIcon from "@material-ui/icons/Headset";
import SettingsIcon from "@material-ui/icons/Settings";
import PostAddIcon from "@material-ui/icons/PostAdd";
import PaymentIcon from "@material-ui/icons/Payment";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import StarIcon from "@material-ui/icons/Star";
import HomeIcon from "@material-ui/icons/Home";
import InsertInvitationIcon from "@material-ui/icons/InsertInvitation";
import ExitToAppRoundedIcon from "@material-ui/icons/ExitToAppRounded";
import { Star } from "react-feather";
import { createFalse } from "typescript";
import EmailPopup from "../ui-elements/EmailPopup";
import SearchBar from "../ui-elements/TopSearchBar";
import { positions, Provider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

const options = {
  timeout: 5000,
  position: positions.TOP_RIGHT,
};
const drawerWidth = 247;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    backgroundColor: "white",
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  listText: {
    color: "#7A7D7D",
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: "14px",
    lineHeight: "18px",
    marginLeft: "10px",
  },
  activelistText: {
    color: "white",
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: "14px",
    lineHeight: "18px",
    marginLeft: "10px",
  },
  activesublistText: {
    color: "white",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: "50px",

    marginLeft: "-20px",
  },
  sublistText: {
    color: "#7A7D7D",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: "50px",

    marginLeft: "-20px",
  },
  menuButton: {
    marginRight: theme.spacing(2),
    color: "black",
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    backgroundColor: "#262929",
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    backgroundColor: "white",
    padding: theme.spacing(3),
    minHeight: "100vh",
    maxWidth: "100%",
  },
  iconCircle: {
    width: "50px",
    height: "50px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#696C6C1A",
    borderRadius: "50%",
  },
  activeiconCircle: {
    width: "50px",
    height: "50px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#429FBA",
    borderRadius: "50%",
  },
  icon: {
    color: "#7A7D7D",
  },
  activeIcon: {
    color: "white",
  },
  sectionDesktop: {
    display: "none",
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
  logoutText: {
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: "14px",
    marginLeft: "10px",
    lineHeight: "26px",
  },
  nested: {
    paddingLeft: theme.spacing(6),
  },
  "@global": {
    "*::-webkit-scrollbar": {
      width: "0.2rem",
      height: "0.2rem",
    },
    "*::-webkit-scrollbar-track": {
      "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.00)",
    },
    "*::-webkit-scrollbar-thumb": {
      backgroundColor: "#7A7D7D",
      borderRadius: "10px",
      outline: "1px solid slategrey",
    },
  },
}));

function ResponsiveDrawer(props) {
  const location = useLocation();
  const searchBarLinks = [
    "/live",
    "/reviews",
    "/upload-live-class",
    "/challenges",
    "/upload-challenges",
    "/link",
    "/add-link",
    "/members",
    "/classes",
    "/upload-classes",
    "/videos",
    "/upload-videos",
  ];
  const history = useHistory();
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const [openClasses, setOpenClasses] = React.useState(false);
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  const handleClick = () => {
    setOpen(!open);
  };
  const handleClassesOpen = () => {
    setOpenClasses(!openClasses);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="secondary">
            <EmailOutlinedIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={11} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );
  const drawer = (
    <div>
      <List>
        <ListItem button>
          <div className={classes.activeiconCircle}>
            <EmailOutlinedIcon className={classes.activeIcon} />
          </div>

          <ListItemText className={classes.listText} primary={"Brand Name"} />
        </ListItem>
      </List>
      <Divider />
      <List>
        {sideBarData.map((list, index) => (
          <div
            onClick={(e) => {
              e.preventDefault();
              if (list.sublist) {
                if (list.text === "Profile") {
                  handleClick();
                  setOpenClasses(false);
                } else {
                  handleClassesOpen();
                  setOpen(false);
                }
              }
              history.push(list.link);
            }}
          >
            {" "}
            <ListItem button key={index}>
              <div
                className={
                  location.pathname === list.link ||
                  (list.sublist &&
                    list.sublistData
                      .map((val) => val.link)
                      .includes(location.pathname))
                    ? classes.activeiconCircle
                    : classes.iconCircle
                }
              >
                {list.text === "Home" && (
                  <HomeIcon
                    className={
                      location.pathname === list.link ||
                      (list.sublist &&
                        list.sublistData
                          .map((val) => val.link)
                          .includes(location.pathname))
                        ? classes.activeIcon
                        : classes.icon
                    }
                  />
                )}
                {list.text === "Profile" && (
                  <AccountCircleIcon
                    className={
                      location.pathname === list.link ||
                      (list.sublist &&
                        list.sublistData
                          .map((val) => val.link)
                          .includes(location.pathname))
                        ? classes.activeIcon
                        : classes.icon
                    }
                  />
                )}
                {list.text === "Members" && (
                  <PeopleAltIcon
                    className={
                      location.pathname === list.link ||
                      (list.sublist &&
                        list.sublistData
                          .map((val) => val.link)
                          .includes(location.pathname))
                        ? classes.activeIcon
                        : classes.icon
                    }
                  />
                )}
                {list.text === "Library" && (
                  <LibraryAddIcon
                    className={
                      location.pathname === list.link ||
                      (list.sublist &&
                        list.sublistData
                          .map((val) => val.link)
                          .includes(location.pathname))
                        ? classes.activeIcon
                        : classes.icon
                    }
                  />
                )}
                {list.text === "Live" && (
                  <WifiIcon
                    className={
                      location.pathname === list.link ||
                      (list.sublist &&
                        list.sublistData
                          .map((val) => val.link)
                          .includes(location.pathname))
                        ? classes.activeIcon
                        : classes.icon
                    }
                  />
                )}
                {list.text === "Challenges" && (
                  <FlagIcon
                    className={
                      location.pathname === list.link ||
                      (list.sublist &&
                        list.sublistData
                          .map((val) => val.link)
                          .includes(location.pathname))
                        ? classes.activeIcon
                        : classes.icon
                    }
                  />
                )}
                {list.text === "Link" && (
                  <LinkIcon
                    className={
                      location.pathname === list.link ||
                      (list.sublist &&
                        list.sublistData
                          .map((val) => val.link)
                          .includes(location.pathname))
                        ? classes.activeIcon
                        : classes.icon
                    }
                  />
                )}
                {list.text === "Support" && (
                  <HeadsetIcon
                    className={
                      location.pathname === list.link ||
                      (list.sublist &&
                        list.sublistData
                          .map((val) => val.link)
                          .includes(location.pathname))
                        ? classes.activeIcon
                        : classes.icon
                    }
                  />
                )}
              </div>

              <ListItemText
                className={
                  location.pathname === list.link ||
                  (list.sublist &&
                    list.sublistData
                      .map((val) => val.link)
                      .includes(location.pathname))
                    ? classes.activelistText
                    : classes.listText
                }
                primary={list.text}
              />
              {list.sublist ? (
                list.text === "Profile" ? (
                  open ? (
                    <ExpandLess className={classes.icon} />
                  ) : (
                    <ExpandMore className={classes.icon} />
                  )
                ) : openClasses ? (
                  <ExpandLess className={classes.icon} />
                ) : (
                  <ExpandMore className={classes.icon} />
                )
              ) : (
                ""
              )}
            </ListItem>{" "}
            {list.sublist && (
              <Collapse
                in={list.text === "Profile" ? open : openClasses}
                timeout="auto"
              >
                <List component="div">
                  {list.sublistData.map((sblist, i) => (
                    <ListItem
                      button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();

                        history.push(sblist.link);
                      }}
                      key={i}
                      className={classes.nested}
                    >
                      <ListItemIcon>
                        {sblist.title === "Settings" && (
                          <SettingsIcon
                            className={
                              location.pathname === sblist.link
                                ? classes.activeIcon
                                : classes.icon
                            }
                          />
                        )}
                        {sblist.title === "Membership" && (
                          <PostAddIcon
                            className={
                              location.pathname === sblist.link
                                ? classes.activeIcon
                                : classes.icon
                            }
                          />
                        )}
                        {sblist.title === "Payment" && (
                          <PaymentIcon
                            className={
                              location.pathname === sblist.link
                                ? classes.activeIcon
                                : classes.icon
                            }
                          />
                        )}
                        {sblist.title === "Subscription" && (
                          <CheckBoxIcon
                            className={
                              location.pathname === sblist.link
                                ? classes.activeIcon
                                : classes.icon
                            }
                          />
                        )}
                        {sblist.title === "LandingPage" && (
                          <InsertInvitationIcon
                            className={
                              location.pathname === sblist.link
                                ? classes.activeIcon
                                : classes.icon
                            }
                          />
                        )}
                        {sblist.title === "Reviews" && (
                          <StarBorder
                            className={
                              location.pathname === sblist.link
                                ? classes.activeIcon
                                : classes.icon
                            }
                          />
                        )}{" "}
                        {sblist.title === "Classes" && (
                          <InsertInvitationIcon
                            className={
                              location.pathname === sblist.link
                                ? classes.activeIcon
                                : classes.icon
                            }
                          />
                        )}{" "}
                        {sblist.title === "Videos" && (
                          <InsertInvitationIcon
                            className={
                              location.pathname === sblist.link
                                ? classes.activeIcon
                                : classes.icon
                            }
                          />
                        )}
                      </ListItemIcon>
                      <ListItemText
                        primary={sblist.title}
                        className={
                          location.pathname === sblist.link
                            ? classes.activesublistText
                            : classes.sublistText
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              </Collapse>
            )}
          </div>
        ))}
      </List>
      <div
        className="mt-5 d-flex align-items-center ml-3 text-light mb-4 "
        style={{ cursor: "pointer" }}
        onClick={() => {
          localStorage.clear();
          history.push("/login");
        }}
      >
        <ExitToAppRoundedIcon fontSize="14px" />{" "}
        <div className={classes.logoutText}>Log out</div>
      </div>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;
  const notificationRef = useRef();

  return (
    <Provider template={AlertTemplate} {...options}>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              width="100%"
            >
              {" "}
              <Box display="flex" alignItems="center">
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  edge="start"
                  onClick={handleDrawerToggle}
                  className={classes.menuButton}
                >
                  <MenuIcon />
                </IconButton>
                {console.log(location)}
                <div className={classes.sectionDesktop}>
                  {" "}
                  {searchBarLinks.includes(location.pathname) ? (
                    <SearchBar />
                  ) : (
                    <Typography variant="h6" style={{ color: "black" }} noWrap>
                      Welcome Andrew!
                    </Typography>
                  )}
                </div>
              </Box>
              <div>
                {/*               
            <div className={classes.sectionDesktop> */}
                <IconButton aria-label="show 4 new mails" color="inherit">
                  <Badge badgeContent={4} color="secondary">
                    <EmailOutlinedIcon className={classes.icon} />
                  </Badge>
                </IconButton>

                <IconButton
                  aria-label="show 17 new notifications"
                  color="inherit"
                  onClick={() => {
                    if (notificationRef.current.style.display === "block") {
                      notificationRef.current.style.display = "none";
                    } else {
                      notificationRef.current.style.display = "block";
                    }
                  }}
                >
                  <Badge badgeContent={17} color="secondary">
                    <NotificationImportantOutlinedIcon
                      className={classes.icon}
                    />
                  </Badge>
                </IconButton>
                <div
                  style={{
                    display: "none",
                    position: "fixed",
                    top: 40,
                    right: 82,
                    zIndex: 9,
                  }}
                  ref={notificationRef}
                >
                  <EmailPopup />
                </div>
                <IconButton
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="inherit"
                >
                  <img src={User} />
                </IconButton>
              </div>{" "}
              {/* <div className={classes.sectionMobile}>
              <IconButton
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon className={classes.icon} />
              </IconButton>
            </div> */}
            </Box>
          </Toolbar>
        </AppBar>{" "}
        {/* {renderMobileMenu}
      {renderMenu} */}
        <nav className={classes.drawer} aria-label="mailbox folders">
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Hidden smUp implementation="css">
            <Drawer
              container={container}
              variant="temporary"
              anchor={theme.direction === "rtl" ? "right" : "left"}
              open={mobileOpen}
              onClose={handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper,
              }}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper,
              }}
              variant="permanent"
              open
            >
              {drawer}
            </Drawer>
          </Hidden>
        </nav>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {props.children}
        </main>
      </div>
    </Provider>
  );
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default ResponsiveDrawer;
