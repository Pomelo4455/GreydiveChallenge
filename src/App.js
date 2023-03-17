import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Form from "./components/Form";
import Answers from "./components/Answers";
import { v4 as uuidv4 } from 'uuid';

function App() {
  
  const generateId = () => {
    return uuidv4();
  };

  const id = generateId();

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="https://greydive-challenge-fd3c7.firebaseapp.com/" element={<Form id={id} />} />
          <Route path={`https://greydive-challenge-fd3c7.firebaseapp.com/${id}`} element={<Answers id={id} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
