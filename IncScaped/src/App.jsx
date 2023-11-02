import { Routes, Route} from "react-router-dom"
import Navigation from "./routes/navigation/navigation.component"
import HomeCmponent from "./routes/home/home.component"
import Authentication from "./routes/authentication/authentication.component"
import WritePageComponent from "./Routes/write-page/write-page.component"
import ReadPageComponent from "./Routes/read-page/read-page.component"
import AdminHomeCmponent from "./Routes/Admin-Home/admin-home.component"
import { useContext } from "react"
import { UserContext } from "./context/user.context"
import MyStoriesComponent from "./Routes/myStories/myStories.component"

function App() {
  const {currentUser} = useContext(UserContext)
  return (
    <Routes>
      <Route path="/" element={<Navigation/>}>
        <Route index element={<HomeCmponent/>}/>  
        <Route path="write" element={<WritePageComponent/>}/>
        <Route path="auth" element={<Authentication/>}/>
        <Route path="story/:id" element={<ReadPageComponent />} />        
        {currentUser && currentUser.role === 1? <Route path="admin" element={<AdminHomeCmponent />} />:null}   
        {currentUser &&  <Route path="mystories" element={<MyStoriesComponent />} />}      
      </Route>      
    </Routes>    
  )
}

export default App