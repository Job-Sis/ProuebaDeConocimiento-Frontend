import React from "react";
import axios from "axios"
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";

export const MyConcurso = () => {
  const { id } = useParams();
  const [inscription, setInscription] = useState({});
  const [date, setDate] = useState("")
  const [birthdate, setBirthdate] = useState("")
  const [registrationDate, setRegistrationDate] = useState("")

  const get = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:3000/inscription/get/${id}`
      );
      if (data.inscription) {
        setInscription(data.inscription);
        //Castear la fecha a string
        let dateObj = new Date(data.inscription.date);
        let options = { year: 'numeric', month: 'long', day: 'numeric' };
        let formatted = dateObj.toLocaleDateString(undefined, options);
        setDate(formatted)

        let dateObj2 = new Date(data.inscription.birthdate);
        let options2 = { year: 'numeric', month: 'long', day: 'numeric' };
        let formatted2 = dateObj2.toLocaleDateString(undefined, options2);
        setBirthdate(formatted2)

        let dateObj3 = new Date(data.inscription.registrationDate);
        let options3 = { year: 'numeric', month: 'long', day: 'numeric' };
        let formatted3 = dateObj3.toLocaleDateString(undefined, options3);
        setRegistrationDate(formatted3)
      }
    } catch (err) {
      console.error(err);
      throw new Error("Error to getting inscription");
    }
  };

  useEffect(() => {
    get();
  }, [])
  return (
    <>
      <h1 className="container mx-5 p-5">Mi Declamación</h1>
      <div className="">
        <div className="card m-auto" style={{ width: "80vw" }}>
          <div className="card-body">
            <h5 className="card-title">Nombre: {inscription.name}</h5>
            <h5 className="card-title">Edad: {inscription.age}</h5>
            <h5 className="card-text">Carnet: {inscription.carnet}</h5>
            <h5 className="card-text">Dirección: {inscription.address}</h5>
            <h5 className="card-text">Género: {inscription.gender}</h5>
            <h5 className="card-text">Teléfono: {inscription.phone}</h5>
            <h5 className="card-text">Fecha De Nacimiento: {birthdate}</h5>
            <h5 className="card-text">Carrerar Del Estudiante: {inscription.studentCareer}</h5>
            <h5 className="card-text">Género De Poesía: {inscription.poeticGenre}</h5>
            <h5 className="card-text">Fecha De Inscriptión: {registrationDate}</h5>
          </div>
          <ul className="list-group list-group-flush"></ul>
          <div className="card-body">
            <h5 className="card-title">Fecha De Declamación: {date}</h5>
          </div>
        </div>
      </div>
    </>
  );
};
