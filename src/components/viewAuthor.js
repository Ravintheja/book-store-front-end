import React, { Component, useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ViewAuthor = () => {
    let { id } = useParams();
    let [editMode, setEdit] = useState(false)
    let [fname, setFname] = useState([null]);
    let [lname, setLname] = useState([null]);
    let [authId, setId] = useState([null]);
    let [isLoad, setLoad] = useState(false)

    useEffect(() => {
        axios.get('http://localhost:5000/author/${id}')
        .then(response => {
            console.log('Query Data =>>> ', response.data)
            setFname(response.data[0]['firstName'])
            setLname(response.data[0]['lastName'])
            setId(response.data[0]['id'])
        })
        .catch((error) => {
            console.log(error);
        });
        setLoad(true)
    }, [])

    return <div className="primaryBox"><h1>{fname? fname : "Loading.."}</h1>
    <h2>{lname? lname : "Loading.."}</h2>
    <h5>Author Id:{authId? authId : "Loading.."}</h5>
    <p>"This author is a literary alchemist, weaving words into vivid tapestries of emotion and imagination. 
        With a pen as their wand, they conjure worlds where characters come to life, emotions resonate deeply, 
        and stories unfold like ancient scrolls waiting to be unraveled. Their storytelling prowess is a symphony of creativity, 
        drawing readers into enchanting realms where the boundaries of reality and fiction blur. With each book, 
        this author invites their audience to embark on a transformative journey, 
        where the power of words becomes a portal to new experiences and uncharted territories of the human soul. 
        They are a master of their craft, a weaver of dreams, and a guide through the realms of the written word."</p>
        {editMode ? EditAuthor(fname, lname) : <button className="buttonStyle" disabled="true" type="button" onClick={setEdit(true)}>Click here to edit</button>}
        </div>

}

const EditAuthor = (firstName, lastName) => {
    var inputs = {fname : firstName, lname: lastName}
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
        <h4>Edit Author</h4>
        <form onSubmit={handleSubmit}>
        <label>First Name: <input type="text" name="fname" defaultValue={firstName} onChange={handleChange}/>
        </label>
        <br/>
        <label>Last Name: <input type="text" name="lname" defaultValue={lastName} onChange={handleChange}/>
        </label>
        <br/>
        <input className="buttonStyle" style={{ marginTop:"10px" }} type="submit"/>
       </form>
    </div>
}

function edit(inputs){
    axios.put(`http://localhost:5000/author?fname=${inputs['fname']}&lname=${inputs['lname']}`).then(
        response => {console.log(response)}
    )
    console.log('------->> ')
}

export default ViewAuthor;