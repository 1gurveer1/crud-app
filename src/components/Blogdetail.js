import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext'

const Blogdetail = (props) => {

    const { blog, updateBlog } = props;
    const context = useContext(noteContext);
    const { deleteBlog } = context;

    return (
        <>
            <div className="col-md-6 my-2">
                <div className="card mx-2 my-2" >
                    <div className="card-content">
                        <img src={`${blog.image}`} style={{position: 'relative', width: '100%'}} />
                        <h4 className="card-title my-3 mx-2" style={{ textAlign: 'center', color: '#08FDD8'}}>{blog.title}</h4>
                        <p className="card-text mx-2">{blog.body}</p>
                        <i className="fas fa-trash mx-2" onClick={() => (deleteBlog(blog._id))}></i>
                        <i className="fas fa-pen-square mx-2 my-2" onClick={() => { updateBlog(blog) }}></i>
                    </div>
                </div>
            </div>
            

        </>
    )
}

export default Blogdetail