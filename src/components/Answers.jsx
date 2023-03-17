import React, { useState, useEffect } from "react";
import styles from "./Answers.module.css";
import firebaseApp from "../firebase.js";
import logoGreydive from "../img/logo-greydive.png";
import { getFirestore, getDocs, collection, where, query, orderBy, limit } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';


const Answers = (props) => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault()
    navigate("/")
  }

  useEffect(() => {
    const fetchData = async () => {
      /* const db = getFirestore(firebaseApp);
      const collectionRef = collection(db, "usuarios");
      const query = (collectionRef) => where("id", "==", props.id)(collectionRef);
      const docs = await getDocs(query(collectionRef)); */
      
      const db = getFirestore(firebaseApp);
      const dataRef = collection(db, "usuarios");
      const myQuery = query(dataRef, where("id", "==", props.id), orderBy("order", "desc"), limit(1));

const docs = await getDocs(myQuery);
docs.forEach((doc) => {
  console.log(doc.data());
});

      if (docs.size > 0) {
        const fetchedData = [];
        docs.forEach((doc) => {
          fetchedData.push(doc.data());
        });
        setData(fetchedData);
      } else {
        console.log("No hay datos para enviar");
      }
    };
    fetchData();
  }, [props.id]);
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
      <div className={styles.container}>
        <h1 className={styles.title}>Tus Respuestas:</h1>
        <div className={styles.list}>
          {data.map((userData) => (
            <div>
              <p className={styles.listData}>
                <span>Nombre: </span> {userData.nombreCompleto}
              </p>
              <p className={styles.listData}>
                <span>Email: </span> {userData.correoElectronico}
              </p>
              <p className={styles.listData}>
                <span>País de Origen: </span> {userData.paisOrigen}
              </p>
              <p className={styles.listData}>
                <span>Fecha de Nacimiento: </span> {userData.fechaNacimiento}
              </p>
            </div>
          ))}
        </div>
        <button className={styles.button} onClick={handleClick}>
          Volver
        </button>
      </div>
    </div>
  );
};

export default Answers;
