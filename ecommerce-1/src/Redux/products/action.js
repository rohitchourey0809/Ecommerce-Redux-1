import Axios from "axios";
import * as types from "./actionTypes";

export const fetchDataRequest = (payload) => {
  return {
    type: types.FETCH_DATA_REQUEST,
    payload,
  };
};
export const fetchDataSuccess = (payload) => {
  return {
    type: types.FETCH_DATA_SUCCESS,
    payload,
  };
};
export const fetchDataFailure = (payload) => {
  return {
    type: types.FETCH_DATA_FAILURE,
    payload,
  };
};

// <-----------Fetchdata------------------->
export const fetchData = (payload) => {
  return (dispatch) => {
    dispatch(fetchDataRequest());
    Axios.get("/Shopping", {
      params: {
        ...payload,
      },
    })
      .then((response) => {
        console.log(response.data);
        dispatch(fetchDataSuccess(response.data));
      })
      .catch((error) => {
        console.log(error);
        dispatch(fetchDataFailure(error.data)); //
      });
  };
};
// <----------------------GET_SINGLE_PRODUCT-------->
export const getSingleProductRequest = (payload) => {
  return {
    type: types.GET_SINGLE_PRODUCT_REQUEST,
    payload,
  };
};
export const getSingleProductSuccess = (payload) => {
  return {
    type: types.GET_SINGLE_PRODUCT_SUCCESS,
    payload,
  };
};
export const getSingleProductFailure = (payload) => {
  return {
    type: types.GET_SINGLE_PRODUCT_FAILURE,
    payload,
  };
};

export const getSingleProduct = (id) => (dispatch) => {
  dispatch(getSingleProductRequest());
  Axios.get(`/Shopping/${id}`)
    .then((r) => {
      console.log("current productdata", r);
      dispatch(getSingleProductSuccess(r.data));
    })
    .catch((err) => {
      dispatch(getSingleProductFailure());
      console.error(err);
    });
};

// <--------------ADD PRODUCT CARD----------->
export const addProductCardRequest = (payload) => {
  return {
    type: types.ADD_PRODUCT_CARD_REQUEST,
    payload,
  };
};
export const addProductCardSuccess = (payload) => {
  return {
    type: types.ADD_PRODUCT_CARD_SUCCESS,
    payload,
  };
};
export const addProductCardFailure = (payload) => {
  return {
    type: types.ADD_PRODUCT_CARD_FAILURE,
    payload,
  };
};

export const addProductCard = (product) => (dispatch) => {
  dispatch(addProductCardRequest());
  Axios.post("/card", product)
    .then((r) => {
      console.log("addtocart", r.data);
      dispatch(addProductCardSuccess(r.data));
    })
    .catch((err) => {
      console.log(err);
      dispatch(addProductCardFailure(err.data));
    });
};

// <--------------ADD PRODUCT CARD----------->
export const fetchCardRequest = (payload) => {
  return {
    type: types.FETCH_CART_REQUEST,
    payload,
  };
};
export const fetchCardSuccess = (payload) => {
  return {
    type: types.FETCH_CART_SUCCESS,
    payload,
  };
};
export const fetchCardFailure = (payload) => {
  return {
    type: types.FETCH_CART_FAILURE,
    payload,
  };
};

export const fetchCart = (payload) => (dispatch) => {
  dispatch(fetchCardRequest());
  Axios.get("/card")
    .then((r) => dispatch(fetchCardSuccess(r.data)))
    .catch((err) => dispatch(fetchCardFailure(err)));
};

// <--------------REMOVE PRODUCT CARD----------->
export const removeCardRequest = (payload) => {
  return {
    type: types.REMOVE_PRODUCT_CART_REQUEST,
    payload,
  };
};
export const removeCardSuccess = (payload) => {
  return {
    type: types.REMOVE_PRODUCT_CART_SUCCESS,
    payload,
  };
};
export const removeCardFailure = (payload) => {
  return {
    type: types.REMOVE_PRODUCT_CART_FAILURE,
    payload,
  };
};

export const deleteProductCard = (id) => (dispatch) => {
  dispatch(removeCardRequest(id));
  Axios.delete(`/card/${id}`)
    .then((response) => {
      console.log("deleteresponse", response);
      dispatch(removeCardSuccess(response.data));
    })
    .then((data) => {
      console.log("deldata", data);
      dispatch(fetchCart());
    })
    .catch((err) => {
      dispatch(removeCardFailure());
      console.log(err);
    });
};

export const addOrderRequest = (payload) => {
  return {
    type: types.ADD_ORDER_REQUEST,
    payload,
  };
};

export const addOrderSuccess = (payload) => {
  return {
    type: types.ADD_ORDER_SUCCESS,
    payload,
  };
};

export const addOrderFailure = (payload) => {
  return {
    type: types.ADD_ORDER_FAILURE,
    payload,
  };
};

export const AddOrder = (payload) => (dispatch) => {
  dispatch(addOrderRequest());
  // Axios.get("").then((response) => {
  //   console.log(response);
  // });
  const orderPayload = [];

  for (let product of payload) {
    product && orderPayload.push(Axios.post("/orders", product));
  }

  Promise.all(orderPayload)
    .then((r) => {
      console.log("orderlist", r);
      dispatch(addOrderSuccess());
    })
    .then(() => dispatch(emptyCart(payload)))
    .catch((err) => {
      console.log("orderlist", err);
      dispatch(addOrderFailure(err));
    });
};

export const emptyCartRequest = () => {
  return {
    type: types.EMPTY_CART_REQUEST,
  };
};

export const emptyCartSuccess = () => {
  return {
    type: types.EMPTY_CART_SUCCESS,
  };
};
export const emptyCartFailure = () => {
  return {
    type: types.EMPTY_CART_FAILURE,
  };
};

export const emptyCart = (payload) => (dispatch) => {
  dispatch(emptyCartRequest());

  const deleteOrders = [];

  for (let obj of payload) {
    let temp = dispatch(deleteProductCard(obj.id));
    console.log("tempdeleteOrder", temp);
    deleteOrders.push(temp);
  }

  Promise.all(deleteOrders)
    .then((r) => dispatch(emptyCartSuccess()))
    .catch((err) => dispatch(emptyCartFailure));
};
