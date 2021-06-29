import { Container, Row, Col, Table } from "reactstrap";
import "../../../../css/customTable.css";
import IconButton from "../../../ui-elements/IconButton";
import ProfilePic from "../../../../assets/images/Ellipse 2.png";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import EmailIcon from "@material-ui/icons/Email";
import MoreVertIcon from "@material-ui/icons/MoreVert";

import { useHistory } from "react-router-dom";

const AddTrainer = () => {
  const history = useHistory();
  return (
    <>
      <Container>
        <Row>
          <Col md="10">
            <h4 className="mt-3  text-lg-left  text-md-left text-sm-center text-center">
              Trainers
            </h4>
          </Col>

          <IconButton
            title="Add Trainer"
            onClick={(e) => {
              e.preventDefault();
              history.push("/add-trainer-info");
            }}
          />
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
              Email <ExpandMoreIcon />
            </th>
            <th>
              Social Media Link <ExpandMoreIcon />
            </th>
            <th>
              Intro Video <ExpandMoreIcon />
            </th>
          </thead>
          <tbody>
            <tr onClick={() => history.push("/trainer-info")}>
              <td>
                <div className="d-flex justify-content-center align-items-center">
                  <img
                    src={ProfilePic}
                    className=""
                    width="40px"
                    height="50px"
                  />

                  <div className="mt-2 ">
                    <div> Robert Fox </div>
                    <div>
                      {" "}
                      <span
                        style={{
                          fontSize: "10px",
                          color: "rgba(176, 176, 176, 1)",
                        }}
                      >
                        Added 08, October 2019
                      </span>
                    </div>
                  </div>
                </div>
              </td>
              <td>robert45@gmail.com</td>
              <td>Instagram</td>
              <td>Yes</td>
              <td>
                <MoreVertIcon />
              </td>
              <td>
                <EmailIcon
                  style={{
                    background: "rgba(16, 195, 235, 0.06)",
                    padding: "5px",
                    color: "rgba(66, 159, 186, 0.89)",
                    width: "50px",
                    height: "40px",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                  onClick={(e) => {
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
                    src={ProfilePic}
                    className=""
                    width="40px"
                    height="50px"
                  />

                  <div className="mt-2 ">
                    <div> Robert Fox </div>
                    <div>
                      {" "}
                      <span
                        style={{
                          fontSize: "10px",
                          color: "rgba(176, 176, 176, 1)",
                        }}
                      >
                        Added 08, October 2019
                      </span>
                    </div>
                  </div>
                </div>
              </td>
              <td>robert45@gmail.com</td>
              <td>Instagram</td>
              <td>Yes</td>
              <td>
                <MoreVertIcon />
              </td>
              <td>
                <EmailIcon
                  style={{
                    background: "rgba(16, 195, 235, 0.06)",
                    padding: "5px",
                    color: "rgba(66, 159, 186, 0.89)",
                    width: "50px",
                    height: "40px",
                    borderRadius: "5px",
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

export default AddTrainer;
