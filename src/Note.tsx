import ReactMarkdown from "react-markdown";
import gfm from 'remark-gfm'
import { Link, useNavigate } from "react-router-dom";
import { useNote } from "./NoteLayout";

type NoteProps = {
    onDelete: (id: string) => void
}

export function Note({onDelete}: NoteProps) {
    const note = useNote()
    const navigate = useNavigate()

    return (
        <div className="container mx-auto px-4 py-6">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h1 className="text-2xl font-bold">{note.title}</h1>
                    <div className="flex mt-2">
                        {note.tags.length > 0 && (
                            note.tags.map((tag) => (
                                <span
                                    key={tag.id}
                                    className="bg-blue-500 text-white font-semibold py-1 px-2 mr-2 rounded-full">
                                    {tag.label}
                                </span>
                            ))
                        )}
                    </div>
                </div>

                <div>
                    <Link to={`/${note.id}/edit`}>
                        <button
                            type="button"
                            className="bg-blue-500 text-white font-semibold py-2 px-4 mr-2 rounded">
                            Edit
                        </button>
                    </Link>
                    <button
                        onClick={() => {
                            onDelete(note.id)
                            navigate("/")
                        }}
                        type="button"
                        className="border border-red-500 text-red-500 font-semibold py-2 px-4 bg-white rounded mr-2">
                        Delete
                    </button>
                    <Link to="/">
                        <button
                            type="button"
                            className="border border-gray-500 text-gray-500 font-semibold py-2 px-4 bg-white rounded">
                            Back
                        </button>
                    </Link>
                </div>
            </div>

            <ReactMarkdown remarkPlugins={[gfm]}>{note.markdown}</ReactMarkdown>
        </div>
    )
}