import React from "react";
import { Container, Col, Row } from "reactstrap";
import Button from "./Button";
import pic from "../../assets/images/Ellipse 2.png";

export default function EmailPopup() {
  return (
    <>
      <Row className="d-flex justify-content-center">
        <Col md="12" className="mt-3 ">
          <form
            style={{
              backgroundColor: "white",
              boxShadow: "2px 2px 8px 8px #f5f5f5",
            }}
            className="border"
          >
            <div className="d-flex justify-content-between align-items-center p-2">
              <span
                style={{
                  fontWeight: "bold",
                  fontSize: "16px",
                  lineHeight: "32px",
                  transition: "1s",
                  letterSpacing: "0.6px",

                  color: "#2B2B2B",
                }}
                className="  "
              >
                {" "}
                Notifications (4)
              </span>
              <div style={{ color: "#429FBA", cursor: "pointer" }}>
                Mark all as read
              </div>
            </div>
            <div
              style={{
                height: "290px",
                overflowY: "scroll",
                overflowX: "hidden",
              }}
            >
              <div
                style={{
                  width: "100%",
                  backgroundColor: "rgb(66, 159, 186,0.1)",
                }}
                className="  text-dark d-flex justify-content-between align-items-center p-2"
              >
                <img src={pic} style={{ width: "50px", height: "50px" }} />
                <div>
                  {" "}
                  Tom Barner joined to your class <br />
                  <span style={{ fontSize: "12px" }}>
                    Odio at est morbi mattis ornare quam tempus.
                  </span>
                </div>
                10 min
              </div>

              <div className="p-2  text-dark d-flex justify-content-between align-items-center pt-2 pb-2">
                <img src={pic} style={{ width: "50px", height: "50px" }} />
                <div>
                  {" "}
                  Tom Barner joined to your class <br />
                  <span style={{ fontSize: "12px" }}>
                    Odio at est morbi mattis ornare quam tempus.
                  </span>
                </div>
                10 min
              </div>
              <div className="p-2  text-dark d-flex justify-content-between align-items-center pt-2 pb-2">
                <img src={pic} style={{ width: "50px", height: "50px" }} />
                <div>
                  {" "}
                  Tom Barner joined to your class <br />
                  <span style={{ fontSize: "12px" }}>
                    Odio at est morbi mattis ornare quam tempus.
                  </span>
                </div>
                10 min
              </div>

              <div className=" p-2 text-dark d-flex justify-content-between align-items-center pt-2 pb-2">
                <img src={pic} style={{ width: "50px", height: "50px" }} />
                <div>
                  {" "}
                  Tom Barner joined to your class <br />
                  <span style={{ fontSize: "12px" }}>
                    Odio at est morbi mattis ornare quam tempus.
                  </span>
                </div>
                10 min
              </div>
              <div className="p-2 text-dark d-flex justify-content-between align-items-center pt-2 pb-2">
                <img src={pic} style={{ width: "50px", height: "50px" }} />
                <div>
                  {" "}
                  Tom Barner joined to your class <br />
                  <span style={{ fontSize: "12px" }}>
                    Odio at est morbi mattis ornare quam tempus.
                  </span>
                </div>
                10 min
              </div>
            </div>{" "}
          </form>
        </Col>
      </Row>
    </>
  );
}
