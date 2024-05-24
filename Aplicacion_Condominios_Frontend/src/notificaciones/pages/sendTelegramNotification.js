import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap';

export const SendTelegramNotification = () => {
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    getAllPersons();
  }, []);

//  const notice = { 
//    id: 1,
//    title: 'Aviso de desalojo', 
//    description: 'Se les notifica que por las faltas en los cobros de alquiler, deben desocupar el departamento.',
//    created_at: '2024-02-12 12:45:45'
//  };

  const notice = JSON.parse(sessionStorage.notice);

  // const users = [
  //   { id: 1, first_name: 'Alam', last_name: 'Brito Delgado', chat_id: 1314077933 },
  //   { id: 2, first_name: 'Dolores', last_name: 'De Barriga', chat_id: 1314077933 },
  //   { id: 3, first_name: 'Peter', last_name: 'Parker', chat_id: 1314077933 },
  //   { id: 4, first_name: 'Octavio', last_name: 'Otto', chat_id: 1314077933 }
  // ];

  const getAllPersons = async () => {
    const response = await axios.get('http://127.0.0.1:8000/api/persons');
    setUsers(response.data);
  }

  // const selectUser = (user) => {
  //   let selectedUser = selectedUsers.find((selectedUser) => { return user.id == selectedUser.id });

  //   if (selectedUser === null || selectedUser === undefined) {
  //     setSelectedUsers(selectedUser);
  //   } else {
  //     let idx = selectedUsers.indexOf(selectedUser);
  //     selectedUsers.splice(idx, 1);
  //   }
  // }

  const sendNotification = () => {
    let data = {
      text: 'Fecha: ' + notice.created_at + '\n\n' + notice.title + '\n\n' + notice.description,
      chat_ids: selectedUsers.map((selectedUser) => selectedUser.chat_id)
    }
    
    axios.post('http://127.0.0.1:8000/api/telegram/notifications', data)
      .then(response => {
        console.log(response.data);
        alert(response.data.message);
      })
      .catch(error => {
        console.error('Error al enviar los datos:', error);
      });
  }

  const selectUser = (user) => {
    const isSelected = selectedUsers.some((selectedUser) => selectedUser.id === user.id);
  
    if (!isSelected) {
      setSelectedUsers(prevSelectedUsers => [...prevSelectedUsers, user]);
    } else {
      setSelectedUsers(prevSelectedUsers => prevSelectedUsers.filter((selectedUser) => selectedUser.id !== user.id));
    }
  }

  return (
    <div className='container px-4'>
      <div className='row'>
        <div className='col'>
          <button type='button' className='btn btn-outline-dark' data-bs-toggle='modal' data-bs-target='#users-list'>
            Seleccionar clientes
          </button>

          <div className='modal fade' id='users-list' tabindex='-1' aria-labelledby='users-list' aria-hidden='true'>
            <div className='modal-dialog modal-dialog-centered modal-dialog-scrollable'>
              <div className='modal-content'>
                <div className='modal-header'>
                  <h5 className='modal-title' id='exampleModalLabel'>Lista de clientes</h5>
                  <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
                </div>
                <div className='modal-body'>
                  <ul className='list-group'>
                    {
                      users.map((user) => (
                        <li className='list-group-item' key={user.id}>{user.nombre} {user.apellido}<input type='checkbox' onClick={ () => selectUser(user) } /></li>
                      ))
                    }
                  </ul>
                </div>
              </div>
            </div>
          </div>


          <div>
            <div>
            <p>Enviar a:</p>
            <ul className='list-group'>
              {
                selectedUsers.map((selectedUser) => (
                  <li className='list-group-item' key={selectedUser.id}>{selectedUser.nombre} {selectedUser.apellido}</li>
                ))
              }
            </ul>
            </div>
          </div>

          <button type='button' className='btn btn-success' onClick={ () => sendNotification() }>ENVIAR</button>
        </div>

        <div className='col'>
          <div className='card' style={{width: 18 + 'rem'}}>
            <div className='card-body'>
              <p className='card-text'><b>Fecha:</b> { notice.created_at }</p>
              <h5 className='card-title'>{ notice.title }</h5>
              <p className='card-text'>{ notice.description }</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};
