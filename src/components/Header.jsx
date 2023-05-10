import React from 'react'
import { NuevoPresupuesto } from './NuevoPresupuesto'
import { ControlPresupuesto } from './ControlPresupuesto'

export const Header = ({ presupuesto, setPresupuesto, setIsValidPresupuesto, isValidPresupuesto, gastos, setGastos }) => {
  return (
    <header>
      <h1>Planificación de gastos</h1>

      {
        isValidPresupuesto ? (
          <ControlPresupuesto
            gastos={gastos} 
            presupuesto={presupuesto}
            setGastos={setGastos}
            setPresupuesto={setPresupuesto}
            setIsValidPresupuesto={setIsValidPresupuesto}
          />
        ) :
        (
          <NuevoPresupuesto 
            presupuesto={presupuesto}
            setPresupuesto={setPresupuesto}
            setIsValidPresupuesto={setIsValidPresupuesto}
          />
        )
      }
      
    </header>
  )
}
