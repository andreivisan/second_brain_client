import { Navigate, Route, Routes } from "react-router-dom"
import { NewNote } from "./NewNote"
import './index.css'

function App() {
  return (
    <Routes>
      <Route path="/" element={<h1 className="text-3xl font-bold">Hi</h1>} />
      <Route path="/new" element={<NewNote />} />
      <Route path="/:id" >
        // Index means that the path is the same as the parent path
        <Route index element={<h1>Show</h1>} />
        <Route path="edit" element={<h1>Edit</h1>} />
      </Route>
      <Route path="*" element={<Navigate to={"/"} />} />
    </Routes>
  )
}

export default App
