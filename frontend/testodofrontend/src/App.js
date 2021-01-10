import React, { useState, useEffect, useRef } from 'react';
import {Container, Form, Button, ListGroup, CloseButton, Glyphicon} from 'react-bootstrap';
import { Pencil, Check } from 'react-bootstrap-icons';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';

function App() {
  
  const [todo, setTodo] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [editTodo, setEditTodo] = useState(false);

  const [editedTitle, setEditedTitle] = useState('');
  const [editedContent, setEditedContent] = useState('');
  

  useEffect(() => {
    axios.all([
      axios.get('http://127.0.0.1:3000/todos')
    ])
    .then(axios.spread((todoRes) => {
      setTodo(todoRes.data);
    }));
  }, []);

  useEffect(() => {
    console.log(todo)
  }, [todo])

  const handleSubmit = (e) => 
  {
    e.preventDefault()
    const titulli = e.target.title.value
    setTitle(titulli)
    const pershkrimi = e.target.content.value
    setContent(pershkrimi)
    axios.post('http://127.0.0.1:3000/request', { title: titulli, content: pershkrimi })
    window.location.reload(false);
  }

  const handleDelete = (key) =>
  {
    let url = "http://127.0.0.1:3000/request/" + key;
    axios.delete(url);
    window.location.reload(false);
  }

  const handleEdit = (key) =>
  {
    setEditTodo(!editTodo);
  }

  const sendEdit = (e, key) =>
  {
    e.preventDefault()
    const titulli = editedTitle
    const pershkrimi = editedContent
    let url = "http://127.0.0.1:3000/request/" + key;
    axios.patch(url, { title: titulli, content: pershkrimi })
    window.location.reload(false);
  }

  return (
    <div className="App">
      <Container fluid>
        <h2>Todos</h2>
        <hr />
        <div className="formdiv">
          <form onSubmit={handleSubmit}>
          <Form.Group controlId="todoTitle">
            <Form.Label>Todo title</Form.Label>
            <Form.Control type="text" placeholder="Todo title" name="title" required />
          </Form.Group>

          <Form.Group controlId="todoContent">
            <Form.Label>Content</Form.Label>
            <Form.Control as="textarea" rows={3} placeholder="Todo content" name="content" required />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
          </form>
        </div>
        <hr />
        <div className="tododiv">
        {!editTodo ? (
          <>
          {todo.map((item) => {
            return <ListGroup key={item.id}>
                  <ListGroup.Item>Title: {item.title}; Description: {item.content};
                  <Button variant="link" className="close" id="pencil" onClick={() => handleEdit(item.id)}>
                  <Pencil />
                  </Button>
                  <CloseButton onClick={() => handleDelete(item.id)} />
                  </ListGroup.Item>
            </ListGroup>
          })}
          </>
        ) : (
          <>
          {todo.map((item) => {
            return (
              <form id="myForm">
                <ListGroup key={item.id}>
                      <ListGroup.Item>Title: <input type="text" name="title" defaultValue={item.title} onChange={(e) => setEditedTitle(e.target.value)} /> Description: <input type="text" name="content" defaultValue={item.content} onChange={(e) => setEditedContent(e.target.value)} />
                      <Button variant="link" className="close" onClick={(e) => sendEdit(e, item.id)} id="done">
                      <Check />
                      </Button>
                      <CloseButton onClick={() => handleEdit(item.id)} />
                      </ListGroup.Item>
                </ListGroup>
              </form>
            )
            
          })}
          </>
        )}
        
        </div>
        
      </Container>
    </div>
  );
}

export default App;
