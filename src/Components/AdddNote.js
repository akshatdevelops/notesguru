/* import React from 'react'
import { useContext } from 'react'
import noteContext from '../Context/noteContext'
import { useState } from 'react'



const AdddNote = () => {
    const context = useContext(noteContext)
    const {addNote} = context

    const [note,setNote]=useState({title:"",description:"",tag:"default"})
    const handleClick=(e)=>{
     e.preventDefault()
     addNote(note.title,note.description,note.tag)
    }
    const onChange=(e)=>{
    setNote({...note,[e.target.name]:e.target.value})
    }
    return (
        <div className='container my-3'>
            <h1>Add your Notes</h1>
            <form>
                <div class="mb-3">
                    <label htmlFor="title" class="form-label">Title</label>
                    <input type="text" class="form-control" id="title" name="title" aria-describedby="emailHelp" onChange={onChange} />
                    
                </div>
                <div class="mb-3">
                    <label htmlFor="description" class="form-label">Description</label>
                    <input type="text" class="form-control" id="description" name='description' onChange={onChange} />
                </div>
                <div class="mb-3">
                    <label htmlFor="tag" class="form-label">Tag</label>
                    <input type="tag" class="form-control" id="tag" name='tag' onChange={onChange} />
                </div>
                
                <button type="submit" class="btn btn-primary" onClick={handleClick}>Add Note</button>
            </form>
        </div>
    )
}

export default AdddNote
 */
import React, { useContext, useState } from 'react';
import noteContext from '../Context/noteContext';

const AdddNote = () => {
  const context = useContext(noteContext);
  const { addNote, searchNotes } = context;

  const [note, setNote] = useState({ title: '', description: '', tag: 'default' });
  const [searchKeyword, setSearchKeyword] = useState('');

  const handleClick = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const onSearch = (e) => {
    e.preventDefault();
    searchNotes(searchKeyword);
  };

  return (
    <div className='container my-3'>
      <h1>Add your Notes</h1>
      <form>
        <div className='mb-3'>
          <label htmlFor='title' className='form-label'>
            Title
          </label>
          <input type='text' className='form-control' id='title' name='title' aria-describedby='emailHelp' onChange={onChange} />
        </div>
        <div className='mb-3'>
          <label htmlFor='description' className='form-label'>
            Description
          </label>
          <input type='text' className='form-control' id='description' name='description' onChange={onChange} />
        </div>
        <div className='mb-3'>
          <label htmlFor='tag' className='form-label'>
            Tag
          </label>
          <input type='tag' className='form-control' id='tag' name='tag' onChange={onChange} />
        </div>
        <button type='submit' className='btn btn-primary' onClick={handleClick}>
          Add Note
        </button>
      </form>
      <form>
        <div className='mb-3'>
          <label htmlFor='searchKeyword' className='form-label'>
            Search Note
          </label>
          <input type='text' className='form-control' id='searchKeyword' name='searchKeyword' onChange={(e) => setSearchKeyword(e.target.value)} />
        </div>
        <button type='submit' className='btn btn-primary' onClick={onSearch}>
          Search
        </button>
      </form>
    </div>
  );
};

export default AdddNote;
