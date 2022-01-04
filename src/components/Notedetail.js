import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext'


const Notedetail = (props) => {

    const { note, updateNote } = props;
    const context = useContext(noteContext);
    const { deleteNote } = context;

    return (
        <>
            <div className="col-md-4 my-3">
                <div className="card" >
                    <div className="card-body">
                        <h4 className="card-title" style={{ color: '#08FDD8'}} >{note.title}</h4>
                        <p className="card-text">{note.description}</p>
                        <i className="fas fa-trash mx-2" onClick={() => (deleteNote(note._id))}></i>
                        <i className="fas fa-pen-square mx-2" onClick={() => {updateNote(note)}}></i>
                    </div>
                </div>
            </div>
            

        </>
    )
}

export default Notedetail
