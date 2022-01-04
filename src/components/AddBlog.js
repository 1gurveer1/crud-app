import React, { useContext, useState, useEffect } from 'react'
import noteContext from '../context/notes/noteContext'
import { useHistory } from 'react-router-dom';
import image from "./blog.jpg";


const AddBlog = () => {
    const context = useContext(noteContext);
    const { addBlog, getBlogs } = context;
    let history = useHistory();
    const [blog, setBlog] = useState({ title: "", body: "", author: "", image: "" })

    useEffect(() => {
        if (localStorage.getItem('token')) {
            getBlogs()
        }
        else {
            history.push("/login");
        }

        // eslint-disable-next-line 
    }, [])
    
    const handleSubmit = (e) => {
        e.preventDefault();
        addBlog(blog.title, blog.body, blog.author, blog.image);
        setBlog({ title: "", body: "", author: "", image: "" });
        alert("Blog Added Successfully")
    }

    const onChange = (e) => {
        setBlog({ ...blog, [e.target.name]: e.target.value })
    }

    return (
        <>
            <div className="d-flex">
                <img className="bimg" src={image} />
                <div className="container blog my-3">
                    <h1 style={{ color: '#08FDD8', textAlign: 'center' }}> Create Blog </h1>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3 my-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">Title</label>
                            <input style={{ backgroundColor: 'rgb(37, 36, 36)', color: '#DBE6F6' }} type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" value={blog.title} onChange={onChange} minLength="3" required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="subject" className="form-label">Body</label>
                            <textarea type="text" style={{ backgroundColor: 'rgb(37, 36, 36)', color: '#DBE6F6' }} className="form-control" id="body" name="body" value={blog.body} onChange={onChange} minLength="5" required />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label">Author</label>
                            <input style={{ backgroundColor: 'rgb(37, 36, 36)', color: '#DBE6F6' }} type="text" className="form-control" id="author" name="author" onChange={onChange} value={blog.author} minLength="3" required />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label">Image URL</label>
                            <input style={{ backgroundColor: 'rgb(37, 36, 36)', color: '#DBE6F6' }} type="text" className="form-control" id="image" name="image" onChange={onChange} value={blog.image} minLength="3" required />
                        </div>

                        <button type="submit" className="btn btn-primary" style={{ marginTop: '10px', width: '150px' }}  >Add Blog</button>
                    </form>

                </div>
            </div>

        </>
    )
}

export default AddBlog

