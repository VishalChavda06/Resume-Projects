// import React from "react";
// import { useState } from "react";

// const Reducer = () => {
//   const [count, setCount] = useState(0);

//   return (
//     <>
//       <h1 className="head">This is useReducer Hook in Reactjs</h1>
//       <div className="mt-4 flex justify-between container mx-auto">
//         <h2 className="btn w-fit">{count}</h2>
//         <div>
//         <button className="btn" onClick={() => setCount(count + 1)}>
//           Increment
//         </button>
//          <button className="btn" onClick={() => setCount(count - 1)}>
//           Decrement
//         </button>
//         <button className="btn" onClick={() => setCount(0)}>
//           Reset
//         </button>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Reducer;

// import { useReducer } from "react";


// const CountReducer = (state , action) => {
//   switch(action.type){
//     case 'increment':return  state + 1
//     case 'decrement':return  state - 1
//     case 'reset':return 0
//     default: return state
//   }
// }

// const Reducer = () => {

//   const [count , dispatch] = useReducer(CountReducer , 0)

//   console.log("countreducer" , count);
  

//   return (
//     <>
//       <h1 className="head">This is useReducer Hook in Reactjs</h1>
//       <div className="mt-4 flex justify-between container mx-auto">
//         <h2 className="btn w-fit">{count}</h2>
//         <div>
//           <button className="btn" onClick={() => dispatch({type:'increment'})}>
//             Increment
//           </button>
//           <button className="btn" onClick={() => dispatch({type:'decrement'})}>
//             Decrement
//           </button>
//           <button className="btn" onClick={() => dispatch({type:'reset'})}>
//             Reset
//           </button>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Reducer



// import { useReducer } from "react";


// const CountReducer = (state , action) => {
//   switch(action.type){
//     case 'increment':return  {age:state.age + 1}
//     case 'decrement':{
//       if (state.age <= 20){
//         return {age : 20}
//       }
//       return {age:state.age - 1}
//     }
//     case 'reset':return {age:20}
//     default: return state
//   }
// }

// const Reducer = () => {

//   const [count , dispatch] = useReducer(CountReducer , {age : 20})

//   console.log("countreducer" , count);
  

//   return (
//     <>
//       <h1 className="head">This is useReducer Hook in Reactjs</h1>
//       <div className="mt-4 flex justify-between container mx-auto">
//         <h2 className="btn w-fit">{count.age}</h2>
//         <div>
//           <button className="btn" onClick={() => dispatch({type:'increment'})}>
//             Increment
//           </button>
//           <button className="btn" onClick={() => dispatch({type:'decrement'})}>
//             Decrement
//           </button>
//           <button className="btn" onClick={() => dispatch({type:'reset'})}>
//             Reset
//           </button>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Reducer


// {count:20 , age:20}

// [{count:20 , age:20}]

// [{count:20} , {age:20}]

