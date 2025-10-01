import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { add_cake , add_ice_cream } from "./redux/Action";

const App = () => {
  const count = useSelector((state) => state);
  const dispatch = useDispatch();

  return (
    <>
      <div className="head">App</div>
      <div className="btn">Cake 1: {count.case1.cake1}</div>
      <button className="btn" onClick={() => dispatch(add_cake("case1"))}>Buy Cake 1</button>
      <div className="btn">Ice Cream 1: {count.case1.ice_cream1}</div>
      <button className="btn" onClick={() => dispatch(add_ice_cream("case1"))}>Buy Ice Cream 1</button>
      <div className="btn">Cake 2: {count.case2.cake2}</div>
      <button className="btn" onClick={() => dispatch(add_cake("case2"))}>Buy Cake 2</button>
      <div className="btn">Ice Cream 2: {count.case2.ice_cream2}</div>
      <button className="btn" onClick={() => dispatch(add_ice_cream("case2"))}>Buy Ice Cream 2</button>
    </>
  );
};

export default App;
