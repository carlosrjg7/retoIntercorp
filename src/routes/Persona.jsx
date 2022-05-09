import React, { useEffect, useState } from 'react'
import { firebase } from "./../firebase";
import { useParams } from 'react-router-dom'
import moment from 'moment';

const Persona = () => {

  const initialStatePersona = {
    nombre: '',
    apellido: '',
    edad: '',
    nacimiento: '',
    muerte: ''
  }

  const [cliente, setCliente] = useState(initialStatePersona);

  const { nombre, apellido, edad, nacimiento, muerte } = cliente;

  let {id} = useParams()

  useEffect(() => {

    const obtenerDatos = async (id) =>{

      try {
        
        const db = firebase.firestore()
        await db.collection('personas').doc(`${id}`).get()
               .then(snapshot =>  setCliente({...snapshot.data(), muerte: randomDate(snapshot.data().nacimiento)}))

      } catch (error) {
        console.log(error)
      }

    }

    obtenerDatos(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])


  const randomDate = (nacimiento) =>{

    let end = moment(nacimiento).add(100, 'y');
    return moment(new Date(+(new Date()) + Math.random() * (end -  new Date()) )).format("YYYY-MM-DD");

  }

  return (
    <div className='card mt-5 col-sm-12 col-md-6 ms-auto me-auto'>
      <div className="card-body">
        <h5 className="card-title mb-2">
          Datos del cliente
        </h5>
        <form>
          <div className="form-floating">
            <input 
            id='nombre'
            type="text" 
            placeholder="Nombre"
            className="form-control mb-2 text-capitalize"
            name='nombre'
            readOnly
            value={nombre}
            />
            <label htmlFor="nombre">Nombre</label>
          </div>
          
          <div className="form-floating">
            <input 
            type="text" 
            id='apellido'
            placeholder="Apellido"
            className="form-control mb-2 text-capitalize" 
            name="apellido"
            readOnly
            value={apellido} 
            />
            <label htmlFor="apellido">Apellido</label>
          </div>

          <div className="form-floating">
            <input 
            type="number"
            id='edad'
            placeholder="edad"
            className="form-control mb-2 text-capitalize"  
            name="edad"
            readOnly
            value={edad}
            />
            <label htmlFor="edad">Edad</label>
          </div>

          <div className="form-floating">
            <input 
            type="date" 
            id='date'
            placeholder="fecha de nacimiento"
            className="form-control mb-2 text-capitalize"
            name="nacimiento"
            readOnly
            value={nacimiento}
            />
            <label htmlFor="date">Fecha de nacimiento</label>
          </div>

          <div className="form-floating">
            <input 
            id='datefin'
            type="date" 
            placeholder="fecha de muerte probable"
            className="form-control mb-2 text-capitalize"
            name="muerte"
            readOnly
            value={muerte}
            />
            <label htmlFor="datefin">Fecha de muerte Probable</label>
          </div>

        </form>
      </div>
    </div>
  )
}

export default Persona