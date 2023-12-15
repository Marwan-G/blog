import {createRoot} from "react-dom/client";
import App from './App'

// ReactDome.render(
//     <App/>, document.getElementById('root')  # deprecated syntax
// )
const root = createRoot(document.getElementById('root'))
root.render(<App/>) //from version >18 use this syntax
