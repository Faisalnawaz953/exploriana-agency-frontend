import React, { useRef } from "react";
import { Container, Row, Col, FormGroup, CustomInput } from "reactstrap";
import "../../css/reviewsTable.css";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import IconButton from "../../components/ui-elements/IconButton";
import { useHistory } from "react-router-dom";
import { MoreVert } from "@material-ui/icons";
import { getLinks } from "../../redux/selectors";
import { connect } from "react-redux";
import { isEmpty } from "lodash";
import EditPopUp from "../../components/ui-elements/EditPopUp";
import { getUserLinks } from "../../dataServices/Services";
import { updateLinks } from "../../redux/actions/userActions/userActions";
import { get } from "lodash";
import { useAlert } from "react-alert";

const AllLink = ({ links, updateLinks }) => {
  const history = useHistory();
  const editRef = useRef([]);
  const alert = useAlert();

  const loadLinks = async () => {
    const linkres = await getUserLinks();

    const linkresCode = get(linkres, "status");
    console.log("linkss", linkres);

    if (linkresCode === 200) {
      updateLinks(linkres.data.links);
    } else {
      alert.error("Error Loading Links.");
    }
  };

  const handleEditPopUp = index => {
    if (editRef.current[index].style.display === "block") {
      editRef.current[index].style.display = "none";
    } else {
      editRef.current[index].style.display = "block";

      links.forEach((link, i) => {
        if (index !== i) {
          editRef.current[i].style.display = "none";
        }
      });
    }
  };

  React.useEffect(() => {
    loadLinks();
  }, []);
  return (
    <>
      <Container>
        <Row>
          <div className="mt-3 member text-lg-left  text-md-left text-sm-center text-center">
            All Links ({isEmpty(links) ? "0" : links.length})
          </div>

          <div className="ml-auto ">
            <IconButton
              title="Add New Link"
              onClick={() => {
                history.push("/add-link");
              }}
            />
          </div>
        </Row>
      </Container>

      <Col lg="12" md="12" sm="12" xs="12" className="table_overflow">
        <table className="custom_table">
          <thead>
            <th>
              name
              <ExpandMoreIcon />
            </th>
            <th>
              url <ExpandMoreIcon />
            </th>
          </thead>
          <tbody>
            {isEmpty(links) && (
              <tr className="h4 text-muted pt-5 bg-white ">
                <td colSpan={2} className="text-center ">
                  No Links Added Yet.
                </td>
              </tr>
            )}
            {!isEmpty(links) &&
              links.map((link, index) => (
                <tr key={index}>
                  <td>{link.linkName}</td>
                  <td>{link.url}</td>
                  <td className="text-right" style={{ position: "relative" }}>
                    <MoreVert
                      style={{ cursor: "pointer" }}
                      onClick={() => handleEditPopUp(index)}
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
    links: getLinks(state)
  };
};

const matchDispatchToProps = dispatch => {
  return {
    updateLinks: links => {
      dispatch(updateLinks(links));
    }
  };
};

export default connect(mapStateToProps, matchDispatchToProps)(AllLink);
