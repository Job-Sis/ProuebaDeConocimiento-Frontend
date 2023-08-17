import React from "react";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

export const Reporte = () => {
  const [inscriptions, setInscriptions] = useState([{}]);

  const formatDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString(undefined, options);
  }

  const get = async () => {
    try {
      const { data } = await axios.get("http://localhost:3000/inscription/get");
      if (data.inscriptions) {
        let formattedDate = data.inscriptions.map((inscription) => ({
            ...inscription,
            date: formatDate(inscription.date)
        }))
        setInscriptions(formattedDate)
      }
    } catch (err) {
      console.log(err);
      throw new Error("Error to getting inscriptions");
    }
  };

  useEffect(() => {
    get();
  }, []);

  return (
    <>
      <div className="container m-auto my-5 my-2">
        <h1> Reportes </h1>
      </div>

      <table className="table m-auto py-5" style={{width: "80vw"}}>
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nombre</th>
            <th scope="col">Edad</th>
            <th scope="col">Carrera</th>
            <th scope="col">Género De Poesía</th>
            <th scope="col">Fecha De Declamación</th>
          </tr>
        </thead>
        <tbody>
          {inscriptions.map(({ name, age, studentCareer, poeticGenre, date,  }, i) => (
            <>
              <tr>
                <th scope="row">{i}</th>
                <td>{name}</td>
                <td>{age}</td>
                <td>{studentCareer}</td>
                <td>{poeticGenre}</td>
                <td>{date}</td>
              </tr>
            </>
          ))}
        </tbody>
      </table>
    </>
  );
};
