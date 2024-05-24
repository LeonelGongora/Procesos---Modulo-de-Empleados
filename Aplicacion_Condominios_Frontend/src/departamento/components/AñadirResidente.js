import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './AñadirResidenteCss.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const AñadirResidente = (props) => {
    const [modal, setModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [residentes, setResidentes] = useState([
      { id: 1, nombre: 'Juan Calle', seleccionado: false },
      { id: 2, nombre: 'Samuel la toxica', seleccionado: false },
      { id: 3, nombre: 'Andrews la venenosa', seleccionado: false }
    ]);
  
    const toggle = () => {
      setModal(!modal);
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
      };
  
    const filteredResidentes = residentes.filter(residente =>
        residente.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    const handleSeleccionarResidente = (residenteId) => {
        setResidentes(residentes.map(residente =>
          residente.id === residenteId
            ? { ...residente, seleccionado: !residente.seleccionado }
            : residente
        ));
    };
    
      return (
        <div>
          <Button color="danger" onClick={toggle}>
            {props.buttonLabel}
          </Button>
          <Modal isOpen={modal} toggle={toggle} className="modal-dialog-centered" {...props}>
          <ModalHeader style={{ marginLeft: 'auto', marginRight: 'auto' }}>Añadir Residente</ModalHeader>
            <ModalBody>
              <div className="search-container">
                <input
                  type="text"
                  placeholder="Buscar residente..."
                  value={searchTerm}
                  onChange={handleSearch}
                  className="search-input"
                />
                <FontAwesomeIcon icon={faSearch} className="search-icon" />
              </div>
              <ul className="residentesRegistrados">
                {filteredResidentes.map(residente => (
                  <li key={residente.id} className="residente-item">
                    <span style={{ marginLeft: '1rem' }}>{residente.nombre}</span>
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={residente.seleccionado}
                        onChange={() => handleSeleccionarResidente(residente.id)}
                        className="checkbox-input"
                      />
                      <span className="checkbox-custom"></span>
                    </label>
                  </li>
                ))}
              </ul>
            </ModalBody>
            <ModalFooter>
              <Button onClick={toggle} className='boton-modal'>
                Añadir
              </Button>
              <Button onClick={toggle} className='boton-cerrar'>
                Cerrar
            </Button>
            </ModalFooter>
          </Modal>
        </div>
      );
    };
  
  export default AñadirResidente;