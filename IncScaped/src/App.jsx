import { Routes, Route } from "react-router-dom"
import Navigation from "./routes/navigation/navigation.component"
import HomeCmponent from "./routes/home/home.component"
import Authentication from "./routes/authentication/authentication.component"
import WritePageComponent from "./Routes/write-page/write-page.component"
import ReadPageComponent from "./Routes/read-page/read-page.component"
import AdminHomeCmponent from "./Routes/Admin-Home/admin-home.component"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigation/>}>
        <Route index element={<HomeCmponent/>}/>  
        <Route path="write" element={<WritePageComponent/>}/>
        <Route path="auth" element={<Authentication/>}/>
        <Route path="story/:id" element={<ReadPageComponent />} />
        <Route path="admin" element={<AdminHomeCmponent />} />
      </Route>      
    </Routes>    
  )
}

export default App