import {
  LeadingActions,
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions
} from 'react-swipeable-list';
import 'react-swipeable-list/dist/styles.css'

import { formatearFecha } from "../helpers";

import IconoAhorro from '../assets/img/icono_ahorro.svg';
import IconoCasa from '../assets/img/icono_casa.svg';
import IconoComida from '../assets/img/icono_comida.svg';
import IconoGastos from '../assets/img/icono_gastos.svg';
import IconoOcio from '../assets/img/icono_ocio.svg';
import IconoSalud from '../assets/img/icono_salud.svg';
import IconoSuscripciones from '../assets/img/icono_suscripciones.svg';


const diccionarioIconos = {
  ahorro: IconoAhorro,
  comida: IconoComida,
  casa: IconoCasa,
  gastos: IconoGastos,
  ocio: IconoOcio,
  salud: IconoSalud,
  suscripciones: IconoSuscripciones
}

export const Gasto = ({ gasto, setGastoEditar, eliminarGasto }) => {

  const leadingActions = () => (
    <LeadingActions>
      <SwipeAction onClick={() => setGastoEditar( gasto )}>
        Editar
      </SwipeAction>
    </LeadingActions>
  )
    

  const trailingActions = () => (
    <TrailingActions>
      <SwipeAction 
        onClick={() => eliminarGasto( gasto.id )}
        destructive={true}
      >
        Eliminar
      </SwipeAction>
    </TrailingActions>
  )
  return (
    <SwipeableList>
      <SwipeableListItem
        leadingActions={leadingActions()}
        trailingActions={trailingActions()}
      >
        <div className="gasto sombra">
          <div className="contenido-gasto">

            <img 
              src={diccionarioIconos[gasto.categoria]} 
              alt="imagen de la categoria" 
            
            />

            <div className="descripcion-gasto">
              <p className="categoria">{gasto.categoria}</p>
              <p className="nombre-gasto">{gasto.nombre}</p>
              <p className="fecha-gasto">
                Agregado el: <span>{formatearFecha( gasto.fecha )}</span>
                </p>
            </div>

          

          </div>

          <p className="cantidad-gasto">${gasto.cantidad}</p>
        </div>
      </SwipeableListItem>
    </SwipeableList>
  )
}
