import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import ReactSelect from "react-select";
import { Note, Tag } from "./App";
import Modal from "./Modal";

type SimplifiedNote = {
    tags: Tag[]
    title: string
    id: string
}

type NoteListProps = {
    availableTags: Tag[]
    notes: SimplifiedNote[]
}

export function NoteList({ availableTags, notes }: NoteListProps) {
    const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
    const [title, setTitle] = useState<string>("");

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    
    const filteredNotes = useMemo(() => {
        return notes.filter(note => {
            return (title === "" || note.title.toLowerCase().includes(title.toLowerCase())) && 
                (selectedTags.length === 0 || selectedTags.every(tag => note.tags.some(noteTag => noteTag.id === tag.id)))
        })
    }, [title, selectedTags, notes])
    
    return (
        <>
            <div className="container mx-auto px-4 py-6">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Notes</h1>
                    <div>
                        <Link to="/new">
                            <button
                                type="button"
                                className="bg-blue-500 text-white font-semibold py-2 px-4 mr-2 rounded">
                                Create
                            </button>
                        </Link>
                        <button
                            onClick={() => openModal()}
                            type="button"
                            className="border border-gray-500 text-gray-500 font-semibold py-2 px-4 bg-white rounded">
                            Edit Tags
                        </button>
                    </div>
                </div>

                <form className="flex mt-10">
                    <input
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        type="text"
                        placeholder="Title"
                        className="border border-gray-300 py-2 px-4 mr-2 rounded w-1/2"
                    />
                    <ReactSelect
                        value={selectedTags.map(tag => {
                            return {
                                label: tag.label,
                                value: tag.id
                            }
                        })}
                        options={availableTags.map(tag => {
                            return { label: tag.label, value: tag.id }
                        })}
                        onChange={tags => {
                            setSelectedTags(
                                tags.map(tag => {
                                    return {
                                        label: tag.label,
                                        id: tag.value,
                                    }
                                })
                            )
                        }}
                        isMulti
                        className="w-1/2"
                        placeholder="Tags"
                    />
                </form>

                <div className="grid grid-cols-2 gap-4 mt-10">
                    {filteredNotes.map(note => (
                        <NoteCard id={note.id} title={note.title} tags={note.tags} />
                    ))}
                </div>
            </div>
            
            <Modal isOpen={isModalOpen} onClose={closeModal} >
                <h2 className="text-xl font-semibold mb-4">Edit Tags</h2>

                
            </Modal>
        </>
    )
}

function NoteCard({ id, title, tags }: SimplifiedNote) {
    return (
        <Link to={`/${id}`}>
            <div
                key={id}
                className="border border-gray-300 rounded p-4 bg-white w-full h-32 text-left focus:outline-none focus:shadow-black-20 flex flex-col justify-center">
                    <h2 className="text-xl font-semibold mb-2 text-center">{title}</h2>
                    <div className="flex justify-center">
                        {tags.map((tag) => (
                            <span
                                key={tag.id}
                                className="bg-blue-500 text-white font-semibold py-1 px-2 mr-2 rounded-full">
                                {tag.label}
                            </span>
                        ))}
                    </div>
            </div>
        </Link>
    )   
}