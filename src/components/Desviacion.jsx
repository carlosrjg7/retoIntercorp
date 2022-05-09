import React, { useContext, useState, useEffect } from 'react'
import { PersonasContext } from '../context/PersonasProvider';

const Desviacion = () => {

  const { personas } =  useContext(PersonasContext)

  const [ desviacion, setDesviacion ] = useState(0)

  const calculoPromedio = (personas) =>{

    let suma = 0;

    let cant = personas.length;

    if(cant > 0){       
        personas.map(item => (
            suma += parseInt(item.edad)
        ))
    
        return (suma/cant).toFixed(2);
    }

  }  

  const calculoDesviacion = (personas) =>{

      let promedio = calculoPromedio(personas);

      let cant = personas.length;

      if(cant > 0){
        let sumarCuadrados = 0;

        personas.map(item => (
            sumarCuadrados += Math.pow((parseInt(item.edad) - promedio ), 2)
        ))
            return Math.sqrt( sumarCuadrados / cant ).toFixed(2)
        }else{
            return 0
        }
  }


  useEffect(() => {

    setDesviacion(calculoDesviacion(personas));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [personas])
  

  return (
    <div className='col-sm-12 card'>
        <div className="card-body">
            <h6 className="card-title text-center">Desviacion Estandar de edades</h6>
            <h2 className="card-text text-center">
                {desviacion}
            </h2>
        </div>
    </div>
  )
}

export default Desviacion