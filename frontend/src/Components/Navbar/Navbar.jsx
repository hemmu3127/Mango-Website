import React, { useContext, useState,useRef } from 'react' 
import './Navbar.css'
import logo from '../Assets/aam_logo.jpg'
import cart_icon from '../Assets/cart_icon.png'
import { Link } from 'react-router-dom'
import { ShopContext } from '../../Context/ShopContext'
import nav_dropdown from '../Assets/nav_dropdown.jpg'
const Navbar = () => {
    /*importing navbar css file and two images*/
    const [menu,setMenu] = useState("shop");
    const{getTotalCartItems} = useContext(ShopContext);
    const menuRef = useRef()
    /* adding the underline effect to all the menus */
   
   const dropdown_toggle = (e) =>{
        menuRef.current.classList.toggle('nav-menu-visible');
        e.target.classList.toggle('open');
   }
   
    return (
        <div className='navbar'>
            <div className='nav-logo'>
                {/* adding the logo and adding name of the company*/}
                <img src={logo} alt="" />
                <p>
                    Farmy Mangoes
                </p>
            </div>
            {/* creating a navbar with menu*/}
            <img className='nav-dropdown' onClick={dropdown_toggle} src={nav_dropdown} alt=''/>
            <ul ref={menuRef}className='nav-menu'>
            {/* we have created a variable and for each list the unerline effect is created*/}
             <li onClick={()=>{setMenu("shop")}}><Link style ={{textDecoration:'none'}} to='/'>Shop</Link>{menu==="shop"?<hr/>:<></>}</li>   
             <li onClick={()=>{setMenu("south")}}><Link style ={{textDecoration:'none'}} to='/south'>South</Link>{menu==="south"?<hr/>:<></>}</li> 
             <li onClick={()=>{setMenu("north")}}><Link style ={{textDecoration:'none'}} to='/north'>North</Link>{menu==="north"?<hr/>:<></>}</li> 
             <li onClick={()=>{setMenu("pplr")}}><Link style ={{textDecoration:'none'}} to='/pplr'>Popular</Link>{menu==="pplr"?<hr/>:<></>}</li> 
            </ul>
             {/* in order to remove the underline in link tag we have to use style. */}
            <div className="nav-login-cart">
                {localStorage.getItem("auth-token")
                ?<button onClick={()=>{localStorage.removeItem('auth-token');window.location.replace('/')}}>Logout</button>
            :<Link to='/login'><button>Login</button></Link>}
                <Link to='/cart'><img src={cart_icon} alt=''/></Link>
                <div className="nav-cart-count">{getTotalCartItems()}</div>
            </div>

        </div>
    )
}

export default Navbar