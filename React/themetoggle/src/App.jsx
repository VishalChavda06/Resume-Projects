import Toggle from './components/Toggle';

function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-black text-black dark:text-white">
      <div className="space-y-6 text-center">
        <h1 className="text-3xl font-bold">🌗 Theme Toggle</h1>
        <Toggle />
        <p className="text-muted-foreground">Click to switch themes</p>
      </div>
    </div>
  );
}

export default App;
