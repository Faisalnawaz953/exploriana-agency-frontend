import React from "react";
import pic from "../assets/images/Ellipse 2.png";
import { Container, Row, Col } from "reactstrap";
import Star from "@material-ui/icons/Star";
const TrainerReviews = () => {
  return (
    <>
      <Container className="bg-light my-4" style={{ borderRadius: "16px" }}>
        <Row className="p-3 align-items-center">
          <Col md="4 ">
            <div className="d-flex ">
              <div>
                <img src={pic} style={{ width: "50px", height: "50px" }} />
              </div>

              <div className="mt-1 ml-2">
                <div className="h6">
                  <b>Robert Fox</b>
                </div>
                <p style={{ marginTop: "-6px", color: "#B0B0B0" }}>
                  robert@gmail.com
                </p>
              </div>
            </div>
          </Col>
          <Col md="4">21.05.2021. 20:00</Col>
          <Col md="4 text-right">
            <Star style={{ color: "#429FBA" }} />
            <Star style={{ color: "#429FBA" }} />
            <Star style={{ color: "#429FBA" }} />
            <Star style={{ color: "#429FBA" }} />
            <Star style={{ color: "#429FBA" }} />
          </Col>
          <Col>
            Dein Syria per ssadzm nterpatet diffusa plaznitie averit alia
            advecticiis Dein Syria per ssadzm nterpatet diffusa plaznitie averit
            alia advecticiis...
            <span
              style={{
                fontWeight: "700",
                color: "#429FBA",
                borderBottom: "1px solid #429FBA",
                cursor: "pointer"
              }}
            >
              Show More
            </span>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default TrainerReviews;
