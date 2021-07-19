import React from "react";
import { Container, Row, Col } from "reactstrap";
import DorpDown from "../../components/ui-elements/DropDown";
import "../../css/Members.css";
import ProfilePic from "../../assets/images/Ellipse 2.png";
import ProfilePic1 from "../../assets/images/Ellipsec.png";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import EmailIcon from "@material-ui/icons/Email";

import { useHistory } from "react-router-dom";

const Members = () => {
  const history = useHistory();
  const options = [
    {
      key: "option-1",
      value: "All"
    },
    {
      key: "option-2",
      value: "Newest"
    },
    {
      key: "option-3",
      value: "Old"
    }
  ];
  return (
    <>
      <Container>
        <Row>
          <div className="mt-3 all_member text-lg-left  text-md-left text-sm-center text-center">
            All Members (100)
          </div>

          <div className="  ">
            <Row>
              <div className="p-1">
                <DorpDown
                  color="white"
                  type="select"
                  options={options}
                  label="Category"
                  width="200px"
                  height="2.5rem"
                />
              </div>
              <div className="p-1">
                <DorpDown
                  color="white"
                  type="select"
                  options={options}
                  label="Status"
                  width="200px"
                  height="2.5rem"
                />
              </div>
              <div className="p-1">
                <DorpDown
                  color="white"
                  type="select"
                  options={options}
                  label="Priority"
                  width="200px"
                  height="2.5rem"
                />
              </div>
            </Row>
          </div>
        </Row>
      </Container>
      <div className="table_overflow">
        <table className="custom_table  ">
          <thead>
            <th>
              name
              <ExpandMoreIcon />
            </th>
            <th>
              Category <ExpandMoreIcon />
            </th>
            <th>
              Last activity <ExpandMoreIcon />
            </th>
            <th>
              Priority <ExpandMoreIcon />
            </th>
            <th>
              Status <ExpandMoreIcon />
            </th>
          </thead>
          <tbody>
            <tr onClick={() => history.push("./member-full-info")}>
              <td>
                <div className="d-flex justify-content-center">
                  <img
                    src={ProfilePic}
                    className=""
                    width="35px"
                    height="35px"
                  />

                  <p>
                    <ul style={{ listStyle: "none" }} className="p-0">
                      <li> Robert Fox</li>
                      <li>
                        {" "}
                        <span
                          style={{
                            fontSize: "10px",
                            color: "rgba(176, 176, 176, 1)"
                          }}
                        >
                          Added 08, October 2019
                        </span>
                      </li>
                    </ul>
                  </p>
                </div>
              </td>
              <td>Membership</td>
              <td>18 days ago</td>
              <td className="high">HIGH</td>
              <td>Active</td>
              <td>
                <EmailIcon
                  style={{
                    background: "rgba(16, 195, 235, 0.06)",
                    padding: "5px",
                    color: "rgba(66, 159, 186, 0.89)",
                    width: "50px",
                    height: "40px",
                    borderRadius: "5px",
                    cursor: "pointer"
                  }}
                  onClick={e => {
                    e.preventDefault();
                    history.push("/inbox");
                  }}
                />
              </td>
            </tr>

            <tr>
              <td>
                <div
                  className="d-flex justify-content-center"
                  style={{ display: "inline" }}
                >
                  <img
                    src={ProfilePic1}
                    className=""
                    width="35px"
                    height="35px"
                  />

                  <p>
                    <ul style={{ listStyle: "none" }} className="p-0">
                      <li> Jacob Jones</li>
                      <li>
                        {" "}
                        <span
                          style={{
                            fontSize: "10px",
                            color: "rgba(176, 176, 176, 1)"
                          }}
                        >
                          joined 08, October 2019
                        </span>
                      </li>
                    </ul>
                  </p>
                </div>
              </td>
              <td>Ticket </td>
              <td>18 days ago</td>
              <td className="low">LOW</td>
              <td>Active</td>
              <td>
                <EmailIcon
                  style={{
                    background: "rgba(16, 195, 235, 0.06)",
                    padding: "5px",
                    color: "rgba(66, 159, 186, 0.89)",
                    width: "50px",
                    height: "40px",
                    borderRadius: "5px"
                  }}
                  onClick={e => {
                    e.preventDefault();
                    history.push("/inbox");
                  }}
                />
              </td>
            </tr>
            <tr>
              <td>
                <div
                  className="d-flex justify-content-center"
                  style={{ display: "inline" }}
                >
                  <img
                    src={ProfilePic1}
                    className=""
                    width="35px"
                    height="35px"
                  />

                  <p>
                    <ul style={{ listStyle: "none" }} className="p-0">
                      <li> Jacob Jones</li>
                      <li>
                        {" "}
                        <span
                          style={{
                            fontSize: "10px",
                            color: "rgba(176, 176, 176, 1)"
                          }}
                        >
                          joined 08, October 2019
                        </span>
                      </li>
                    </ul>
                  </p>
                </div>
              </td>
              <td>Ticket </td>
              <td>18 days ago</td>
              <td className="normal">NORMAL</td>
              <td>Active</td>
              <td>
                <EmailIcon
                  style={{
                    background: "rgba(16, 195, 235, 0.06)",
                    padding: "5px",
                    color: "rgba(66, 159, 186, 0.89)",
                    width: "50px",
                    height: "40px",
                    borderRadius: "5px"
                  }}
                  onClick={e => {
                    e.preventDefault();
                    history.push("/inbox");
                  }}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Members;
