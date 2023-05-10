import { useState, useEffect } from "react";
import { Header } from "./components/Header";
import iconoNuevoGasto from './assets/img/nuevo-gasto.svg';
import { Modal } from "./components/Modal";
import { ListadoGastos } from "./components/ListadoGastos";
import { generarId } from "./helpers";
import { Filtros } from "./components/Filtros";

function App() {

  /*States */
  const [presupuesto, setPresupuesto] = useState(
    Number( localStorage.getItem('presupuesto') ?? 0 )
  );
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false);

  const [modal, setModal] = useState(false);
  const [animarModal, setAnimarModal] = useState(false);

  const [ gastos, setGastos ] = useState( 
    JSON.parse( localStorage.getItem('gastos') ) ?? [] 
  );

  const [ gastoEditar, setGastoEditar ] = useState({});

  const [ modoEditar, setModoEditar ] = useState(false);

  const [ filtro, setFiltro ] = useState('');
  const [ gastosFiltrados, setGastosFiltrados ] = useState([]);



  /*UseEffect */
  useEffect( () => {
    if( Object.keys( gastoEditar ).length > 0 ) {
      setModal( true );
    
      setTimeout(() => {
        setAnimarModal( true );
      }, 500);

    }
  },[gastoEditar]);

  //Almacenar presupuesto localstorage
  useEffect(() => {
    localStorage.setItem('presupuesto', presupuesto ?? 0);
  }, [presupuesto])

  //Almacenar gastos localstorage
  useEffect( () => {
    localStorage.setItem( 'gastos', JSON.stringify( gastos ) ?? [] )
  }, [gastos] )

  //filtrar los gastos
  useEffect( () => {

    if( filtro ) {
      
      const gastosFiltrados = gastos.filter( gasto => gasto.categoria === filtro  )
      setGastosFiltrados( gastosFiltrados );
    }

  }, [filtro] )

  //Comprobar si hay un presupuesto en localstorage
  useEffect(() => {
    const presupuestoStorage = Number( localStorage.getItem('presupuesto') ) ?? 0
    if( presupuestoStorage > 0 ){
      setIsValidPresupuesto(true)
    }
  },[])

 
 
  /*Funciones */
  const handleNuevoGasto = () => {
    setModal( true );
    setGastoEditar({});

    setTimeout(() => {
      setAnimarModal( true );
    }, 500);
  }

  const guardarGasto = ( gasto ) => {

    if(modoEditar){
      //Actualizar
      const gastosActualizados = gastos.map( gastoState => gastoState.id === gasto.id ? gasto : gastoState );

      setGastos(gastosActualizados);
      setGastoEditar({});
      setModoEditar(false);
    }else{
      //Nuevo gasto
      gasto.id = generarId();
      gasto.fecha = Date.now();
      setGastos( [...gastos, gasto] );
    }

    //Cerrar el modal
    setAnimarModal(false);
    setTimeout(() => {
      setModal(false);
    }, 500);
  }

  const eliminarGasto = (id) => {

    const nuevosGastos = gastos.filter( gasto => gasto.id !== id );
    setGastos( nuevosGastos );

  }

  return (
    <div  className={ modal ? 'fijar' : '' }>
      <Header
        gastos={gastos}
        setGastos={setGastos} 
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        setIsValidPresupuesto={setIsValidPresupuesto}
        isValidPresupuesto={isValidPresupuesto}
      />

      { isValidPresupuesto && (
        <>
          <main>
            <Filtros 
              filter={filtro}
              setFiltro={setFiltro}   
            />
            <ListadoGastos
              gastosFiltrados={gastosFiltrados}
              filtro={filtro} 
              gastos={gastos}
              setGastoEditar={setGastoEditar}
              eliminarGasto={eliminarGasto}
            />
          </main>
          <div className="nuevo-gasto">
            <img src={ iconoNuevoGasto } 
            alt="boton para añadir un nuevo gasto" 
            onClick={handleNuevoGasto}/>
          </div>
        </>
      ) }

      {/*Comprobamos si el state de modal esta en true */}
      {
        modal 
        && 
        <Modal 
          setModal={setModal} 
          animarModal={animarModal} 
          setAnimarModal={setAnimarModal} 
          guardarGasto={guardarGasto} 
          gastoEditar={gastoEditar}
          setGastoEditar={setGastoEditar}
          setModoEditar={setModoEditar}
        />
      }
    </div>
  )
}

export default App
