import React, { useState } from 'react';
import Header from './layout/Header.jsx';
import Sidebar from './layout/Sidebar.jsx';
import Body from './layout/Body.jsx'
import Footer from './layout/Footer.jsx';
import { MODE } from './constants/Constant.jsx';
import Example from './component/Example.jsx';
import './styles/style.css';


function App() {
  const [renderMode, setRenderMode] = useState(MODE.SHOW_LIST);
  const handleChangeRenderMode = (mode = MODE.ADD_NEW) => {
    setRenderMode(mode);
  }
  return (
    // <div className="layout">
    //   <Header
    //     handleCreateNewTask={() => handleChangeRenderMode(MODE.ADD_NEW)}
    //   />
    //   <Sidebar />
    //   <Body mode={renderMode} handleChangeRenderMode={handleChangeRenderMode} />
    //   {renderMode === MODE.SHOW_LIST && <Footer />}
    // </div>


    <div>
      <Example />
    </div>

  );
}

export default App;
