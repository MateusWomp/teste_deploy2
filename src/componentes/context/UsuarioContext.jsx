import React, { createContext, useState, useContext } from 'react';

const UsuarioContext = createContext();

export const Provedor_Usuario = ({children}) => {
    const [nomeusuario, setNomeusuario] = useState("")

    return(
        <UsuarioContext.Provider value={{nomeusuario, setNomeusuario}}>
            {children}
        </UsuarioContext.Provider>
    )
}
export const contexto_usuario = () =>{
    return useContext(UsuarioContext)
}