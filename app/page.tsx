import { List } from "@/components/List";
import ReduxProvider from "./providers";
import { CreateUser } from "@/components/CreateUser";

const  Home = () =>{
  return (
    <ReduxProvider>
      <CreateUser />
       <List />
    </ReduxProvider>
     
  )   
}

export default Home
