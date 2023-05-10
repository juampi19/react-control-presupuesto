import { Gasto } from "./Gasto"


export const ListadoGastos = ({ gastos, setGastoEditar, eliminarGasto, gastosFiltrados, filtro }) => {
  return (
    <div className="listado-gastos contenedor">
      {
        filtro 
          ? <h2>{ gastosFiltrados.length ? `Gastos ${filtro}` : `No hay Gastos en ${filtro}` }</h2>
          : <h2>{ gastos.length ? 'Gastos' : 'No hay Gastos aún' }</h2>
      }

      {
        filtro ? (
          gastosFiltrados.map( gasto => (
            <Gasto key={gasto.id}
              gasto={gasto}
              setGastoEditar={setGastoEditar}
              eliminarGasto={eliminarGasto}
            />
          ) )
        )
        : (
          gastos.map( gasto => (
            <Gasto key={gasto.id}
              gasto={gasto}
              setGastoEditar={setGastoEditar}
              eliminarGasto={eliminarGasto}
            />
          ) )
        )
      }

     
    </div>
  )
}
