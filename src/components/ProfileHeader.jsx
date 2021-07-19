import React, { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText
} from "reactstrap";
import User from "../assets/images/Ellipse 2.png";
import EmailOutlinedIcon from "@material-ui/icons/EmailOutlined";
import NotificationImportantOutlinedIcon from "@material-ui/icons/NotificationImportantOutlined";

const Example = props => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="white" light expand="md">
        <NavbarBrand href="/">Welcome Andrew!</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar></Nav>
          <NavbarText>
            <Nav>
              <NavItem>
                <NavLink href="">
                  {" "}
                  <EmailOutlinedIcon />
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink href=" ">
                  <NotificationImportantOutlinedIcon />
                </NavLink>
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  <img src={User} />
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>Option 1</DropdownItem>
                  <DropdownItem>Option 2</DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>Reset</DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </NavbarText>
        </Collapse>
      </Navbar>
      <hr />
    </div>
  );
};

export default Example;
