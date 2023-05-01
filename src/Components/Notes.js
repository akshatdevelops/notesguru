import React, { useEffect } from 'react'
import { useContext } from 'react'
import noteContext from '../Context/noteContext'
import Notesitem from './Notesitem'
import AdddNote from './AdddNote'
import { useRef } from 'react' 
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'



const Notes = (props) => {
    const context = useContext(noteContext)
    let navigate=useNavigate()
    const { notes, getNotes,editNote } = context
    useEffect(() => {
        if(localStorage.getItem('token')){
            getNotes()
        }
        else{
            navigate("/Login")
        }
        
    }, [])
    const ref = useRef(null) 
    const refClose=useRef(null)
    const [note,setNote]=useState({id:"",etitle:"",edescription:"",etag:""})
    const updateNote = (currentnote) => {
        ref.current.click()
        setNote({id:currentnote._id,etitle:currentnote.title,edescription:currentnote.description,etag:currentnote.tag})
    }
    
    const handleClick=(e)=>{
        e.preventDefault()
        editNote(note.id,note.etitle,note.edescription,note.etag)
        refClose.current.click()
        
       }
       const onChange=(e)=>{
       setNote({...note,[e.target.name]:e.target.value})
       }

    

    return (
        <>
            <AdddNote></AdddNote>
            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="etitle" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} aria-describedby="emailHelp" onChange={onChange} />

                                </div>
                                <div className="mb-3">
                                    <label htmlFor="edescription" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edescription" name='edescription' value={note.edescription} onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="etag" className="form-label">Tag</label>
                                    <input type="tag" className="form-control" id="etag" name='etag' value={note.etag} onChange={onChange} />
                                </div>

                                
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button onClick={handleClick} type="button" className="btn btn-primary">Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='row my-3'>
                <h1>Your Notes</h1>
                {notes.map((note) => {
                    return <Notesitem key={note._id} updateNote={updateNote} note={note}></Notesitem>
                })}
            </div>

        </>

    )
}

export default Notes
