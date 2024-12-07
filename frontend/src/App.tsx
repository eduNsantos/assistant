
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css";
import "toastr/build/toastr.min.css";
import "./assets/css/animate.min.css";
import "./assets/scss/light-bootstrap-dashboard-react.scss?v=2.0.0";
import "./assets/css/demo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import Admin from './layouts/Admin'
import Login from './views/Login';
import Register from './views/Register';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/admin/*" Component={(props) => <Admin  {...props} />} />

            <Route path="/login" element={<Login/>} />
            <Route path="/register" element={<Register/>} />
          </Routes>
        </AuthProvider>
        {/* <Redirect from="/" to="/admin/dashboard" /> */}
      </BrowserRouter>
    </>
  )
}

export default App
