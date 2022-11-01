import React, { useState } from 'react';
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom';
import Header from './layout/Header.jsx';
import Sidebar from './layout/Sidebar.jsx';
import Body from './layout/Body.jsx'
import Footer from './layout/Footer.jsx';
import { MODE } from './constants/Constant.js';
import Example from './components/Example.jsx';
import './styles/style.css';


function App() {
  const [renderMode, setRenderMode] = useState(MODE.SHOW_LIST);
  const handleChangeRenderMode = (newMode = MODE.ADD_NEW) => {
    setRenderMode(newMode);
  }
  const navigate = useNavigate();
  return (
    <div className="layout">
      <Header
        handleCreateNewTask={() => handleChangeRenderMode(MODE.ADD_NEW)}
      />
      <Sidebar />
      <Body mode={renderMode} handleChangeRenderMode={handleChangeRenderMode} />
      {renderMode === MODE.SHOW_LIST && <Footer />}
    </div>

    // <div className="layout">
    //   <Routes>
    //     <Route path="/" element={
    //       <div>
    //         <p >Home</p>
    //         <Link to={'/add-new'}>To add-new</Link>
    //         <button onClick={() => { navigate("add-new", { state: { userId: 213 } }) }}>To add-new</button>
    //         <Outlet />
    //       </div>
    //     } />
    //     <Route path="/add-new" element={
    //       <div>
    //         <p >Add new</p>
    //         <Link to={'/'}>To Home</Link>
    //         <button onClick={() => { navigate("/") }}>To Home</button>
    //       </div>
    //     } />
    //   </Routes>
    // </div>

    // <div>
    //   <Example />
    // </div>

  );
}

export default App;
