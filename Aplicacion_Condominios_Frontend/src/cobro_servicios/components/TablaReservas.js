import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Table, Button, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import { Link, useParams } from "react-router-dom";
import { FaMoneyBillWave } from "react-icons/fa"; 

import "bootstrap/dist/css/bootstrap.min.css";

const endpoint = "http://localhost:8000/api";

const TablaReservas = () => {
  const [reservas, setReservas] = useState([]);
  const [filtroPagado, setFiltroPagado] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    fetchReservas();
  }, [id, filtroPagado]);

  const fetchReservas = async () => {
    try {
      const response = await axios.get(`${endpoint}/common-areas/${id}/reservaPagada`);
      const reservations = response.data.data.reservations.map(reserva => ({
        ...reserva,
        reserva_pagada: reserva.reserva_pagada ? "Pagado" : "No pagado"
      }));

      const filteredReservas = filtroPagado === null ? reservations : reservations.filter(reserva => reserva.reserva_pagada === filtroPagado);

      setReservas(filteredReservas);
    } catch (error) {
      console.error("Error al obtener las reservas:", error);
    }
  };

  const handlePagarReserva = (idReserva) => {
    window.location.href = `/cobros/pagar-reserva-area/${idReserva}`;
  }

  const toggleDropdown = () => {
    setDropdownOpen(prevState => !prevState);
  }

  const handleFiltro = (filtro) => {
    setFiltroPagado(filtro === "todos" ? null : filtro);
  };

  return (
    <Container>
      <Row>
        <Col>
          <h2 className="text-center mb-5">Reservas del área común</h2>
          <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown} className="mb-3">
            <DropdownToggle caret color="primary">
              Filtrar por estado de reserva
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem onClick={() => handleFiltro("todos")}>Todos</DropdownItem>
              <DropdownItem onClick={() => handleFiltro("Pagado")}>Pagado</DropdownItem>
              <DropdownItem onClick={() => handleFiltro("No pagado")}>No Pagado</DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID de Reserva</th>
                <th>Fecha de Reserva</th>
                <th>Hora de Inicio</th>
                <th>Hora de Fin</th>
                <th>Motivo</th>
                <th>Número de Personas</th>
                <th>Reserva Pagada</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {reservas.map((reserva, index) => (
                <tr key={index}>
                  <td>{reserva.id}</td>
                  <td>{reserva.reserved_date}</td>
                  <td>{reserva.start_time}</td>
                  <td>{reserva.end_time}</td>
                  <td>{reserva.reason}</td>
                  <td>{reserva.number_of_people}</td>
                  <td>{reserva.reserva_pagada}</td>
                  <td>
                    <Button color="success" onClick={() => handlePagarReserva(reserva.id)} disabled={reserva.reserva_pagada === "Pagado"}>Pagar reserva</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default TablaReservas;
