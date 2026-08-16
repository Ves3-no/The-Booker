import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './AppContext';
import Home from './pages/Home.tsx'
import Product  from './pages/Product.tsx';
import Service  from './pages/Service.tsx';
import Login from './pages/Login.tsx'
import Admin  from './pages/Admin.tsx';
import WorkerAdminAuth from './pages/WorkerAdminAuth.tsx'


function App() {
  return (
    <AppProvider>
    <BrowserRouter>

      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/Service/:id" element={<Service />}/>
        <Route path="/Product/:id" element={<Product />}/>
        <Route path="/Login/*" element={<Login />}/>
        <Route path="/Admin/:page" element={<Admin />}/>
        <Route path="/Auth" element={<WorkerAdminAuth />}/>
        <Route path="/Admin">
          <Route index element={<Navigate to="/admin/home" replace />}/>
        </Route>
      </Routes>
    </BrowserRouter>
    </AppProvider>
  );
}

export default App;