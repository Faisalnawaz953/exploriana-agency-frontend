import { Container, Row, Col } from "reactstrap";
import { Check } from "react-feather";
const BrandColorTheme = ({ brandColor, setBrandColor }) => {
  const color = [
    "#F2453D",
    "#F2453D",
    "#9B2FAE",
    "#6740B4",
    "#4154B3",
    "#2C98F0",
    "#1EABF1",
    "#1FBCD3",
    "#FD5830",
    "#159688",
    "#50AE55",
    "#8DC252",
    "#C0C942",
    "#FCD748",
    "#FEC02F",
    "#FD9827",
  ];

  return (
    <Container>
      Color Theme
      <Row>
        <Col
          md="2"
          className="   py-3  px-2 rounded bg-light "
          style={{ height: "110px " }}
        >
          <div
            style={{
              height: "70px ",
              width: "70px",
              borderRadius: "12px",
              backgroundColor: brandColor,
            }}
            className="d-flex justify-content-center align-items-center  "
          >
            <Check color="white" />
          </div>
        </Col>

        <Col md="10">
          <Container>
            <Row className="mb-3 border-left pl-3">
              {color.map((val, i) => {
                return (
                  <div
                    key={i}
                    style={{
                      backgroundColor: val,
                      height: "50px",
                      width: "50px",
                      marginBottom: "10px",
                      borderRadius: "12px",
                      cursor: "pointer",
                    }}
                    className="   mr-3     "
                    onClick={() => {
                      setBrandColor(val);
                    }}
                  >
                    <div></div>
                  </div>
                );
              })}
            </Row>
          </Container>
        </Col>
      </Row>
    </Container>
  );
};

export default BrandColorTheme;
