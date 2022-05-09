import React, { useContext } from 'react'
import { firebase } from "./../firebase";
import { PersonasContext } from "../context/PersonasProvider";
import { BsEye, BsPencil, BsTrash } from "react-icons/bs";
import { Link } from 'react-router-dom';

const ListaPersonas = () => {

  const { setId, 
          setPersona, 
          personas, 
          setPersonas, 
          setModoEdicion } = useContext(PersonasContext)

  const eliminar = async (id) =>{

        try {

            const db = firebase.firestore()
            await db.collection('personas').doc(id).delete()

            const arrayFiltrado = personas.filter(item => item.id !== id)

            setPersonas(arrayFiltrado)

        } catch (error) {
            console.log(error);
        }

  }

  const activaEditar = (item) =>{
    setModoEdicion(true)
    setPersona(item)
    setId(item.id)
  }


  return (
    <div className='card'>
      <div className="card-body">
        <h5 className="card-title">Lista de clientes</h5>
          <ul className="list-group">
            {
              personas.map(item => (
              <li className="list-group-item text-capitalize" key={item.id}>
                  {item.nombre} {item.apellido}
                  <br/>
                  Edad: {item.edad}

                  <Link 
                    to={`/persona/${item.id}`}
                    className="btn btn-primary btn-sm float-end ms-2"
                  //onClick={() => verMas()}
                  >
                  <BsEye/>
                  </Link>

                  <button 
                  className="btn btn-warning btn-sm float-end ms-2"
                  onClick={() => activaEditar(item)}
                  >
                  <BsPencil/>
                  </button>

                  <button 
                  className="btn btn-danger btn-sm float-end ms-2"
                  onClick={() => eliminar(item.id)}
                  >
                  <BsTrash/>
                  </button>

              </li>
              ))
            }
          </ul>
      </div>
    </div>
    
  )
}

export default ListaPersonas