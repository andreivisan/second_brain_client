import { NoteForm } from "./NoteForm";

export function NewNote() {
    return (
        <div className="max-w-2xl mx-auto mt-7">
            <h1 className="text-3xl font-bold mb-4">New Note</h1>
            <NoteForm />
        </div>
    )
}