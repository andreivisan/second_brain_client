import { NoteForm } from "./NoteForm";

export function NewNote() {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold">New Note</h1>
            <NoteForm />
        </div>
    )
}