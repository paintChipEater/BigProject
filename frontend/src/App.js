
/* 
- Browser Router: wraps everywhere we want to use the router
- Routes: wraps individual routes
- Route: create a single route
*/
import { BrowserRouter, Routes, Route} from 'react-router-dom'


// pages & components
import Home from './pages/Home'

import Navbar from './components/Navbar';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        {/* nav insider browser router if not, it won't work */}
        <Navbar />
        <div className="pages">
          <Routes>
            <Route
              // props

              // home page
              path="/"
              // page component
              element={<Home />}
            />
           

          </Routes>

        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
