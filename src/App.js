import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import NoteState from "./context/notes/NoteState";
import Front from './components/Front';
import Login from './components/Login';
import Signup from './components/Signup';
import AddBlog from './components/AddBlog';
import Blogs from './components/Blogs';

function App() {
  return (
    <>
      <NoteState>
        <Router>
          <Navbar></Navbar>

          <Switch>

            <Route exact path="/">
              <Front></Front>
            </Route>

            <Route exact path="/notes">
              <Home></Home>
            </Route>

            <Route exact path="/login">
              <Login></Login>
            </Route>

            <Route exact path="/signup">
              <Signup></Signup>
            </Route>

            <Route exact path="/create">
              <AddBlog></AddBlog>
            </Route>

            <Route exact path="/blogs">
              <Blogs></Blogs>
            </Route>

          </Switch>

        </Router>
      </NoteState>

    </>
  );
}

export default App;
