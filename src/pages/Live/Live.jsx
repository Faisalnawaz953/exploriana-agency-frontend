import { Container, Row, Col, FormGroup, CustomInput } from "reactstrap";
import "../../css/reviewsTable.css";
import DeleteIcon from "@material-ui/icons/DeleteOutline";
import ProfilePic from "../../assets/images/Rectangle 1350.png";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Button from "../../components/ui-elements/Button";
import IconButton from "../../components/ui-elements/IconButton";
import DorpDown from "../../components/ui-elements/DorpDown";
import { useHistory } from "react-router-dom";
import { MoreVert } from "@material-ui/icons";
import Calendar from "../../components/Calendar";

const Live = () => {
  const history = useHistory();
  const options = [
    {
      key: "option-1",
      value: "Newest",
    },
    {
      key: "option-2",
      value: "Old",
    },
  ];
  return (
    <>
      <Container>
        <Row>
          <div className="mt-3 member text-lg-left  text-md-left text-sm-center text-center">
            All Classes (100)
          </div>

          <div className="ml-auto ">
            <IconButton
              title="Add Class"
              onClick={() => {
                history.push("upload-live-class");
              }}
            />
          </div>
        </Row>
      </Container>
      <Calendar />
      <Container>
        <Row>
          <div className="mt-5   ">Thursday 08, October 2021</div>

          <div className="ml-auto  ">
            <Row>
              <div className="p-1">
                <DorpDown
                  color="white"
                  type="select"
                  options={options}
                  label="Type"
                  width="200px"
                  height="2.5rem"
                  backgroundColor
                />
              </div>
              <div className="p-1">
                <DorpDown
                  color="white"
                  type="select"
                  options={options}
                  label="Sort by"
                  width="200px"
                  height="2.5rem"
                  backgroundColor
                />
              </div>
            </Row>
          </div>
        </Row>
      </Container>
      <Col lg="12" md="12" sm="12" xs="12" className="table_overflow">
        <table className="custom_table  ">
          <thead>
            <th>
              Time
              <ExpandMoreIcon />
            </th>
            <th>
              Name <ExpandMoreIcon />
            </th>
            <th>
              Type <ExpandMoreIcon />
            </th>

            <th>
              Location <ExpandMoreIcon />
            </th>
            <th>
              Bookings <ExpandMoreIcon />
            </th>
            <th>
              Rating <ExpandMoreIcon />
            </th>
          </thead>
          <tbody>
            <tr>
              <td>20:00</td>
              <td>
                <>
                  <td>
                    <img src={ProfilePic} />
                  </td>
                  <td>
                    <p style={{ fontSize: "10px" }}>
                      Cardio Blast.mp4 <br />
                      10 Workouts{" "}
                    </p>
                  </td>
                </>
              </td>
              <td>Class</td>
              <td>Zoom</td>
              <td>200</td>
              <td>4.5</td>
              <td>
                <MoreVert />
              </td>
            </tr>
            <tr>
              <td>20:00</td>
              <td>
                <>
                  <td>
                    <img src={ProfilePic} />
                  </td>
                  <td>
                    <p style={{ fontSize: "10px" }}>
                      Cardio Blast.mp4 <br />
                      10 Workouts{" "}
                    </p>
                  </td>
                </>
              </td>
              <td>Class</td>
              <td>Zoom</td>
              <td>200</td>
              <td>4.5</td>
              <td>
                <MoreVert />
              </td>
            </tr>

            <tr>
              <td>20:00</td>
              <td>
                <>
                  <td>
                    <img src={ProfilePic} />
                  </td>
                  <td>
                    <p style={{ fontSize: "10px" }}>
                      Cardio Blast.mp4 <br />
                      10 Workouts{" "}
                    </p>
                  </td>
                </>
              </td>
              <td>Class</td>
              <td>Zoom</td>
              <td>200</td>
              <td>4.5</td>
              <td>
                <MoreVert />
              </td>
            </tr>
          </tbody>
        </table>
      </Col>
    </>
  );
};

export default Live;
