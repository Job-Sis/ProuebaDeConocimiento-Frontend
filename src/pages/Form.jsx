import React from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export const Form = () => {
  const navigate = useNavigate();
  const [poesia, setPoesia] = useState(["", "lírica", "épica", "dramática"]);
  const [g, setG] = useState(["", "M", "F"]);
  const [form, setForm] = useState({
    carnet: "",
    name: "",
    address: "",
    gender: "",
    phone: 0,
    birthdate: Date(),
    studentCareer: "",
    poeticGenre: "",
  });

  const add = async () => {
    try {
      let body = {
        carnet: document.getElementById("inputCarnet").value,
        name: document.getElementById("inputName").value,
        address: document.getElementById("inputAddress").value,
        gender: document.getElementById("inputGender").value,
        phone: document.getElementById("inputPhone").value,
        birthdate: document.getElementById("inputBirthdate").value,
        studentCareer: document.getElementById("inputStudentCareer").value,
        poeticGenre: document.getElementById("inputPoeticGenre").value,
      };
      console.log(body);
      const { data } = await axios.post(
        "http://localhost:3000/inscription/add",
        body
      );

      if (data.message) {
        alert(data.message);
        navigate(`/myconcurso/${data.id}`);
      }
    } catch (err) {
      console.error(err);
      alert(err.response.data.message);
      throw new Error(err.response.message || "Error to saved inscription");
    }
  };

  return (
    <>
      <div className="container mx-5 px-5 my-4">
        <Link to={"/reporte"}>
          <button className="btn btn-info">Reporte</button>
        </Link>
      </div>
      <div className="card abs-center m-auto p-5" style={{ width: "80vw" }}>
        <h2>Crea una solicitud</h2>

        <div className="form-group m-2">
          <label>Carnet</label>
          <input
            id="inputCarnet"
            name="carnet"
            type="text"
            className="form-control"
            placeholder="carnet"
          />
        </div>
        <div className="form-group m-2">
          <label>Nombre</label>
          <input
            id="inputName"
            name="name"
            type="text"
            className="form-control"
            placeholder="Name"
          />
        </div>
        <div className="form-group m-2">
          <label>Direccion</label>
          <input
            id="inputAddress"
            name="address"
            type="text"
            className="form-control"
            placeholder="Address"
          />
        </div>

        <div className="mb-3 m-2">
          <label htmlFor="inputGender" className="form-label">
            Genero
          </label>
          <select className="form-control" id="inputGender">
            {g.map((g, i) => {
              return (
                <option key={i} value={g}>
                  {g}
                </option>
              );
            })}
          </select>
        </div>

        <div className="form-group m-2">
          <label>Telefono</label>
          <input
            id="inputPhone"
            name="phone"
            type="number"
            className="form-control"
            placeholder="Phone"
          />
        </div>
        <div className="form-group m-2">
          <label>Fecha De Nacimiento</label>
          <input
            id="inputBirthdate"
            name="birthdate"
            type="date"
            className="form-control"
          />
        </div>
        <div className="form-group m-2">
          <label>Carrera Del Estudiente</label>
          <input
            id="inputStudentCareer"
            name="studentCareer"
            type="text"
            className="form-control"
            placeholder="Carrera Del Estudiante"
          />
        </div>
        <div className="mb-3 m-2">
          <label htmlFor="inputPoeticGenre" className="form-label">
            Genero De Poesia
          </label>
          <select className="form-control" id="inputPoeticGenre">
            {poesia.map((poesia, i) => {
              return (
                <option key={i} value={poesia}>
                  {poesia}
                </option>
              );
            })}
          </select>
        </div>
        <button
          onClick={(e) => add(e)}
          type="button"
          className="btn btn-primary m-2 p-3 btn-lg btn-block"
        >
          <span>Crear</span>
          <i></i>
        </button>
      </div>
    </>
  );
};
