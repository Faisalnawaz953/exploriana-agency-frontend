import { Container, Row, Col, FormGroup, CustomInput } from "reactstrap";
import "../../../css/reviewsTable.css";
import DeleteIcon from "@material-ui/icons/DeleteOutline";
import ProfilePic from "../../../assets/images/Ellipse 2.png";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Button from "../../ui-elements/Button";
import DorpDown from "../../ui-elements/DropDown";
import { useHistory } from "react-router-dom";

const Reviews = () => {
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
            Reviews (3)
          </div>

          <div className="ml-auto ">
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
      </Container>

      <Col lg="12" md="12" sm="12" xs="12" className="table_overflow">
        <table className="custom_table  ">
          <thead>
            <th>
              name
              <ExpandMoreIcon />
            </th>
            <th>
              Time <ExpandMoreIcon />
            </th>
            <th>
              Text <ExpandMoreIcon />
            </th>
            <th>
              Rating <ExpandMoreIcon />
            </th>
            <th>
              On landing page <ExpandMoreIcon />
            </th>
          </thead>
          <tbody>
            <tr>
              <td>
                {/* <div className="d-flex justify-content-center">
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
                            color: "rgba(176, 176, 176, 1)",
                          }}
                        >
                          Added 08, October 2019
                        </span>
                      </li>
                    </ul>
                  </p>
                </div> */}
                <>
                  <td>
                    <img src={ProfilePic} />
                  </td>
                  <td>
                    <p>
                      Cardio Blast.mp4 <br />
                      211MB{" "}
                    </p>
                  </td>
                </>
              </td>
              <td>21.05.2021. 20:00</td>
              <td className="text-left">
                Dein Syria per ssadzm nterpatet diffusa plaznitie <br />{" "}
                advecticiis Dein Syria...show more
              </td>
              <td>4.5</td>
              <td>
                <FormGroup>
                  <div>
                    <CustomInput
                      type="radio"
                      id="exampleCustomRadio"
                      name="customRadio"
                      label="Show"
                    />
                    <CustomInput
                      type="radio"
                      id="exampleCustomRadio2"
                      name="customRadio"
                      label="Hide"
                    />
                  </div>
                </FormGroup>
              </td>
              <td>
                <DeleteIcon />
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
                            color: "rgba(176, 176, 176, 1)",
                          }}
                        >
                          Added 08, October 2019
                        </span>
                      </li>
                    </ul>
                  </p>
                </div>
              </td>
              <td>21.05.2021. 20:00</td>
              <td className="text-left">
                Dein Syria per ssadzm nterpatet diffusa plaznitie <br />{" "}
                advecticiis Dein Syria...show more
              </td>
              <td>4.5</td>
              <td>
                <FormGroup>
                  <div>
                    <CustomInput
                      type="radio"
                      id="exampleCustomRadio"
                      name="customRadio"
                      label="Show"
                    />
                    <CustomInput
                      type="radio"
                      id="exampleCustomRadio2"
                      name="customRadio"
                      label="Hide"
                    />
                  </div>
                </FormGroup>
              </td>
              <td>
                <DeleteIcon />
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
                            color: "rgba(176, 176, 176, 1)",
                          }}
                        >
                          Added 08, October 2019
                        </span>
                      </li>
                    </ul>
                  </p>
                </div>
              </td>
              <td>21.05.2021. 20:00</td>
              <td className="text-left">
                Dein Syria per ssadzm nterpatet diffusa plaznitie <br />{" "}
                advecticiis Dein Syria...show more
              </td>
              <td>4.5</td>
              <td>
                <FormGroup>
                  <CustomInput
                    type="radio"
                    id="exampleCustomRadio"
                    name="customRadio"
                    label="Show"
                  />
                  <CustomInput
                    type="radio"
                    id="exampleCustomRadio2"
                    name="customRadio"
                    label="Hide"
                  />
                </FormGroup>
              </td>
              <td>
                <DeleteIcon />
              </td>
            </tr>
          </tbody>
        </table>
      </Col>
    </>
  );
};

export default Reviews;
