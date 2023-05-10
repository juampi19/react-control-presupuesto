import { useEffect, useState } from "react";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';


export const ControlPresupuesto = ({ 
  presupuesto, 
  gastos ,
  setPresupuesto,
  setGastos,
  setIsValidPresupuesto
}) => {

  /*States */
  const [ disponible, setDisponible ] = useState(0);
  const [ gastado, setGastado ] = useState(0);
  const [ porcentaje, setPorcentaje ] = useState(0);

  /*UseEffect */
  useEffect(() => {

    const totalGastado = gastos.reduce( ( total, gasto ) => {
      return gasto.cantidad + total;
    }, 0 );

    const totalDisponible = presupuesto - totalGastado;

    //Calcular el porcentaje
    const nuevoPorcentaje = ((( presupuesto - totalDisponible ) / presupuesto) * 100).toFixed(2);

    setGastado( totalGastado );
    setDisponible( totalDisponible );

    setTimeout(() => {
      setPorcentaje( nuevoPorcentaje );
    }, 1500);

  },[gastos])

  const formatearCantidad = ( cantidad ) => {
    return cantidad.toLocaleString( 'es-cl', {
      style: 'currency',
      currency: 'CLP'
    } );
  }

  const handleResetApp = () => {
    const resultado = confirm( '¿Deseas Reinicar presupuesto y gastos?' );

    if( !resultado ) return;

    setIsValidPresupuesto(false);
    setGastos([]);
    setPresupuesto(0);
  }

  return (
    <div className="contenedor-presupuesto contenedor sombra dos-columnas">
      <div>
        <CircularProgressbar
        styles={buildStyles({
          pathColor: porcentaje > 100 ? '#dc2626' : '#3B82F6',
          textColor: porcentaje > 100 ? '#dc2626' : '#3B82F6'
        })}
          value={porcentaje}
          text={`${porcentaje}% Gastado`}
        />
      </div>

      <div className="contenido-presupuesto">
        <button className="reset-app" type="button" onClick={handleResetApp}>
          Resetear App
        </button>
        <p>
          <span>Presupuesto: </span> {formatearCantidad( presupuesto )}
        </p>

        <p className={ `${ disponible < 0 ? 'negativo' : '' }` }>
          <span>Disponible: </span> {formatearCantidad( disponible )}
        </p>

        <p>
          <span>Gastado: </span> {formatearCantidad( gastado )}
        </p>
      </div>
    </div>
  )
}
