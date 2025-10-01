import { ADD_CAKE, ADD_ICECREAM } from "./Constant";

const initialState = {
  case1: { cake1: 10, ice_cream1: 20 },
  case2: { cake2: 30, ice_cream2: 40 },
};

const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CAKE:
      if (action.payload === "case1") {
        return {
          ...state,
          case1: { ...state.case1, cake1: state.case1.cake1 - 1 },
        };
      } else if (action.payload === "case2") {
        return {
          ...state,
          case2: { ...state.case2, cake2: state.case2.cake2 - 1 },
        };
      }
      return state;
    case ADD_ICECREAM:
      if (action.payload === "case1") {
        return {
          ...state,
          case1: { ...state.case1, ice_cream1: state.case1.ice_cream1 - 1 },
        };
      } else if (action.payload === "case2") {
        return {
          ...state,
          case2: { ...state.case2, ice_cream2: state.case2.ice_cream2 - 1 },
        };
      }
      return state;
    default:
      return state;
  }
};

export default Reducer;
