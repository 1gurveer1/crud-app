import React, {useContext, useState} from 'react'
import noteContext from '../context/notes/noteContext'
import Notes from './Notes'

const AddNote = () => {
    const context = useContext(noteContext);
    const {addNote} = context;

    const [note,setNote] = useState({title: "", description: "", tag: ""})

    const handleSubmit = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote({title:"", description:"", tag:""})
    }

    const onChange = (e) => {
        setNote({...note, [e.target.name]: e.target.value})
    }


    return (
        <>
            
            <div className="container my-3">

                <form onSubmit={handleSubmit}>
                    <div className="mb-3 my-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Title</label>
                        <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" value={note.title} onChange={onChange} minLength="3" required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Description</label>
                        <input type="text" className="form-control" id="description" name="description" value={note.description} onChange={onChange} minLength="5" required />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Tag</label>
                        <input type="text" className="form-control" id="tag" name="tag" onChange={onChange} value={note.tag} minLength="3" required />
                    </div>
                    
                    <button type="submit" className="btn btn-primary" style={{ marginTop: '10px',color: 'black' ,backgroundColor: '#08FDD8'}}  >Add Note</button>
                </form>
                <Notes></Notes>
            </div>
        </>
    )
}

export default AddNote
