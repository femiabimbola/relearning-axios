import { List } from "@/components/List";
import ReduxProvider from "./providers";
import { CreateUser } from "@/components/CreateUser";
import { CreateUser2 } from "@/components/User";

const  Home = () =>{
  return (
    <ReduxProvider>
      {/* <CreateUser /> */}
      <CreateUser2/>
       <List />
    </ReduxProvider>
     
  )   
}

export default Home
