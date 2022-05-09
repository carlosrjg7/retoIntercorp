import { firebase } from "./../firebase";
import { useContext, useEffect } from "react";
import FormPersonas from "../components/FormPersonas";
import { PersonasContext } from "../context/PersonasProvider";
import ListaPersonas from "../components/ListaPersonas";
import Promedio from "../components/Promedio";
import Desviacion from "../components/Desviacion";


const Inicio = () => {

  const { setPersonas } = useContext(PersonasContext)

  useEffect(() => {

    const obtenerDatos = async () =>{

      try {
        
        const db = firebase.firestore()
        const data = await db.collection('personas').get()
        const arrayData = data.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
        
        setPersonas(arrayData); 
        
      } catch (error) {
        console.log(error)
      }

    }

    obtenerDatos()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  return (
    <div className="container mt-3">
      <div className="row">
        
        <div className="col-md-4">
          <FormPersonas/>
        </div>

        <div className="col-md-5">
          <ListaPersonas/>
        </div>

        <div className="col-md-3">
          <div className="row">
            <Promedio/>
            <Desviacion/>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Inicio