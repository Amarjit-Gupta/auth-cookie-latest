import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Signup from './components/Signup';
import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<Home />} />
          </Route>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>

    </>
  );
};
export default App;