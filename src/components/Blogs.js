import React, { useContext, useEffect, useState, useRef } from 'react'
import { useHistory } from 'react-router-dom';
import noteContext from '../context/notes/noteContext'
import Blogdetail from './Blogdetail';

const Blogs = () => {

    let history = useHistory();
    const context = useContext(noteContext);
    const { blogs, getBlogs, editBlog } = context;
    const [blog, setBlog] = useState({ id: "", etitle: "", ebody: "", eauthor: "", eimage: "" })

    useEffect(() => {
        if (localStorage.getItem('token')) {
            getBlogs()
        }
        else {
            history.push("/login");
        }

        // eslint-disable-next-line 
    }, [])

    const ref = useRef(null)
    const closeref = useRef(null)

    const updateBlog = (currentBlog) => {
        ref.current.click();
        setBlog({ id: currentBlog._id, etitle: currentBlog.title, ebody: currentBlog.body, eauthor: currentBlog.author, eimage: currentBlog.image })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        editBlog(blog.id, blog.etitle, blog.ebody, blog.eauthor, blog.eimage)
        closeref.current.click();
    }

    const onChange = (e) => {
        setBlog({ ...blog, [e.target.name]: e.target.value })
    }

    return (
        <div className="row my-3">
            <h1 style={{ textAlign:'center', color: '#08FDD8'}}>Blogs</h1>
            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content" style={{ backgroundColor: '#1D1D1D', color: '#fff' }}>
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Blog</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" style={{ backgroundColor: '#fff' }} aria-label="Close"></button>
                        </div>
                        <div className="modal-body" style={{ color: '#fff' }} >
                            <div className="mb-3 my-3" >
                                <label htmlFor="exampleInputEmail1" className="form-label" >Title</label>
                                <input style={{ backgroundColor: 'rgb(37, 36, 36)', color: '#fff'}} type="text" className="form-control" id="etitle" name="etitle" aria-describedby="emailHelp" value={blog.etitle} onChange={onChange} minLength="3" required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputPassword1" className="form-label" >Body</label>
                                <textarea style={{ backgroundColor: 'rgb(37, 36, 36)', color: '#fff' }} type="text" className="form-control" id="ebody" name="ebody" value={blog.ebody} onChange={onChange} minLength="5" required />
                            </div>

                            <div className="mb-3" >
                                <label htmlFor="exampleInputPassword1" className="form-label" >Author</label>
                                <input style={{ backgroundColor: 'rgb(37, 36, 36)', color: '#fff' }} type="text" className="form-control" id="eauthor" name="eauthor" value={blog.eauthor} onChange={onChange} minLength="3" required />
                            </div>

                            <div className="mb-3" >
                                <label htmlFor="exampleInputPassword1" className="form-label">Image URL</label>
                                <input style={{ backgroundColor: 'rgb(37, 36, 36)', color: '#fff' }} type="text" className="form-control" id="eimage" name="eimage" value={blog.eimage} onChange={onChange} minLength="3" required />
                            </div>

                        </div>
                        <div className="modal-footer">
                            <button ref={closeref} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={blog.etitle.length < 3 || blog.ebody.length < 5} type="button" className="btn btn-primary" onClick={handleSubmit}>Update</button>
                        </div>
                    </div>
                </div>
            </div>

            {blogs.map((blog) => {
                return <Blogdetail key={blog._id} updateBlog={updateBlog} blog={blog}></Blogdetail>
            })}
        </div>

    )
}

export default Blogs
