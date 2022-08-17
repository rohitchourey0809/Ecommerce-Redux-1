import axios from "axios";
export const SIGNIN_REQUEST = "SIGNIN_REQUEST";
export const SIGNIN_SUCCESS = "SIGNIN_SUCCESS";
export const SIGNIN_FAILURE = "SIGNIN_FAILURE";

const signInRequest = () => {
  return {
    type: SIGNIN_REQUEST,
  };
};

const signInSuccess = (data) => {
  return {
    type: SIGNIN_SUCCESS,
    payload: data,
  };
};

const signInFailure = (payload) => {
  return {
    type: SIGNIN_FAILURE,
    payload,
  };
};

export const signIn = (payload) => (dispatch) => {
  dispatch(signInRequest());
  return axios
    .post("/api/login", payload, { baseURL: "https://reqres.in" })
    .then((response) => {
      console.log(response);
      dispatch(signInSuccess(response.data));
    })
    .catch((err) => {
      dispatch(signInFailure(err.data));
      console.log(err);
    });
};
