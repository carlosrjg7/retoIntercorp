import React, { useState, useContext } from 'react'
import { firebase } from "./../firebase";
import { PersonasContext } from '../context/PersonasProvider';


const FormPersonas = () => {

  const { initialStatePersona, 
          id,
          setId,
          persona, 
          setPersona, 
          personas, 
          setPersonas, 
          modoEdicion,
          setModoEdicion } = useContext(PersonasContext)  
 
  const [error, setError] = useState(false)

  const { nombre, apellido, edad, nacimiento } = persona;

  const handleChange = (e) =>{
    setPersona({
        ...persona,
        [e.target.name] : e.target.value
    })
  }

  const handleSubmit = async (e) =>{
    e.preventDefault();

    if(nombre.trim() === '' || apellido.trim() === '' || edad.trim() === '' || nacimiento.trim() === ''){
        setError(true);
        return;
    }

    setError(false);

    try {
        
        const db = firebase.firestore()
        const nuevaPersona = {
            nombre,
            apellido,
            edad,
            nacimiento
        }

        const data = await db.collection('personas').add(nuevaPersona)
        
        setPersonas([
            ...personas,
            {
              ...nuevaPersona,
              id: data.id
            }
        ])
        
        setPersona(initialStatePersona);


    } catch (error) {
        console.log(error);
    }
  }

  const editar = async (e) =>{
      e.preventDefault()

      if(nombre.trim() === '' || apellido.trim() === '' || edad.trim() === '' || nacimiento.trim() === ''){
        setError(true);
        return;
      }

      try {

        const db = firebase.firestore()
        await db.collection('personas').doc(id).update({
          ...persona
        })

        const arrayEditado = personas.map(item => (
          item.id === id ? {id: item.id, ...persona } : item
        ))

        setPersonas(arrayEditado)
        setModoEdicion(false)
        setId('')
        setPersona(initialStatePersona)
        
      } catch (error) {
        console.log(error);
      }

  }

  return (
    <div className='card'>
      <div className="card-body">
          <h5 className='mb-3'>
          {
            modoEdicion ? 'Editar cliente' : 'Agregar cliente'
          }
        </h5>

        { error ? <div className='alert alert-danger'>Todos los campos son obligatorios</div> : null }
        <form
            onSubmit={
             modoEdicion ? editar : handleSubmit
            }
        >
            <input 
            type="text" 
            placeholder="Nombre"
            className="form-control mb-2"
            name='nombre'
            onChange={handleChange}
            value={nombre}
            />
            
            <input 
            type="text" 
            placeholder="Apellido"
            className="form-control mb-2" 
            onChange={handleChange}
            name="apellido"
            value={apellido} 
            />

            <input 
            type="number"
            placeholder="edad"
            className="form-control mb-2"  
            onChange={handleChange}
            name="edad"
            value={edad}
            />

            <input 
            type="date" 
            placeholder="fecha de nacimiento"
            className="form-control mb-2"
            onChange={handleChange}
            name="nacimiento"
            value={nacimiento}
            />
            
            <button 
                type='submit' 
                className={
                  modoEdicion ? 'btn btn-warning btn-block mt-3 w-100' : 'btn btn-dark btn-block mt-3 w-100'
                }
            >
              {
                modoEdicion ? 'Editar' : 'Agregar'
              }
            </button>
        </form>
      </div>
      
    </div>
  )
}

export default FormPersonas