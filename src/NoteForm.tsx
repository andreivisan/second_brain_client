import { useRef } from 'react';
import { Link } from 'react-router-dom';
import CreatableReactSelect from 'react-select/creatable';

export function NoteForm() {
    const titleRef = useRef<HTMLInputElement>(null);
    const markdownRef = useRef<HTMLTextAreaElement>(null);

    return (
        <form>
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
                        ref={titleRef}
                    />
                </div>

                <div className="w-full md:w-2/3">
                    <label htmlFor="tags" className="block text-sm font-medium text-gray-700">
                        Tags
                    </label>
                    <CreatableReactSelect isMulti />
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
                    ref={markdownRef}
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