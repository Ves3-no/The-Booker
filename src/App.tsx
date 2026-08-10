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
      {/*<footer className='flex flex-col py-2 font-main text-text-secondary bg-bg-surface'>
      <div className='flex flex-row px-20 py-5 justify-center gap-30'>
        <div>
          <h3 className='text-primary text-lg font-bold mb-0.5'>Ves3 Test Store</h3>
          <p className='text-text-secondary'>Future of Devs</p>
        </div>

        <div>
          <h4 className='text-md text-text-primary'>Navigation</h4>
          <ul>
            <li><Link to="/" className='-skew-x-8 inline-block hover:underline'>Home</Link></li>
          </ul>
        </div>

        <div>
          <h4 className='text-md text-text-primary'>Contact</h4>
          <p>Email: <a href="mailto:hei@ves3.no" className='text-primary hover:underline inline-block -skew-x-8'>hei@ves3.no</a></p>
        </div>
      </div>

      <div>
        <p>&copy; {new Date().getFullYear()} Ves3 Test Store. All rights reserved.</p>
      </div>
    </footer>*/} 
    </BrowserRouter>
    </AppProvider>
  );
}

export default App;