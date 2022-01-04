import React, { useContext, useEffect, useState, useRef } from 'react'
import { useHistory } from 'react-router-dom';
import noteContext from '../context/notes/noteContext'
import Notedetail from './Notedetail';

const Notes = () => {
    
    let history = useHistory();
    const context = useContext(noteContext);
    const { notes, getNotes, editNote } = context;
    const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" })

    useEffect(() => {
        if(localStorage.getItem('token'))
        {
            getNotes()
        }
        else
        {
            history.push("/login");
        }
        
        // eslint-disable-next-line 
    }, [])

    const ref = useRef(null)
    const closeref = useRef(null)

    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({ id:currentNote._id , etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        editNote(note.id, note.etitle, note.edescription, note.etag)
        closeref.current.click();
    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    return (
        <div className="row my-3">
            <hr style={{ height: '5px', color: '#08FDD8' }}></hr>

            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content" style={{ backgroundColor: '#1D1D1D', color: '#fff' }}>
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" style={{ backgroundColor: '#fff' }} aria-label="Close"></button>
                        </div>
                        <div className="modal-body" style={{ color: '#fff' }}>
                            <div className="mb-3 my-3">
                                <label htmlFor="exampleInputEmail1" className="form-label" >Title</label>
                                <input style={{ backgroundColor: 'rgb(37, 36, 36)', color: '#fff' }} type="text" className="form-control" id="etitle" name="etitle" aria-describedby="emailHelp" value={note.etitle} onChange={onChange} minLength="3" required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputPassword1" className="form-label" >Description</label>
                                <input style={{ backgroundColor: 'rgb(37, 36, 36)', color: '#fff' }} type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onChange} minLength="5" required/>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="exampleInputPassword1" className="form-label" >Tag</label>
                                <input style={{ backgroundColor: 'rgb(37, 36, 36)', color: '#fff' }} type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange} minLength="3" required />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button ref={closeref} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={note.etitle.length < 3 || note.edescription.length < 5} type="button" className="btn btn-primary" onClick={handleSubmit}>Update</button>
                        </div>
                    </div>
                </div>
            </div>

            {notes.map((note) => {
                return <Notedetail key={note._id} updateNote={updateNote} note={note}></Notedetail>
            })}
        </div>

    )
}

export default Notes
