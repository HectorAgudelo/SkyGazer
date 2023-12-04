import './App.css'
 import {getAPOD} from './APIs/NasaApi'
import getNews from './APIs/NewsAPI' 

function App() {

getAPOD().then (res => console.log(res))

getNews().then (res => console.log(res))

  return (
    <>
   <h1>SkyGazer</h1>
    </>
  )
}

export default App
