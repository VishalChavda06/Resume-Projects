import { ADD_CAKE , ADD_ICECREAM } from "./Constant";

export const add_cake = (which) => ({
  type: ADD_CAKE,
  payload: which, // "case1" or "case2"
});

export const add_ice_cream = (which) => ({
  type: ADD_ICECREAM,
  payload: which, // "case1" or "case2"
});

// export const reset  = () => {
//   return{
//     type:RESET
//   }
// }
