import React, { Component } from 'react';
import axios from 'axios';

// const angel = this.state.books
// const listItems = angel.map((ang) =>
//   <div className="listItem">
//     <h4>{ang.name}</h4>
//     <h6>By Jodi Picoult</h6>
//   </div>
// )

export default class Home extends Component{
    constructor(props){
        super(props);
        this.state = {
            authors: []
        }
    }
    componentDidMount() {
        axios.get('http://localhost:5000/authors')
            .then(response => {
                this.setState({ 
                    authors: response.data.map(author => [author.id, author.firstName, author.lastName]) 
                });
                console.log('==> ', response.data)
                console.log('-->', this.state.authors)
            })
            .catch((error) => {
                console.log(error);
            });
    }
    authorList() {
        console.log('----> ', this.state.authors)
        return this.state.authors.map(author => {
            return <div className="listItem" style={{ justifyContent:"flex-end" }}>
                <div>
                    <p style={{ color:"#ffffff" }}>{author[1]} {author[2]}</p>
                </div>
                <div style={{ width:"80%",display:"flex",justifyContent:"flex-end",alignItems:"flex-end",
                justifySelf:"flex-end"}}>
                    <a href={"http:/author/"+author[0]}><button className="buttonStyle">View</button></a>
                </div>
            </div>
        })
    }
    render(){
        return(
            <div className="primaryBox">
                <h1>Welcome to Coco Book Store</h1>
                <p>A glimpse at our authors</p>
                    <div style={{ overflowY:"scroll", overflowX:"hidden", height:"80%", margin: "1%"}}>
                    { this.authorList() }
                    </div>
                    <p>To view our books click <a href='/'>here</a> And to insert an author click <a href='/addAuthor'>here</a></p>
            </div>
        )
    }
}