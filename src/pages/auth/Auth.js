import React, { useEffect } from "react";
import { Redirect, useParams } from "react-router-dom";
import queryString from "query-string";
import ApiLoader from "../../components/ui-elements/ApiLoader";
import { useAlert } from "react-alert";
import { login } from "../../redux/actions/userActions/userActions";
import { connect } from "react-redux";
import jwt_decode from "jwt-decode";

const Auth = ({ location, history, login }) => {
  const [loading, setLoading] = React.useState(true);
  const parsed = queryString.parse(location.search);
  const queryToken = parsed.token;
  const userToken = localStorage.getItem("token");
  const alert = useAlert();

  useEffect(() => {
    if (userToken === queryToken) {
      alert.success("Login SuccessFull");
      var decoded = jwt_decode(queryToken);
      console.log(decoded);
      login(decoded.user);
      history.push("/");
    } else {
      alert.error("Login Failed.TRY AGAIN");
      history.push("/login");
    }
  }, []);

  return (
    <div>
      <ApiLoader />
    </div>
  );
};

const matchDispatchToProps = (dispatch) => {
  return {
    login: (user) => {
      dispatch(login(user));
    },
  };
};

export default connect(null, matchDispatchToProps)(Auth);
