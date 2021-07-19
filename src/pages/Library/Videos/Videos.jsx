import React from "react";
import { Container, Row, Col, FormGroup, CustomInput } from "reactstrap";
import DeleteIcon from "@material-ui/icons/DeleteOutline";
import OutLinedButton from "../../../components/ui-elements/OutLinedButton";
import ProfilePic from "../../../assets/images/Rectangle 1350.png";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import IconButton from "../../../components/ui-elements/IconButton";
import { getUserVideos } from "../../../dataServices/Services";
import { connect } from "react-redux";
import { get, isEmpty } from "lodash";
import { useHistory } from "react-router-dom";
import "../../../css/Classes.css";
import { getVideos } from "../../../redux/selectors";
import { updateVideos } from "../../../redux/actions/userActions/userActions";
import { useAlert } from "react-alert";
import {
  getDaysDifference,
  handleEditPopUp
} from "../../../config/GlobalFunctions";
import EditPopUp from "../../../components/ui-elements/EditPopUp";

const Videos = ({ updateVideos, videos }) => {
  const alert = useAlert();
  const history = useHistory();
  const editRef = React.useRef([]);

  const loadVideos = async () => {
    const res = await getUserVideos();

    const resCode = get(res, "status");
    console.log("", res);

    if (resCode === 200) {
      updateVideos(res.data.videos);
    } else {
      alert.error("Error Loading Challenges.");
    }
  };
  React.useEffect(() => {
    loadVideos();
  }, []);
  return (
    <>
      <Container>
        <Row>
          <div className="mt-3 classess text-lg-left  text-md-left text-sm-center text-center">
            Videos{isEmpty(videos) ? "(0)" : `(${videos.length})`}
          </div>

          <div className="ml-auto ">
            <Row>
              <IconButton
                title="Upload "
                onClick={() => {
                  history.push("/upload-videos");
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
            {isEmpty(videos) && (
              <tr className="h4 text-muted pt-5 bg-white ">
                <td colSpan={6} className="text-center ">
                  No Videos Added Yet.
                </td>
              </tr>
            )}
            {!isEmpty(videos) &&
              videos.map((video, index) => (
                <tr key={index}>
                  <td>
                    <td>{video.title}</td>
                  </td>
                  <td>
                    {getDaysDifference(video.createdAt) < 1
                      ? "Today"
                      : getDaysDifference(video.createdAt) + " days ago"}
                  </td>
                  <td>{video.category}</td>
                  <td>1000</td>
                  <td>50</td>
                  <td>4.5</td>
                  <td className="text-right" style={{ position: "relative" }}>
                    <MoreVertIcon
                      style={{ cursor: "pointer" }}
                      onClick={() => handleEditPopUp(editRef, index, videos)}
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
      </Col>
    </>
  );
};
const mapStateToProps = state => {
  return {
    videos: getVideos(state)
  };
};

const matchDispatchToProps = dispatch => {
  return {
    updateVideos: videos => {
      dispatch(updateVideos(videos));
    }
  };
};

export default connect(mapStateToProps, matchDispatchToProps)(Videos);
