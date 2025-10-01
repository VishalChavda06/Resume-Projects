import { useSelector, useDispatch } from 'react-redux';
import { selectCounterValue, increment, decrement, addByAmount } from './counterSlice.js';
import { useState } from 'react';

function App() {
  const count = useSelector(selectCounterValue);
  const dispatch = useDispatch();
  const [input, setInput] = useState(0);

  const handleAdd = () => {
    if (input !== 0) {
      dispatch(addByAmount(input));
      setInput(0);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-zinc-900">
      <div className="bg-white/90 rounded-2xl shadow-2xl p-10 max-w-sm w-full border border-zinc-200 flex flex-col items-center justify-center min-h-[32rem]">
        <h2 className="text-zinc-800 font-bold mb-6 text-2xl tracking-wide drop-shadow text-center">Redux Toolkit Counter</h2>
        <div className="text-6xl font-extrabold text-zinc-800 mb-8 transition-colors select-none text-center">{count}</div>
        <div className="flex justify-center gap-8 mb-8 w-full">
          <button
            onClick={() => dispatch(decrement())}
            className="text-3xl w-16 h-16 rounded-xl bg-red-500 hover:bg-red-600 active:bg-red-700 text-white font-bold shadow-md transition-colors focus:outline-none focus:ring-2 focus:ring-red-300"
            aria-label="Decrement"
          >
            -
          </button>
          <button
            onClick={() => dispatch(increment())}
            className="text-3xl w-16 h-16 rounded-xl bg-green-500 hover:bg-green-600 active:bg-green-700 text-white font-bold shadow-md transition-colors focus:outline-none focus:ring-2 focus:ring-green-300"
            aria-label="Increment"
          >
            +
          </button>
        </div>
        <form className="flex justify-center items-center gap-3 w-full" onSubmit={e => { e.preventDefault(); handleAdd(); }}>
          <input
            type="number"
            value={input}
            onChange={e => setInput(Number(e.target.value))}
            className="w-24 text-lg px-3 py-2 rounded-lg border border-zinc-300 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 outline-none bg-zinc-100 text-zinc-800 font-medium text-center shadow-sm transition-all"
            min={-1000}
            max={1000}
            aria-label="Add amount"
          />
          <button
            type="submit"
            className={`text-base px-6 py-2 rounded-lg font-semibold shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-blue-300 ${input === 0 ? 'bg-zinc-400 text-white cursor-not-allowed opacity-60' : 'bg-zinc-900 hover:bg-zinc-800 text-white cursor-pointer'}`}
            disabled={input === 0}
          >
            Add Value
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
