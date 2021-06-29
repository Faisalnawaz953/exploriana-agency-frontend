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

export const sideBarData = [
  {
    icon: <HomeIcon style={{ color: "#7A7D7D" }} />,
    text: "Home",
    sublist: false,
    sublistData: [],
    link: "/",
  },
  {
    icon: <AccountCircleIcon style={{ color: "#7A7D7D" }} />,
    text: "Profile",
    sublist: true,
    sublistData: [
      {
        title: "Settings",
        icon: <SettingsIcon style={{ color: "#7A7D7D" }} />,
        link: "/profile",
      },
      {
        title: "Membership",
        icon: <PostAddIcon style={{ color: "#7A7D7D" }} />,
        link: "/membership",
      },
      {
        title: "Payment",
        icon: <PaymentIcon style={{ color: "#7A7D7D" }} />,
        link: "/payment",
      },
      {
        title: "Subscription",
        icon: <CheckBoxIcon style={{ color: "#7A7D7D" }} />,
        link: "/subscription",
      },
      {
        title: "LandingPage",
        icon: <InsertInvitationIcon style={{ color: "#7A7D7D" }} />,
        link: "/landing-page",
      },
      {
        title: "Reviews",
        icon: <StarIcon style={{ color: "#7A7D7D" }} />,
        link: "/reviews",
      },
    ],
    link: "/profile",
  },
  {
    icon: <PeopleAltIcon style={{ color: "#7A7D7D" }} />,
    text: "Members",
    sublist: false,
    sublistData: [],
    link: "/members",
  },
  {
    icon: <LibraryAddIcon style={{ color: "#7A7D7D" }} />,
    text: "Library",
    sublist: true,
    sublistData: [
      {
        title: "Classes",
        icon: <StarIcon style={{ color: "#7A7D7D" }} />,
        link: "/classes",
      },
      {
        title: "Videos",
        icon: <StarIcon style={{ color: "#7A7D7D" }} />,
        link: "/videos",
      },
    ],
    link: "/classes",
  },
  {
    icon: <WifiIcon style={{ color: "#7A7D7D" }} />,
    text: "Live",
    sublist: false,
    sublistData: [],
    link: "/live",
  },
  {
    icon: <FlagIcon style={{ color: "#7A7D7D" }} />,
    text: "Challenges",
    sublist: false,
    sublistData: [],
    link: "/challenges",
  },
  {
    icon: <LinkIcon style={{ color: "#7A7D7D" }} />,
    text: "Link",
    sublist: false,
    sublistData: [],
    link: "/link",
  },
  {
    icon: <HeadsetIcon style={{ color: "#7A7D7D" }} />,
    text: "Support",
    sublist: false,
    sublistData: [],
    link: "/support",
  },
];
