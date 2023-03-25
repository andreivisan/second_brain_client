import { NoteData } from "./App";
import { NoteForm } from "./NoteForm";

type NewNoteProps = {
    onSubmit: (data: NoteData) => void
}

export function NewNote({ onSubmit }: NewNoteProps) {
    return (
        <div className="max-w-2xl mx-auto mt-7">
            <h1 className="text-3xl font-bold mb-4">New Note</h1>
            <NoteForm onSubmit={onSubmit}/>
        </div>
    )
}