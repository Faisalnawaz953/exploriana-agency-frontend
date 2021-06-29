import React, { useRef } from "react";
import { Container, Row, Col, FormGroup, CustomInput } from "reactstrap";
import DeleteIcon from "@material-ui/icons/DeleteOutline";
import OutLinedButton from "../../../components/ui-elements/OutLinedButton";

import ProfilePic from "../../../assets/images/Rectangle 1350.png";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import IconButton from "../../../components/ui-elements/IconButton";
import EditPopUp from "../../../components/ui-elements/EditPopUp";

import { useHistory } from "react-router-dom";
import "../../../css/Classes.css";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  sectionDesktop: {
    width: "200px",
    [theme.breakpoints.up("md")]: {},
  },
}));

const Classess = () => {
  const classes = useStyles();
  const history = useHistory();
  const editRef = useRef();
  const handleEditPopUp = () => {
    if (editRef.current.style.display === "block") {
      editRef.current.style.display = "none";
    } else {
      editRef.current.style.display = "block";
    }
  };
  return (
    <>
      <Container>
        <Row>
          <div className="mt-3 classess text-lg-left  text-md-left text-sm-center text-center">
            All Classes (100)
          </div>

          <div className="ml-auto ">
            <Row>
              <OutLinedButton title="Filter " />
              <IconButton
                title="Upload "
                onClick={() => {
                  history.push("/upload-classes");
                }}
              />
            </Row>
          </div>
        </Row>
      </Container>

      <div className="table_overflow">
        <table className={`custom_table`}>
          <thead>
            <th>
              name
              <ExpandMoreIcon />
            </th>
            <th>
              Recent <ExpandMoreIcon />
            </th>
            <th>
              Category <ExpandMoreIcon />
            </th>
            <th>
              Views <ExpandMoreIcon />
            </th>
            <th>
              Favourites <ExpandMoreIcon />
            </th>
            <th>
              Rating <ExpandMoreIcon />
            </th>
          </thead>
          <tbody>
            <tr>
              <td>
                {/* <div className="d-flex justify-content-center">
                  <img
                    src={ProfilePic}
                    className=""
                    width="50px"
                    height="50px"
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
                </div>*/}
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
              <td>4 days ago</td>
              <td>HIT</td>
              <td>1000</td>
              <td>50</td>
              <td>4.5</td>
              <td style={{ position: "relative" }}>
                <MoreVertIcon
                  style={{ cursor: "pointer" }}
                  onClick={handleEditPopUp}
                />
                <div
                  style={{
                    display: "none",
                    position: "absolute",
                    top: 80,
                    right: 40,
                    zIndex: 9,
                  }}
                  ref={editRef}
                >
                  <EditPopUp />
                </div>
              </td>
            </tr>

            <tr>
              <td>
                {/* <div className="d-flex justify-content-center">
                  <img
                    src={ProfilePic}
                    className=""
                    width="50px"
                    height="50px"
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
              <td>4 days ago</td>
              <td>HIT</td>
              <td>1000</td>
              <td>50</td>
              <td>4.5</td>
              <td>
                <MoreVertIcon />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Classess;
