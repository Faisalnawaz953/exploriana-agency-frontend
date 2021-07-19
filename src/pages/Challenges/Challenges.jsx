import React from "react";
import { Container, Row, Col } from "reactstrap";

import ProfilePic from "../../assets/images/Rectangle 1350.png";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import IconButton from "../../components/ui-elements/IconButton";

import { useHistory } from "react-router-dom";
import "../../css/Classes.css";
import { getUserChallenges } from "../../dataServices/Services";
import { connect } from "react-redux";
import { updateChallenges } from "../../redux/actions/userActions/userActions";
import { getChallenges } from "../../redux/selectors";
import { get, isEmpty } from "lodash";
import { handleEditPopUp } from "../../config/GlobalFunctions";
import EditPopUp from "../../components/ui-elements/EditPopUp";
import { formatDate } from "../../config/GlobalFunctions";

const Challenges = ({ challenges, updateChallenges }) => {
  const history = useHistory();
  const editRef = React.useRef([]);
  const loadChallenges = async () => {
    const res = await getUserChallenges();

    const resCode = get(res, "status");
    console.log("", res);

    if (resCode === 200) {
      updateChallenges(res.data.challenges);
    } else {
      alert.error("Error Loading Challenges.");
    }
  };
  React.useEffect(() => {
    loadChallenges();
  }, []);
  return (
    <>
      <Container>
        <Row>
          <div className="mt-3 classess text-lg-left  text-md-left text-sm-center text-center">
            Videos {isEmpty(challenges) ? "(0)" : `(${challenges.length})`}
          </div>

          <div className="ml-auto ">
            <Row>
              <IconButton
                title="Upload "
                onClick={() => {
                  history.push("/upload-challenges");
                }}
              />
            </Row>
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
              Status <ExpandMoreIcon />
            </th>
            <th>
              Start <ExpandMoreIcon />
            </th>
            <th>
              End <ExpandMoreIcon />
            </th>
            <th>
              Participants <ExpandMoreIcon />
            </th>
            <th>
              Rating <ExpandMoreIcon />
            </th>
          </thead>
          <tbody>
            {isEmpty(challenges) && (
              <tr className="h4 text-muted pt-5 bg-white ">
                <td colSpan={6} className="text-center ">
                  No Challenges Added Yet.
                </td>
              </tr>
            )}
            {!isEmpty(challenges) &&
              challenges.map((challenge, i) => (
                <tr key={i}>
                  <td>
                    <td>{challenge.title}</td>
                  </td>
                  <td>Started</td>
                  <td>{formatDate(challenge.startDate)}</td>
                  <td>{formatDate(challenge.endDate)}</td>
                  <td>50</td>
                  <td>4.5</td>
                  <td style={{ position: "relative" }}>
                    <MoreVertIcon
                      style={{ cursor: "pointer" }}
                      onClick={() => handleEditPopUp(editRef, i, challenges)}
                    />
                    <div
                      style={{
                        display: "none",
                        position: "absolute",
                        top: 20,
                        right: 75,
                        zIndex: 9
                      }}
                      ref={el => (editRef.current[i] = el)}
                    >
                      <EditPopUp />
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </Col>
    </>
  );
};
const mapStateToProps = state => {
  return {
    challenges: getChallenges(state)
  };
};

const matachDispatchToProps = dispatch => {
  return {
    updateChallenges: challenges => {
      dispatch(updateChallenges(challenges));
    }
  };
};

export default connect(mapStateToProps, matachDispatchToProps)(Challenges);
