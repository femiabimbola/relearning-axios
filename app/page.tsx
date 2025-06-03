import { List } from "@/components/List";
import ReduxProvider from "./providers";

const  Home = () =>{
  return (
    <ReduxProvider>
       <List />
    </ReduxProvider>
     
  )   
}

export default Home
