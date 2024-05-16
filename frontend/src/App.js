
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter,Routes,Route} from 'react-router-dom';
/*creating a router dom */

import Shop from './Pages/Shop';
import ShopCategory from './Pages/ShopCategory';
import Product from './Pages/Product';
import Cart from './Pages/Cart';
import LoginSignup from './Pages/LoginSignup';
import Footer from './Components/Footer/Footer';
import south_banner from './Components/Assets/south_banner.png';
import north_banner from './Components/Assets/north_banner.png';
import popular_banner from './Components/Assets/popular__banner.png';

/*importing the react files to store the categories */
function App() {
  return (
    <div>
      <BrowserRouter>
      <Navbar/>

      <Routes>
        <Route path='/' element={<Shop/>}/>
        <Route path='/south' element={<ShopCategory banner={south_banner} category="south"/>}/>
        <Route path='/north' element={<ShopCategory banner ={north_banner}category="north"/>}/>
        <Route path='/pplr' element={<ShopCategory banner = {popular_banner}category="pplr"/>}/>
        <Route path='/product' element={<Product/>}>
          <Route path=':productId' element={<Product/>}/>
        </Route>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/login' element={<LoginSignup/>}/>


      </Routes>
      <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
