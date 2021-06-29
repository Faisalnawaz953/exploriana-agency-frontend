import { useState, useRef } from "react";
import {
  ProSidebar,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
  Menu,
  MenuItem,
  SubMenu,
} from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import { Link } from "react-router-dom";
import ToggleButton from "@material-ui/lab/ToggleButton";
import FormatAlignLeftIcon from "@material-ui/icons/FormatAlignLeft";
import * as classes from "../css/Sidebar.module.css";
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

const SideBar = () => {
  const [sidebarToggle, setSidebarToggle] = useState(false);
  const toggleButton = useRef();

  return (
    <div className="app">
      {!sidebarToggle && (
        <div className={classes.buttonWrapper}>
          <ToggleButton
            value="left"
            id={classes.btn}
            aria-label="left aligned"
            onClick={() => {
              setSidebarToggle(!sidebarToggle);
            }}
            ref={toggleButton}
          >
            <FormatAlignLeftIcon />
          </ToggleButton>
        </div>
      )}

      <ProSidebar
        width="247px"
        breakPoint="md"
        collapsed={false}
        onToggle={() => {
          setSidebarToggle(!sidebarToggle);
        }}
        toggled={sidebarToggle}
      >
        <SidebarHeader>
          <h4>brand name</h4>
        </SidebarHeader>
        <SidebarContent>
          <Menu iconShape="circle">
            <MenuItem icon={<HomeIcon />}>
              {" "}
              <Link to={"home"}>Home</Link>
            </MenuItem>
            <SubMenu
              title={
                <Link to={"Profile"} icon={<AccountCircleIcon />}>
                  Profile
                </Link>
              }
            >
              <MenuItem icon={<SettingsIcon />}>Settings</MenuItem>
              <MenuItem icon={<PostAddIcon />}>
                <Link to={"member-ship"}>Membership</Link>
              </MenuItem>
              <MenuItem icon={<PaymentIcon />}>
                <Link to={"payment"}>Payment</Link>
              </MenuItem>
              <MenuItem icon={<CheckBoxIcon />}>Subscription</MenuItem>
              <MenuItem icon={<InsertInvitationIcon />}>
                <Link to={"landing-page"}>Landing Page</Link>
              </MenuItem>
              <MenuItem icon={<StarIcon />}>Reviews</MenuItem>
            </SubMenu>
            <MenuItem icon={<PeopleAltIcon style={{}} />} active={true}>
              Members
            </MenuItem>
            <MenuItem icon={<LibraryAddIcon />}>Library</MenuItem>
            <MenuItem icon={<WifiIcon />}>Live</MenuItem>
            <MenuItem icon={<FlagIcon />}>Challenges</MenuItem>
            <MenuItem icon={<LinkIcon />}>Add Link</MenuItem>
            <MenuItem icon={<HeadsetIcon />}>Support</MenuItem>
          </Menu>
        </SidebarContent>
        <SidebarFooter>
          <h4>Log out</h4>
        </SidebarFooter>
      </ProSidebar>
    </div>
  );
};

export default SideBar;
