import './App.css';
import Header from './components/Header/Header';
import Main from './components/Main/Main';

function App() {

  return (
    <div className='App'>
      <Header />
      <Main />
      <footer>
        <p>Bu uygulama <a href='https://burakcan.dev' target={'_blank'} rel="noreferrer" className='name'>Burak Can Yıldırım</a> Tarafından Geliştirilmiştir</p>
      </footer>
    </div>
  );
}

export default App;
