import React, { useEffect } from "react";
import { Redirect, useParams } from "react-router-dom";
import queryString from "query-string";
import ApiLoader from "../../components/ui-elements/ApiLoader";
import { useAlert } from "react-alert";
import { login } from "../../redux/actions/userActions/userActions";
import { connect } from "react-redux";
import jwt_decode from "jwt-decode";

const RegisterAuth = ({ location, history, login }) => {
  const [loading, setLoading] = React.useState(true);
  const parsed = queryString.parse(location.search);
  const queryToken = parsed.token;
  const userToken = localStorage.getItem("token");
  const alert = useAlert();

  useEffect(() => {
    if (userToken === queryToken) {
      alert.success("Register SuccessFull");
      var decoded = jwt_decode(queryToken);
      console.log(decoded);
      login(decoded.user);

      history.push("/user");
    } else {
      alert.error("Register Failed.TRY AGAIN");
      history.push("/register");
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

export default connect(null, matchDispatchToProps)(RegisterAuth);
