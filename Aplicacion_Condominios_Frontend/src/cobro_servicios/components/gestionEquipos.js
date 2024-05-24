import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaTrash, FaEdit } from 'react-icons/fa';

const GestionEquipos = () => {
    const [equipamientos, setEquipamientos] = useState([]);
    const endpoint = "http://localhost:8000/api";

    useEffect(() => {
        const obtenerEquipamientos = async () => {
            try {
                const response = await axios.get(`${endpoint}/obtener-equipamientos`);
                setEquipamientos(response.data.equipamientos);
            } catch (error) {
                console.error('Error al obtener los equipamientos:', error);
            }
        };
        obtenerEquipamientos();
    }, []);

    const eliminarEquipo = async (id) => {
        try {
            await axios.delete(`${endpoint}/eliminar-equipo/${id}`);
            setEquipamientos(equipamientos.filter(equipo => equipo.id !== id));
        } catch (error) {
            console.error('Error al eliminar el equipo:', error);
        }
    };

    const editarEquipo = (id) => {
        // Lógica para editar un equipo
        window.location.href = `/cobros/edicion-equipo/${id}`;
    };

    return (
        <div className="container">
            <h2>Gestión de Equipos</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Descripción</th>
                        <th>Costo</th>
                        <th>Área Común</th>
                        <th>Editar</th>
                        <th>Eliminar</th> 
                    </tr>
                </thead>
                <tbody>
                    {equipamientos.map(equipo => (
                        <tr key={equipo.id}>
                            <td>{equipo.id}</td>
                            <td>{equipo.nombre}</td>
                            <td>{equipo.descripcion}</td>
                            <td>{equipo.costo}</td>
                            <td>{equipo.area_comun_nombre}</td>
                            <td>
                                <button className="btn btn-primary" onClick={() => editarEquipo(equipo.id)}> <FaEdit /></button>
                            </td>
                            <td>
                                <button className="btn btn-danger" onClick={() => eliminarEquipo(equipo.id)}> <FaTrash /></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default GestionEquipos;
