import logo from './logo.svg';
import './App.css';
import './css/styles.css'
import Main from './components/Main';
import {BrowserRouter,Route,Routes} from "react-router-dom"
import Register from './components/Register';
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './components/Login';
import AuthProvider from './AuthProvider';
import Dashboard from './components/dashboard/Dashboard';
import PublicRoute from './components/PublicRoute';
import PrivateRoute from './components/PrivateRoute';



function App() {
  return (
    <>
    <AuthProvider>
    <BrowserRouter>
    <Header/>
    <Routes>
      <Route path='/' element={<Main/>}/>
      <Route path='/register' element={<PublicRoute><Register/></PublicRoute>}/>
      <Route path='/login' element={<PublicRoute><Login/></PublicRoute>}/>
      <Route path='/dashboard' element={<PrivateRoute><Dashboard/></PrivateRoute>}/>
     
    </Routes>
    </BrowserRouter>
    <Footer/>
    </AuthProvider>
    
    </>
  );
}

export default App;
