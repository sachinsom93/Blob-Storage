import './App.css';
import Auth from './pages/Auth';
import { Provider, teamsTheme } from '@fluentui/react-northstar';
import AlertCom from './components/Alert';

function App() {
  return (
    <Provider theme={teamsTheme}>
      <div className="App">
        <AlertCom />
        <Auth />
      </div>
    </Provider>
  );
}

export default App;
