import * as types from "./actionTypes";
const initialState = {
  products: [],
  error: "",
  loading: false,
  currentProduct: {},
  card: [],
};

export const ProductReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.FETCH_DATA_REQUEST:
      return {
        ...state,
        error: "",
        loading: true,
      };
    case types.FETCH_DATA_SUCCESS:
      return {
        ...state,
        products: payload,
        error: "",
        loading: false,
      };

    case type.FETCH_DATA_FAILURE:
      return {
        ...state,
        error: payload,
        loading: false,
      };

    case types.GET_SINGLE_PRODUCT_REQUEST:
      return {
        ...state,
        error: "",
        loading: true,
      };
    case types.GET_SINGLE_PRODUCT_SUCCESS:
      return {
        ...state,
        currentProduct: payload,
        error: "",
        loading: false,
      };

    case type.GET_SINGLE_PRODUCT_FAILURE:
      return {
        ...state,
        error: payload,
        loading: false,
      };

    case types.ADD_PRODUCT_CARD_REQUEST:
      return {
        ...state,
        error: "",
        loading: true,
      };
    case types.ADD_PRODUCT_CARD_SUCCESS:
      return {
        ...state,
        card: [...state.card, payload],
        error: "",
        loading: false,
      };

    case type.ADD_PRODUCT_CARD_FAILURE:
      return {
        ...state,
        error: payload,
        loading: false,
      };

    case types.FETCH_CART_REQUEST:
      return {
        ...state,
        error: "",
        loading: true,
      };
    case types.FETCH_CART_SUCCESS:
      return {
        ...state,
        card: [...payload],
        error: "",
        loading: false,
      };

    case type.FETCH_CART_FAILURE:
      return {
        ...state,
        error: payload,
        loading: false,
      };

    case types.REMOVE_PRODUCT_CART_REQUEST:
      return {
        ...state,
        error: "",
        loading: true,
      };

    // case types.REMOVE_PRODUCT_CART_SUCCESS:
    //   return {
    //     ...state,
    //     error: "",
    //     loading: false,
    //   };

    case type.REMOVE_PRODUCT_CART_FAILURE:
      return {
        ...state,
        error: payload,
        loading: false,
      };

    case types.ADD_ORDER_REQUEST:
      return {
        ...state,
        error: "",
        loading: true,
      };
    case types.ADD_ORDER_SUCCESS:
      return {
        ...state,
        card: [...payload],
        error: "",
        loading: false,
      };

    case type.ADD_ORDER_FAILURE:
      return {
        ...state,
        error: payload,
        loading: false,
      };

    default:
      return { ...state };
  }
};
