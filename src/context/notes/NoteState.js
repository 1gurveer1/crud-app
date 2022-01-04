import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {

    const host = 'http://localhost:5000'
    const notesInitial = []
    const [notes, setNotes] = useState(notesInitial)

    const blogsInitial = []
    const [blogs, setBlogs] = useState(blogsInitial)

    //fetch all notes 

    const getNotes = async () => {
        const response = await fetch(`${host}/api/notes/fetchnotes`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "token": localStorage.getItem('token')
            }
        });
        const json = await response.json();
        setNotes(json);
    }

    //Add a note
    const addNote = async (title, description, tag) => {
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "token": localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag })
        });

        const note = await response.json();
        setNotes(notes.concat(note))
    }

    //edit a note
    const editNote = async (id, title, description, tag) => {
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                "token": localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag })
        });
        const json = await response.json();
        console.log(json);

        let newNotes = JSON.parse(JSON.stringify(notes))

        for (let i = 0; i < notes.length; i++) {
            const note = newNotes[i];
            if (note._id === id) {
                newNotes[i].title = title;
                newNotes[i].description = description;
                newNotes[i].tag = tag;
                break;
            }
        }
        setNotes(newNotes);

    }

    //delete a note
    const deleteNote = async (id) => {
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                "token": localStorage.getItem('token')
            },
        });
        const json = response.json();
        console.log(json);

        const newNotes = notes.filter((note) => {
            return note._id !== id
        })

        setNotes(newNotes);
    }

    //------------------------------BLOGS------------------------------//


    //fetch all blogs 

    const getBlogs = async () => {
        const response = await fetch(`${host}/api/blogs/fetchblogs`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "token": localStorage.getItem('token')
            }
        });
        const json = await response.json();
        setBlogs(json);
    }

    //Add a blog
    const addBlog = async (title, body, author, image) => {
        const response = await fetch(`${host}/api/blogs/addblog`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "token": localStorage.getItem('token')
            },
            body: JSON.stringify({ title, body, author, image })
        });

        const blog = await response.json();
        setBlogs(blogs.concat(blog))
    }

    //edit a blog
    const editBlog = async (id, title, body, author, image) => {
        const response = await fetch(`${host}/api/blogs/updateblog/${id}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                "token": localStorage.getItem('token')
            },
            body: JSON.stringify({ title, body, author, image })
        });
        const json = await response.json();
        console.log(json);

        let newBlogs = JSON.parse(JSON.stringify(blogs))

        for (let i = 0; i < blogs.length; i++) {
            const blog = newBlogs[i];
            if (blog._id === id) {
                newBlogs[i].title = title;
                newBlogs[i].body = body;
                newBlogs[i].author = author;
                newBlogs[i].image = image;
                break;
            }
        }
        setBlogs(newBlogs);

    }

    //delete a blog
    const deleteBlog = async (id) => {
        const response = await fetch(`${host}/api/blogs/deleteblog/${id}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                "token": localStorage.getItem('token')
            },
        });
        const json = response.json();
        console.log(json);

        const newBlogs = blogs.filter((blog) => {
            return blog._id !== id
        })

        setBlogs(newBlogs);
    }

    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, getNotes, editNote, blogs, addBlog, deleteBlog, getBlogs, editBlog }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;