import { Outlet, useNavigate } from "react-router-dom";
import Nav from "./components/Nav";
import UserContextProvider, { UserContext } from "./context/UserContext.jsx";
import { useContext, useEffect } from "react";

function App() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate()

  useEffect(() => {
    console.log(user.id.length > 0)
    if (user.id.length > 0) {
      navigate("/browse")
    }
    else {
      navigate("/")
    }
  } , [])

  return (
    <div className="bg-[url('./assets/bg.png')] min-h-screen w-full relative bg-center md:bg-right-top bg-cover bg-current">

        <Nav />

          <Outlet />


    </div>
  );
}

export default App;
