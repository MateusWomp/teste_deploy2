import { BrowserRouter } from "react-router-dom"
import AppRoutes from './routes'
import { Provedor_Usuario } from "./componentes/context/UsuarioContext"
import { ProvedorVideo } from "./componentes/context/VideoContext"

function App() {
  return (
    <Provedor_Usuario>
      <ProvedorVideo>
       <BrowserRouter>
         <AppRoutes/>
       </BrowserRouter>
      </ProvedorVideo>
    </Provedor_Usuario>
  )
}
export default App