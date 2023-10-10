import React, { Component, useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ViewBook = () => {
    let { id } = useParams();
    let [editMode,setEdit] = useState(false)
    let [name, setName] = useState([null]);
    let [author, setAuthor] = useState([null]);
    let [isbn, setIsbn] = useState([null]);
    let [authors, setAuth] = useState(['1', 'J.K,', 'Rowling']) //dummy value

    useEffect(() => {
        axios.get('http://localhost:5000/book/${id}')
        .then(response => {
            console.log('Query Data =>>> ', response.data)
            setName(response.data[0]['name'])
            setAuthor(response.data[0]['author'])
            setIsbn(response.data[0]['isbn'])
        })
        .catch((error) => {
            console.log(error);
        });
        axios.get('http://localhost:5000/authors')  //Authors List for Edit Dropdown
            .then(response => {
                setAuth(response.data.map(author => [author.id, author.firstName, author.lastName]))
            })
        console.log('Authors:',authors)
    }, [])
    return <div className="primaryBox">
            <h1>{name? name : "Loading.."}</h1>
            <h3>{author? author : "Loading.."}</h3>
            <h3>{isbn? isbn : "Loading.."}</h3>
            <p>"In the enchanting world of 'Whispers in the Mist,' secrets are like shadows, 
                always lurking just out of sight. As you turn the pages of this gripping thriller, 
                you'll be drawn into a web of intrigue, where a small town's dark history resurfaces, 
                and a determined detective must unravel the tangled threads of a chilling mystery. 
                With every twist and turn, 'Whispers in the Mist' will keep you on the edge of your seat, 
                eager to uncover the shocking truth that lies beneath the fog-veiled facade of this picturesque town.
                Prepare for a pulse-pounding journey through suspense and deception, 
                where the only certainty is that nothing is as it seems."</p>
                {editMode ? editBook(name, author, authors, isbn) : <button className="buttonStyle" disabled="true" type="button" onClick={setEdit(true)}>Click here to edit</button>}
        </div>

}
const editBook = (name, author, authors, isbnNo) => {
    console.log('Authors ', authors)
    var inputs = {bookName : name, authorId: null, isbn: isbnNo }
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
    return <div className="editBox">
        <h4>Edit Book</h4>
        <form onSubmit={handleSubmit}>
        <label> 
            Book Name: <input type="text" name="bookName" defaultValue={name} onChange={handleChange}/>
        </label>
        <br/>
        <label>Author: <select defaultValue="1" name="authorId" onChange={handleChange}>
            {authors.map(author => {
                console.log('Author ==> ', author[2]);
                return <option value={author[0]}>{author[1]} {author[2]}</option>
            })
            }
        </select>
        </label>
        <br/>
        <input className="buttonStyle" style={{ marginTop:"10px" }} type="submit"/>
       </form>
    </div>
}

function edit(inputs){
    axios.put(`http://localhost:5000/book?bname=${inputs['bookName']}&authId=${inputs['authorId']}&isbn=${inputs['isbn']}`).then(
        response => {console.log(response)}
    )
    console.log('------->> ')
}

export default ViewBook;