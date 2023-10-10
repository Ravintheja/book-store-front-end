import React, { Component, useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const AddAuthor = () => {
    var inputs = {fName : 'Test', lName: 'Test'}
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        inputs[name] = value
        console.log('Change ', inputs)
    }
    const handleSubmit = (event) => {
        event.preventDefault()
        console.log('Submit ', inputs)
        add(inputs)
    }
    return <div className="primaryBox">
        <h2>Add an Author</h2>
        <div className="editBox">
            <p style={{ color:"#ffffff"}}>Enter the details of the author</p>
            <form onSubmit={handleSubmit}>
                <label>
                    First Name: <input type="text" name="fName" onChange={handleChange}/>
                </label><br/>
                <label>
                    Last Name: <input type="text" name="lName" onChange={handleChange}/>
                </label><br/>
                <input className="buttonStyle" style={{ marginTop:"10px" }} type="submit"/>
            </form>
        </div>
    </div>
}

function add(inputs){
    axios.post(`http://localhost:5000/author?fName=${inputs['fName']}&lName=${inputs['lName']}`).then(
        response => {console.log(response)}
    )
    console.log('------->> ')
}

export default AddAuthor;