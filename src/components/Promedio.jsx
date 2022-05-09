import React, { useContext, useEffect, useState } from 'react'
import { PersonasContext } from '../context/PersonasProvider';


const Promedio = () => {

  const [ promedio, setPromedio ] = useState(0)

  const { personas } =  useContext(PersonasContext)

  const calculoPromedio = (personas) =>{

    let suma = 0;

    let cant = personas.length;

    if(cant > 0){
       
        personas.map(item => (
            suma += parseInt(item.edad)
        ))
    
        return ((suma/cant).toFixed(2));
    }else{
      return 0
    }

  }
  
  useEffect(() => {
    setPromedio(calculoPromedio(personas));
  }, [personas])
  

  return (
    <div className='col-sm-12 card mb-3'>
        <div className="card-body">
            <h6 className='card-title text-center mb-2'>Promedio de edades</h6>
            <h2 className='card-text text-center'>
                {promedio}
            </h2>
        </div>
    </div>
  )
}

export default Promedio