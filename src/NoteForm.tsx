import { FormEvent, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CreatableReactSelect from 'react-select/creatable';
import { NoteData, Tag } from './App';
import { v4 as uuidV4 } from "uuid"

type NoteFormProps = {
    onSubmit: (data: NoteData) => void
    onAddTag: (tag: Tag) => void
    availableTags: Tag[]
} & Partial<NoteData>

export function NoteForm({ onSubmit, onAddTag, availableTags, title = "", markdown = "", tags = [] }: NoteFormProps) {
    const titleRef = useRef<HTMLInputElement>(null);
    const markdownRef = useRef<HTMLTextAreaElement>(null);
    const [selectedTags, setSelectedTags] = useState<Tag[]>(tags);
    const navigate = useNavigate();

    function handleSubmit(formEvent: FormEvent) {
        formEvent.preventDefault();

        onSubmit({
            title: titleRef.current!.value,
            markdown: markdownRef.current!.value,
            tags: selectedTags
        })

        navigate("..");
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="flex flex-wrap mb-4">
                <div className="w-full md:w-1/3 pr-4">
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                        Title
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        required
                        ref={titleRef}
                        defaultValue={title}
                    />
                </div>

                <div className="w-full md:w-2/3">
                    <label htmlFor="tags" className="block text-sm font-medium text-gray-700">
                        Tags
                    </label>
                    <CreatableReactSelect
                        onCreateOption={label => {
                            const newTag = { id: uuidV4(), label }
                            onAddTag(newTag)
                            setSelectedTags(prev => [...prev, newTag])
                        }}
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
                            setSelectedTags(tags.map(tag => {
                                return {
                                    id: tag.value,
                                    label: tag.label
                                }
                            }))
                        }}
                        isMulti 
                    />
                </div>
            </div>

            <div className="mb-4">
                <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                    Content
                </label>
                <textarea
                    id="content"
                    name="content"
                    rows={15}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    required
                    ref={markdownRef}
                    defaultValue={markdown}
                ></textarea>
            </div>

            <div className="flex justify-end">
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
                    Save
                </button>
                <Link to="..">
                    <button
                        type="button"
                        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
                        Cancel
                    </button>    
                </Link>
            </div>
        </form>
    )
}