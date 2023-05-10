import { useState, useEffect } from 'react';
import cerrarModal from '../assets/img/cerrar.svg';
import { Mensaje } from './Mensaje';
import { generarId } from '../helpers';



export const Modal = ( 
  { setModal, 
    animarModal, 
    setAnimarModal, 
    guardarGasto, 
    gastoEditar,
    setGastoEditar,
    setModoEditar 
  } 
  ) => {

  //State
  const [ mensaje, setMensaje ] = useState('');

  const [nombre, setNombre] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [categoria, setCategoria] = useState('');
  const [fecha, setFecha] = useState('');
  const [id, setId] = useState('');

  //useEffect
  useEffect( () => {
    if( Object.keys( gastoEditar ).length > 0 ) {
      setNombre( gastoEditar.nombre );
      setCantidad( gastoEditar.cantidad );
      setCategoria( gastoEditar.categoria );
      setFecha(gastoEditar.fecha);
      setId( gastoEditar.id )
      setModoEditar(true);

    }
  }, [] );


  //Funcion submit para enviar el presupuesto
  const handleSubmit = (e) => {
    e.preventDefault();

    if( [nombre, cantidad, categoria].includes('') ){
      setMensaje( 'Todos los campos son Obligatorios' );
      return;
    }

    setMensaje('');

    const gasto = {
      nombre,
      cantidad,
      categoria,
      fecha,
      id
    }

    guardarGasto( gasto );

    setNombre('');
    setCantidad('');
    setCategoria('');
  }


  //Funcion para cerrar el modal
  const handleCerrarModal = () => {
    setAnimarModal( false );
    setGastoEditar({});
    setModoEditar(false);
    setTimeout(() => {
      setModal( false );
      
    }, 500);
  }

  return (

    <div className='modal'>
      <div className='cerrar-modal'>
        <img src={cerrarModal} 
        alt="boton para cerrar el modal" 
        onClick={handleCerrarModal}/>
      </div>
      
      <form 
        action="" 
        className={ `formulario ${ animarModal ? 'animar' : 'cerrar' }` }
        onSubmit={handleSubmit}
      > 

        <legend>{ gastoEditar.id ? 'Editar Gasto' : 'Nuevo Gasto' }</legend>

        { mensaje && <Mensaje tipo={'error'}>{mensaje}</Mensaje> }

        <div className="campo">
          <label htmlFor="nombre">Nombre Gasto</label>

          <input 
            type="text"
            placeholder='Añade el nombre del gasto'
            id='nombre'
            value={nombre}
            onChange={ (e) => setNombre(e.target.value) }
           />
        </div>

        <div className="campo">
          <label htmlFor="cantidad">Cantidad</label>

          <input 
            type="number"
            placeholder='Añade la cantidad de tu gasto'
            id='cantidad'
            value={cantidad}
            onChange={ (e) => setCantidad( Number(e.target.value) ) }
           />
        </div>

        <div className="campo">
          <label htmlFor="categoria">Categoria</label>

          <select name="" id="categoria"
            value={categoria}
            onChange={ (e) => setCategoria( e.target.value ) }
          >
            <option value="">-- Seleccione --</option>
            <option value="ahorro">Ahorro</option>
            <option value="comida">Comida</option>
            <option value="casa">Casa</option>
            <option value="gastos">Gastos Varios</option>
            <option value="ocio">Ocio</option>
            <option value="salud">Salud</option>
            <option value="suscripciones">Suscripciones</option>
          </select>
          
        </div>

        <input type="submit" value={ gastoEditar.id ? 'Editar Gasto' : 'Anadir Gasto'}/>
      </form>
    </div>
  )
}
