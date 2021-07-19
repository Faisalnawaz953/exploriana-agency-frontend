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
import { getUserClassRooms } from "../../../dataServices/Services";
import { connect } from "react-redux";
import { get, isEmpty, map } from "lodash";
import { useAlert } from "react-alert";
import { getClassrooms } from "../../../redux/selectors";
import { updateClassrooms } from "../../../redux/actions/userActions/userActions";
import {
  getDaysDifference,
  handleEditPopUp
} from "../../../config/GlobalFunctions";

const Classes = ({ updateClassrooms, classes }) => {
  const history = useHistory();
  const editRef = useRef([]);
  const alert = useAlert();

  const loadClassrooms = async () => {
    const res = await getUserClassRooms();

    const resCode = get(res, "status");
    console.log("", res);

    if (resCode === 200) {
      updateClassrooms(res.data.classrooms);
    } else {
      alert.error("Error Loading ClassRooms.");
    }
  };
  React.useEffect(() => {
    loadClassrooms();
  }, []);

  return (
    <>
      <Container>
        <Row>
          <div className="mt-3 classess text-lg-left  text-md-left text-sm-center text-center">
            All Classes {isEmpty(classes) ? "(0)" : `(${classes.length})`}
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
            {isEmpty(classes) && (
              <tr className="h4 text-muted pt-5 bg-white ">
                <td colSpan={6} className="text-center ">
                  No Classrooms Added Yet.
                </td>
              </tr>
            )}
            {!isEmpty(classes) &&
              classes.map((classroom, index) => (
                <tr>
                  <td>
                    <td>{classroom.title}</td>
                  </td>
                  <td>
                    {getDaysDifference(classroom.createdAt) < 1
                      ? "Today"
                      : getDaysDifference(classroom.createdAt) + " days ago"}
                  </td>
                  <td>{classroom.category}</td>
                  <td>1000</td>
                  <td>50</td>
                  <td>4.5</td>
                  <td className="text-right" style={{ position: "relative" }}>
                    <MoreVertIcon
                      style={{ cursor: "pointer" }}
                      onClick={() => handleEditPopUp(editRef, index, classes)}
                    />
                    <div
                      style={{
                        display: "none",
                        position: "absolute",
                        top: 20,
                        right: 40,
                        zIndex: 9
                      }}
                      ref={el => (editRef.current[index] = el)}
                    >
                      <EditPopUp />
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
const mapStateToProps = state => {
  return {
    classes: getClassrooms(state)
  };
};
const matchDispatchToProps = dispatch => {
  return {
    updateClassrooms: classrooms => {
      dispatch(updateClassrooms(classrooms));
    }
  };
};

export default connect(mapStateToProps, matchDispatchToProps)(Classes);
