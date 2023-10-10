import React, { Component, useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const AddBook = () => {
    let [authors, setAuth] = useState(['1', 'J.K,', 'Rowling']) //dummy value
    var inputs = {bookName : 'Test', authorId: 1, isbn: 'AA000' }

    useEffect(() => {
        axios.get('http://localhost:5000/authors')  //Authors List for Edit Dropdown
            .then(response => {
                setAuth(response.data.map(author => [author.id, author.firstName, author.lastName]))
            })
        console.log('Authors:',authors)
    }, [])
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        inputs[name] = value
        console.log('Change ', inputs)
    }
    const handleSubmit = (event) => {
        event.preventDefault()
        console.log('Submit ', inputs)
        edit(inputs)
    }
    return <div className="primaryBox">
        <h2>Add a Book</h2>
        <div className="editBox">
            <p style={{ color:"#ffffff"}}>Enter the details of the book</p>
            <form onSubmit={handleSubmit}>
                <label>
                    Book Name: <input type="text" name="bookName" onChange={handleChange}/>
                </label><br/>
                <label>
                    ISBN: <input type="text" name="isbn" onChange={handleChange}/>
                </label><br/>
                <label>Author: <select defaultValue="1" name="authorId" onChange={handleChange}>
                    {authors.map(author => {
                        console.log('Author ==> ', author[2]);
                        return <option value={author[0]}>{author[1]} {author[2]}</option>
                    })
                    }
                    </select>
                </label><br/>
                <input className="buttonStyle" style={{ marginTop:"10px" }} type="submit"/>
            </form>
        </div>
    </div>
}

function edit(inputs){
    axios.post(`http://localhost:5000/book?bname=${inputs['bookName']}&authId=${inputs['authorId']}&isbn=${inputs['isbn']}`).then(
        response => {console.log(response)}
    )
    console.log('------->> ')
}

export default AddBook;