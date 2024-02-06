import React, { useState } from 'react';
import GraphCanvas from './components/GraphCanvas';
import MyButton from './components/UI/MyButton';

function App() {
  const[numS,setNumS]=useState(0);
  const[numC,setNumC]=useState(0);
  const[numN,setNumN]=useState(0);
  const [TM, setTM] = useState([
    [0, 2, 0, 3, 4],
    [0, 0, 1, 2, 0],
    [0, 0, 0, 1, 0],
    [0, 0, 0, 0, 1],
    [5, 0, 6, 0, 7]
  ]);
  const [IM, setIM] = useState([
    [0, 2, 0, 3, 4],
    [0, 0, 1, 2, 0],
    [0, 0, 0, 1, 0],
    [0, 0, 0, 0, 1],
    [5, 0, 6, 0, 7]
  ]);
  const [newMatrixIM, setNewMatrixIM] = useState('');
  const [newMatrixTM, setNewMatrixTM] = useState('');

  const handleChangeMatrixTM = () => {
    // Parse the newMatrix string to a 2D array and update the state
    const parsedMatrix = newMatrixTM
      .split('\n')
      .map(row => row.split(',').map(Number));

    setTM(parsedMatrix);
  };
  const handleChangeMatrixIM = () => {
    // Parse the newMatrix string to a 2D array and update the state
    const parsedMatrix = newMatrixIM
      .split('\n')
      .map(row => row.split(',').map(Number));

    setIM(parsedMatrix);
  };

  return (
    <div className="App">
      <textarea
        value={newMatrixTM}
        onChange={(e) => setNewMatrixTM(e.target.value)}
        placeholder="Enter new matrix (comma-separated values, rows separated by newlines)"
        rows={5}
        cols={30}
      />
      <MyButton onClick={handleChangeMatrixTM}>Change Matrix</MyButton>
      <GraphCanvas edgeDistancesMatrix={TM} />
      <hr/>
      <br/>
      
      <textarea
        value={newMatrixIM}
        onChange={(e) => setNewMatrixIM(e.target.value)}
        placeholder="Enter new matrix (comma-separated values, rows separated by newlines)"
        rows={5}
        cols={30}
      />
      <MyButton onClick={handleChangeMatrixIM}>Change Matrix</MyButton>
      <GraphCanvas edgeDistancesMatrix={IM} />
    </div>
  );
}

export default App;
