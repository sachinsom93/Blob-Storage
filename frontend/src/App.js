import './App.css';
import Auth from './pages/Auth';
import File from './pages/File';
import AlertCom from './components/Alert';
import { Routes, Route } from 'react-router-dom';
import { Provider, teamsTheme } from '@fluentui/react-northstar';

function App() {
  return (
    <Provider theme={teamsTheme}>
      <AlertCom />
      <div className="App">
        <Routes>
          <Route exact path="/" element={<Auth />}/>
          <Route exact path="/file" element={<File />} />
        </Routes>
      </div>
    </Provider>
  );
}

export default App;
