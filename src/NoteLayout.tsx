import { Navigate, Outlet, useOutletContext, useParams } from "react-router-dom"
import { Note } from "./App"

type NoteLayoutProps = {
    notes: Note[]
}

export function NoteLayout({ notes }: NoteLayoutProps) {
    const{ id } = useParams()
    const note = notes.find(n => n.id === id)

    if (note === null) return <Navigate to="/" replace />

    // In React Router v6, the Outlet component is used as a placeholder in a route component where the child routes will be rendered. 
    // When a route with nested child routes is matched, the Outlet component will be replaced by the child route that corresponds to the matched path. 
    return <Outlet context={note} />
}

export function useNote() {
    return useOutletContext<Note>()
}