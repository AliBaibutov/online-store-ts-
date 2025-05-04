import useMockData from "./utils/initializeData";

function App() {
  const { status, error, progress, initialize } = useMockData();

  return (
    <div>
      <button onClick={initialize}>Инициализировать</button>
      <ul>
        <li>Status: {status}</li>
        <li>Progress: {progress}</li>
        {error && <li>Error: {error.message}</li>}
      </ul>
    </div>
  );
}

export default App;
