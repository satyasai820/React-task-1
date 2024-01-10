
import './App.css';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.css'; 
function App() {
  const [nameList, setNameList] = useState([]);
  const [editId, setEditId] = useState('');
  const [name, setName] = useState('');
  const [isEditMode, setIsEditMode] = useState(false);

  //Here I'm Using axios.get method
  useEffect(() => {
    ListOfNames();
  }, []);

  const ListOfNames = () => {
    axios.get('http://localhost:3000/name')
      .then(response => {
        console.log("data",response.data);
        setNameList(response.data);
        
      })
      .catch(error => {
        alert('Hey You Got Url Error ')
      });
  }

  //Here I'm Using axios.post method

  const handleAdd = () => {
    if (name !== '') {
      axios.post('http://localhost:3000/name', { name: name })
        .then(response => {
          setNameList([...nameList, response.data]);
          setName('');
          ListOfNames();

        })
        .catch(error => {
          alert('Error adding name:', error);
        })
    }
    else {
      alert("Please Enter the Name...!")
    }
  }

  const handleEdit = (id) => {
    const selectToEdit = nameList.find((data) => data.id === id);
    setName(selectToEdit.name);
    setEditId(selectToEdit.id);
    setIsEditMode(true);
  };

  //Here I'm Using axios.put method
  const handleUpdate = () => {
    if(name !== ''){
    axios.put(`http://localhost:3000/name/${editId}`, { name: name })
      .then(response => {
        ListOfNames();
        setName('');
        setEditId('');
        setIsEditMode(false);
      })
      .catch(error => {
        alert('Error updating name:', error);
      });
    }else{
      alert("Please enter the Update Name");
    }
  };

  //Here I'm Using axios.delete Method
  const handleRemove = (id) => {
    axios.delete(`http://localhost:3000/name/${id}`)
      .then(response => {
        setName('');
        setIsEditMode(false);
        ListOfNames();
      })
      .catch(error => {
        alert("You to error Man..!")
      })
  };

  return (
    <div className='container '>
      <h1 className='text-center mt-3'>List Of Names</h1>
      <div className="row">
        <div className="col-md-4 mx-auto mt-2 d-flex">
          <input type="text" className="form-control" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
          {isEditMode ? (
            <button type="button" className="btn btn-primary ms-2" onClick={handleUpdate}>
              Update
            </button>
          ) : (
            <button type="button" className="btn btn-success ms-2" onClick={handleAdd}>
              Add
            </button>
          )}
        </div>
        <div className='container'>
          <div className='row row-cols-md-2 justify-content-center'>
            <div className='col'>
              <table className="table mt-3 border shadow">
                <thead>
                  <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Name</th>
                    <th scope="col">Update</th>
                    <th scope="col">Delete</th>
                  </tr>
                </thead>
                <tbody className=''>
                  {nameList.map((item, index) => (
                    <tr key={index}>
                      <td>{item.id}</td>
                      <td>{item.name}</td>
                      <td>
                        <button type="button" className="btn btn-primary" onClick={() => handleEdit(item.id)}>  <i className="fas fa-pencil-alt"></i></button>
                      </td>
                      <td>
                        <button type="button" className="btn btn-danger" onClick={() => handleRemove(item.id)}>  <i className="fas fa-trash-alt"></i> </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


export default App;
