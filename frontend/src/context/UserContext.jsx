import { createContext, useState } from "react";

export const UserContext = createContext();

export default function UserConxtextProvider({ children }) {

     const [isLoggedIn, setIsLoggedIn] = useState(false);

     const [user, setUser] = useState({
          id: localStorage.getItem("id") || "",
          userName:localStorage.getItem("name") || "" ,
          img: localStorage.getItem("img") || "",
     });



     function onChangeHandler(e , setFormData) {
          const { name, value } = e.target;
          setFormData((pre) => {
               return {
                    ...pre,
                    [name] : value
               }
          })
     }

     const baseUrl = "http://localhost:8000/api/v1/"

     const [loder, setLoader] = useState(false);
     const [showMenu, setShowMenu] = useState(false)

     const value = {
          isLoggedIn,setIsLoggedIn,user,setUser,loder,setLoader,showMenu,setShowMenu,baseUrl,onChangeHandler
     }

     return <UserContext.Provider value={value}>
          {children}
     </UserContext.Provider>
}