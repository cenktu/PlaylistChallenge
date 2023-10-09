import React, { useState, FormEvent } from 'react';
import "./Content.scss";

// Type for Content props
interface ContentProps {
    onAddItem: (newItem: PlaylistItem) => void;
}

// Type for Playlist item
interface PlaylistItem {
    name: string;
    url: string;
    duration: number;
    type: string;
}

function Content({ onAddItem }: ContentProps) {
    // State to store playlist item fields
    const [name, setName] = useState<string>('');
    const [url, setUrl] = useState<string>('');
    const [duration, setDuration] = useState<number | string>('');
    const [type, setType] = useState<string>('');

    // To handle form submission
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        // Make sure there can not be empty form
        e.preventDefault();

        // Create new Playlist item with input values
        const newItem: PlaylistItem = {
            name,
            url,
            duration: parseFloat(duration as string),
            type,
        };

        // Call props to add new item
        onAddItem(newItem);

        // Clear the form fields
        setName('');
        setUrl('');
        setDuration('');
        setType('');
    };

    return (
        <div className='content'>
            <h2 className='header'>Add Content</h2>
            <div className="content-form">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Content Name:</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="url">URL:</label>
                        <input
                            type="text"
                            id="url"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            required
                            placeholder='https://'
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="duration">Duration (seconds):</label>
                        <input
                            type="number"
                            id="duration"
                            value={duration}
                            onChange={(e) => setDuration(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="type">Type:</label>
                        <select
                            id="type"
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                            required
                        >
                            <option hidden>Choose Option</option>
                            <option value="image">Image</option>
                            <option value="video">Video</option>
                        </select>
                    </div>
                    <button type="submit">Add</button>
                </form>
            </div>
        </div>
    );
}

export default Content;