import { NavLink } from "react-router-dom";

import { UseAuth } from "../AuthContext";
export const Navbarcomponent = () => {
    // const [isLoggedIn, setIsLoggedIn] = useState(false); 
    const {isAuthenticated,logout}=UseAuth();
    const logouthandlefunc=()=>{
        logout();
    }
    // useEffect(() => {
    //         setIsLoggedIn(false);
    // }, []); 
    return (
        <div>
            <nav>
                <h3 className="headingstyle">Product Cart</h3>
                {isAuthenticated ?(
                    <>
                <NavLink to="/add">Home</NavLink>
                <NavLink to="/products">Products</NavLink>
                <NavLink 
                            to="/login" 
                            onClick={logouthandlefunc} 
                            className="logout-link"
                        >
                            Logout
                        </NavLink>
                </> )  :            
                ( 
                    <>   
                     <NavLink to="/login">Login</NavLink>
                        <NavLink to="/register">Register</NavLink>
                    </>
                ) }
            </nav>
        </div>
    );
};
