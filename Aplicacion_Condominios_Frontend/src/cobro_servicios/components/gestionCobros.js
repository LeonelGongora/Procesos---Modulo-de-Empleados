import React, { useState, useEffect } from 'react';
import { FaFileAlt } from 'react-icons/fa'; // Importamos el icono de registrar

const GestionCobro = () => {
    const endpoint = "http://localhost:8000/api";
    const [departamentos, setDepartamentos] = useState([]);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        fetch(`${endpoint}/obtener-departamentos`)
            .then(response => response.json())
            .then(data => {
                const departamentosArray = Object.entries(data).map(([id, nombre]) => ({ id, nombre }));
                setDepartamentos(departamentosArray);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const generarFormulario = (idDepartamento) => {
        // Aquí puedes implementar la lógica para generar el formulario de pre-aviso
        window.location.href = `/cobros/generar-preaviso/${idDepartamento}`;
    };

    return (
        <div className="container">
            <h2>Gestión de Cobro por Departamentos</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Departamento</th>
                        <th>Pre-Aviso</th>
                    </tr>
                </thead>
                <tbody>
                    {departamentos.map(departamento => (
                        <tr key={departamento.id}>
                            <td>{departamento.id}</td>
                            <td>{departamento.nombre}</td>
                            <td>
                                <button className="btn btn-primary" onClick={() => generarFormulario(departamento.id)} style={{ width: '60px' }}>
                                    <FaFileAlt />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default GestionCobro;
