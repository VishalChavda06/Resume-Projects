
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import Contect from './pages/Contect';
import ServicePage from './pages/ServicePage';
function App() {

  return (
    <>

      {<HomePage />}
      {<ServicePage />}
      {<AboutPage />}
      {<Contect />}
    </>

  )
}

export default App
