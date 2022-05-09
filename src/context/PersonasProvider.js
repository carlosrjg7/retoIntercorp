import React, { useState, createContext } from 'react'

export const PersonasContext = createContext();

const PersonasProvider = (props) => {

    const initialStatePersona = {
        nombre: '',
        apellido: '',
        edad: '',
        nacimiento: ''
      }
    
    const [persona, setPersona] = useState(initialStatePersona)  
    const [personas, setPersonas] = useState([]);
    const [modoEdicion, setModoEdicion] = useState(false);
    const [id, setId] = useState('')


  return (
    <PersonasContext.Provider 
        value={{
            id,
            initialStatePersona,
            persona,
            personas,
            modoEdicion,
            setId,
            setPersona,
            setPersonas,
            setModoEdicion
        }}>

        {props.children}
    </PersonasContext.Provider>
  )
}

export default PersonasProvider