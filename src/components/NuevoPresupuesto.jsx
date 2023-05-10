import { useState } from 'react'
import { Mensaje } from './Mensaje';

export const NuevoPresupuesto = ({ presupuesto, setPresupuesto, setIsValidPresupuesto }) => {

  //states
  const [mensaje, setMensaje] = useState('');



  const handlePresupuesto = (e) => {

    if( Number( e.target.value ) < 0 ) return;
    
    setPresupuesto( Number( e.target.value ) );
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    //Validamos que el presupuesto sea un numero y sea mayor a 0
    if( !presupuesto  || presupuesto < 0 ) {
      setMensaje( 'No es un presupuesto válido' );
      return;
    }

    setMensaje('');

    setIsValidPresupuesto( true );
  }

  return (
    <div className='contenedor-presupuesto contenedor sombra'>
      <form className='formulario' onSubmit={handleSubmit}>
        <div className="campo">
          <label htmlFor="presupuesto">Definir Presupuesto</label>
          <input 
            type="number"
            className='nuevo-presupuesto'
            placeholder='Añade tu Presupuesto'
            value={presupuesto}
            onChange={handlePresupuesto} 
          />

          <input type="submit" value="anadir" />


          {/*componente condicional */}
          { mensaje && <Mensaje tipo={'error'}>{mensaje}</Mensaje> }
        </div>
      </form>
    </div>
  )
}
