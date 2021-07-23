import React from "react";
import { Container, Row, Col, FormGroup, CustomInput } from "reactstrap";
import "../../css/reviewsTable.css";
import DeleteIcon from "@material-ui/icons/DeleteOutline";
import ProfilePic from "../../assets/images/Rectangle 1350.png";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Button from "../../components/ui-elements/Button";
import IconButton from "../../components/ui-elements/IconButton";
import DorpDown from "../../components/ui-elements/DropDown";
import { useHistory } from "react-router-dom";
import { ErrorTwoTone } from "@material-ui/icons";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Calendar from "../../components/Calendar";
import { connect } from "react-redux";
import { getLiveClasses } from "../../redux/selectors";
import { updateLiveClasses } from "../../redux/actions/userActions/userActions";
import {
  getUserLiveClasses,
  deleteUserLiveClass
} from "../../dataServices/Services";
import { get, isEmpty } from "lodash";
import { useAlert } from "react-alert";
import { handleEditPopUp } from "../../config/GlobalFunctions";
import EditPopUp from "../../components/ui-elements/EditPopUp";
import ApiLoader from "../../components/ui-elements/ApiLoader";

const Live = ({ liveClasses, updateLiveClasses }) => {
  const alert = useAlert();
  const [loading, setLoading] = React.useState(false);
  const history = useHistory();
  const options = [
    {
      key: "option-1",
      value: "Newest"
    },
    {
      key: "option-2",
      value: "Old"
    }
  ];
  const editRef = React.useRef([]);
  const deleteLiveClass = async id => {
    setLoading(true);
    const res = await deleteUserLiveClass(id);

    const resCode = get(res, "status");
    console.log("linkss", res);

    if (resCode === 200) {
      setLoading(false);
      loadLiveClasses();
      alert.error("SuccessFully Deleted Live Classes.");
    } else {
      setLoading(false);
      alert.error("Error Loading Live Classes.");
    }
  };

  const loadLiveClasses = async () => {
    const res = await getUserLiveClasses();

    const resCode = get(res, "status");
    console.log("", res);

    if (resCode === 200) {
      updateLiveClasses(res.data.liveclasses);
    } else {
      alert.error("Error Loading Challenges.");
    }
  };
  React.useEffect(() => {
    loadLiveClasses();
  }, []);
  return (
    <>
      <Container>
        <Row>
          <div className="mt-3 member text-lg-left  text-md-left text-sm-center text-center">
            All Classes{" "}
            {isEmpty(liveClasses) ? "(0)" : `(${liveClasses.length})`}
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
            {isEmpty(liveClasses) && (
              <tr className="h4 text-muted pt-5 bg-white ">
                <td colSpan={6} className="text-center ">
                  No Live Classes Added Yet.
                </td>
              </tr>
            )}
            {loading ? (
              <tr className="h4 text-muted pt-5 bg-white ">
                <td colSpan={6} className="text-center ">
                  <ApiLoader />
                </td>
              </tr>
            ) : (
              !isEmpty(liveClasses) &&
              liveClasses.map((liveClass, index) => (
                <tr>
                  <td>{liveClass.startTime}</td>
                  <td>
                    <td>{liveClass.title}</td>
                  </td>
                  <td>{liveClass.type}</td>
                  <td>
                    {liveClass.type === "Virtual"
                      ? "Zoom"
                      : liveClass.location.name}
                  </td>
                  <td>200</td>
                  <td>4.5</td>
                  <td style={{ position: "relative" }}>
                    <MoreVertIcon
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        handleEditPopUp(editRef, index, liveClasses)
                      }
                    />
                    <div
                      style={{
                        display: "none",
                        position: "absolute",
                        top: 20,
                        right: 75,
                        zIndex: 9
                      }}
                      ref={el => (editRef.current[index] = el)}
                    >
                      <EditPopUp
                        onEdit={() =>
                          history.push(`/edit-live-class/${liveClass._id}`)
                        }
                        onDelete={() => deleteLiveClass(liveClass._id)}
                      />
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </Col>
    </>
  );
};

const mapStateToProps = state => {
  return {
    liveClasses: getLiveClasses(state)
  };
};

const matchDispatchToProps = dispatch => {
  return {
    updateLiveClasses: liveClasses => {
      dispatch(updateLiveClasses(liveClasses));
    }
  };
};
export default connect(mapStateToProps, matchDispatchToProps)(Live);
