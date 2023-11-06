import React, {createContext, useContext, useState} from 'react'

const infoContext = createContext();

export function Infouser() {
  return useContext(infoContext);
}




export const UserContext = ({children}) => {
const [userInfo] = useState(false);


  return (
    <infoContext.Provider value={userInfo}>
      {children}
    </infoContext.Provider>
  )
}


export default UserContext;