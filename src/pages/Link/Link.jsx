import { Container, Row, Col, FormGroup, CustomInput } from "reactstrap";
import "../../css/reviewsTable.css";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import IconButton from "../../components/ui-elements/IconButton";
import { useHistory } from "react-router-dom";
import { MoreVert } from "@material-ui/icons";

const AllLink = () => {
  const history = useHistory();
  return (
    <>
      <Container>
        <Row>
          <div className="mt-3 member text-lg-left  text-md-left text-sm-center text-center">
            All Links (2)
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
        <table className="custom_table  ">
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
            <tr>
              <td>Shop</td>
              <td>url.com</td>
              <td className="text-right">
                <MoreVert />
              </td>
            </tr>
            <tr>
              <td>Shop</td>
              <td>url.com</td>
              <td className="text-right">
                <MoreVert />
              </td>
            </tr>{" "}
            <tr>
              <td>Shop</td>
              <td>url.com</td>
              <td className="text-right">
                <MoreVert />
              </td>
            </tr>{" "}
            <tr>
              <td>Shop</td>
              <td>url.com</td>
              <td className="text-right">
                <MoreVert />
              </td>
            </tr>{" "}
            <tr>
              <td>Shop</td>
              <td>url.com</td>
              <td className="text-right">
                <MoreVert />
              </td>
            </tr>
          </tbody>
        </table>
      </Col>
    </>
  );
};

export default AllLink;
