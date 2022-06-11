import React from "react"
import PropTypes from "prop-types"
import { makeStyles } from "@material-ui/core/styles"
import AppBar from "@material-ui/core/AppBar"
import Tabs from "@material-ui/core/Tabs"
import Tab from "@material-ui/core/Tab"
import Typography from "@material-ui/core/Typography"
import Box from "@material-ui/core/Box"
import AccountSettings from "./Profile/Settings/AccountSettings"
import BrandSettings from "./Profile/Settings/BrandSettings"
import EmailNotification from "./Profile/Settings/EmailNotification"
import AddTrainer from "./Profile/Settings/Trainer/Trainer"
import theme from "../theme"
import { MuiThemeProvider } from "@material-ui/core/styles"
import { Container, Row, Col } from "reactstrap"
import { BRAND_COLOR } from "../Constants/Constants"

function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
}

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    "aria-controls": `scrollable-auto-tabpanel-${index}`
  }
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper
  },
  tabBar: {
    borderBottom: `1px solid #B0B0B0`
  }
}))

export default function ScrollableTabsButtonAuto() {
  const classes = useStyles()
  const [value, setValue] = React.useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <MuiThemeProvider theme={theme}>
      <div className={classes.root}>
        <div className={classes.tabBar}>
          {" "}
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="scrollable"
            scrollButtons="auto"
            aria-label="scrollable auto tabs example"
          >
            <Tab
              style={{
                color: value === 0 ? BRAND_COLOR : "",
                fontWeight: value === 0 ? "600" : ""
              }}
              label="Account"
              {...a11yProps(0)}
            />
            <Tab
              style={{
                color: value === 1 ? BRAND_COLOR : "",
                fontWeight: value === 1 ? "600" : ""
              }}
              label="Brand"
              {...a11yProps(1)}
            />
            {/* <Tab
              style={{
                color: value === 2 ? BRAND_COLOR : '',
                fontWeight: value === 2 ? '600' : ''
              }}
              label='Notifications'
              {...a11yProps(2)}
            /> */}
            <Tab
              style={{
                color: value === 2 ? BRAND_COLOR : "",
                fontWeight: value === 2 ? "600" : ""
              }}
              label="Add Users"
              {...a11yProps(2)}
            />
          </Tabs>
        </div>
        <TabPanel value={value} style={{}} index={0}>
          <AccountSettings />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <BrandSettings />
        </TabPanel>
        {/* <TabPanel value={value} index={}>
          <EmailNotification />
        </TabPanel> */}
        <TabPanel value={value} index={2}>
          <AddTrainer />
        </TabPanel>
      </div>
    </MuiThemeProvider>
  )
}
