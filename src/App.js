import logo from './logo.svg';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import './App.css';

import Home from "./components/home.component"
import Authors from "./components/authors.component"
import ViewBook from "./components/viewBook"
import ViewAuthor from "./components/viewAuthor"
import AddBook  from "./components/addBook"
import AddAuthor from './components/addAuthor';

function App() {
  return (
    <div className="App">
        <Router>
        <Routes>
          <Route exact path='/' element={< Home />}/>
          <Route exact path="/authors" element={< Authors />}/>
          <Route exact path="/book/:id" element={< ViewBook />}/>
          <Route exact path="/author/:id" element={< ViewAuthor />}/>
          <Route exact path="/addbook" element={< AddBook />}/>
          <Route exact path="/addAuthor" element={< AddAuthor />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
