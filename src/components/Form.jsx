import React, { useState } from "react";
import styles from "./Form.module.css";
import logoGreydive from "../img/logo-greydive.png";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import firebaseApp from "../firebase.js";
import { getFirestore, collection, addDoc } from "firebase/firestore";

const db = getFirestore(firebaseApp);

function Form(props) {
  const id = props.id;
  const [formData, setFormData] = useState({
    nombreCompleto: "",
    correoElectronico: "",
    fechaNacimiento: "",
    paisOrigen: "",
    terminosCondiciones: false,
    order: 0,
  });

  const {
    nombreCompleto,
    correoElectronico,
    fechaNacimiento,
    paisOrigen,
    terminosCondiciones,
    order,
  } = formData;

  const navigate = useNavigate();

  const handleSubmitClick = async (e) => {
    e.preventDefault();

    if (!terminosCondiciones) {
      swal("¡Debe aceptar los términos y condiciones!", "", "warning");
      return;
    }

    if (
      !nombreCompleto ||
      !correoElectronico ||
      !fechaNacimiento ||
      !paisOrigen ||
      !terminosCondiciones
    ) {
      swal("¡Por favor complete todos los campos!", "", "warning");
      return;
    }

    if (!correoElectronico.includes("@")) {
      swal("¡Por favor ingrese un correo electrónico válido!", "", "warning");
      return;
    }

    if (!terminosCondiciones) {
      swal("¡Debe aceptar los términos y condiciones!", "", "warning");
      return;
    }

    swal({
      title: "¡Gracias!",
      text: "Los datos han sido registrados, ¿Quiere ver sus datos?",
      icon: "success",
      buttons: ["No", "Sí"],
    }).then((respuesta) => {
      if (respuesta) {
        navigate(`/${id}`);
      }
    });

    await addDoc(collection(db, "usuarios"), {
      nombreCompleto,
      correoElectronico,
      fechaNacimiento,
      paisOrigen,
      terminosCondiciones,
      id: id,
      order,
    });

    document.getElementById("userForm").reset();
  };

  const handleInputChange = (event) => {
    const {
      target: { type, checked, value, name },
    } = event;
    const newValue = type === "checkbox" ? checked : value;

    setFormData({
      ...formData,
      [name]: newValue,
      order: order + 1,
    });
  };

  return (
    <div>
      <header className={styles.header}>
        <img src={logoGreydive} alt="Logo Greydive" className={styles.image} />
        <div className={styles.circle1}></div>
        <div className={styles.circle2}></div>
        <div className={styles.circle3}></div>
        <div className={styles.circle4}></div>
        <div className={styles.circle5}></div>
      </header>
      <form className={styles.form} id="userForm">
        <div className={styles.formGroup}>
          <div className={styles.formControl}>
            <label htmlFor="nombreCompleto" className={styles.formLabel}>
              Nombre Completo:
            </label>
            <input
              type="text"
              id="nombreCompleto"
              name="nombreCompleto"
              value={formData.nombreCompleto}
              onChange={handleInputChange}
              className={styles.formInput}
            />
          </div>
        </div>
        <div className={styles.formGroup}>
          <div className={styles.formControl}>
            <label htmlFor="correoElectronico" className={styles.formLabel}>
              Correo Electrónico:
            </label>
            <input
              type="email"
              id="correoElectronico"
              name="correoElectronico"
              value={formData.correoElectronico}
              onChange={handleInputChange}
              className={styles.formInput}
            />
          </div>
        </div>
        <div className={styles.formGroup}>
          <div className={styles.formControl}>
            <label htmlFor="fechaNacimiento" className={styles.formLabel}>
              Fecha de Nacimiento:
            </label>
            <input
              type="date"
              id="fechaNacimiento"
              name="fechaNacimiento"
              value={formData.fechaNacimiento}
              onChange={handleInputChange}
              className={styles.formInput}
            />
          </div>
        </div>
        <div className={styles.formGroup}>
          <div className={styles.formControl}>
            <label htmlFor="paisOrigen" className={styles.formLabel}>
              País de Origen:
            </label>
            <select
              id="paisOrigen"
              name="paisOrigen"
              value={formData.paisOrigen}
              onChange={handleInputChange}
              className={styles.formInput}
            >
              <option value="">Seleccione un país</option>
              <option value="Argentina">Argentina</option>
              <option value="Brasil">Brasil</option>
              <option value="Chile">Chile</option>
              <option value="Colombia">Colombia</option>
              <option value="México">México</option>
            </select>
          </div>
        </div>
        <div className={styles.formGroup}>
          <div className={styles.formControlCheckbox}>
            <input
              type="checkbox"
              id="terminosCondiciones"
              name="terminosCondiciones"
              checked={formData.terminosCondiciones}
              onChange={handleInputChange}
              className={styles.formCheckbox}
            />
            <label
              htmlFor="terminosCondiciones"
              className={styles.formControlLabel}
            >
              Acepto los términos y condiciones
            </label>
          </div>
        </div>
        <div className={styles.formGroup}>
          <button
            type="submit"
            className={styles.formControlSubmit}
            onClick={handleSubmitClick}
          >
            Enviar
          </button>
        </div>
      </form>
    </div>
  );
}

export default Form;
