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
            books: []
        }
    }
    componentDidMount() {
        axios.get('http://localhost:5000/books')
            .then(response => {
                this.setState({ 
                    books: response.data.map(book => [book.isbn, book.name, book.author]) 
                });
                console.log('==> ', response.data)
                console.log('-->', this.state.books)
            })
            .catch((error) => {
                console.log(error);
            });
    }
    bookList() {
        console.log('----> ', this.state.books)
        return this.state.books.map(book => {
            return <div className="listItem">
                <h4>{book[1]}</h4>
                <p style={{ color:"#ffffff", paddingLeft:"10%", marginLeft:"auto", display:"flex", justifySelf:"flex-end"}}>By {book[2]}</p>
                <div style={{ width:"50%",display:"flex",justifyContent:"flex-end",alignItems:"flex-end",
                justifySelf:"flex-end", marginLeft:"auto" }}>
                    <a href={"http:/book/"+book[0]}><button className="buttonStyle">View</button></a>
                </div>
            </div>
        })
    }
    render(){
        return(
            <div className="primaryBox">
                <h1>Welcome to Coco Book Store</h1>
                <p>A glimpse at our wide variety of bookss</p>
                    <div style={{ overflowY:"scroll", overflowX:"hidden", height:"80%", margin: "1%"}}>
                    { this.bookList() }
                    </div>
                <p>To view our authors click <a href='/authors'>here</a> And to insert to book click <a href='/addbook'>here</a></p>
            </div>
        )
    }
}