// Bienvenida.js
import React from 'react';
import './Bienvenida.css'; // Estilos para la pantalla de bienvenida

const Bienvenida = ({ onEmpezar }) => {
  return (
    <div className="bienvenida-container">
      <h1 className="bienvenida-title">¡Hola mi amor, bienvenida a tu Jardin Virtual!</h1>
      <p className="bienvenida-text">
        Silvia Renee, quiero decirte que eres la niña que toda la vida quiero amar, cuidar y mimar. Quiero obsequiarte este jardin virtual para que puedas sembrar tus flores favoritas, una que quiza es la mia jejeje 
      
      </p>
      <p className="bienvenida-text">
        Cosas que debes saber:
      </p>
      <li className="bienvenida-text2">
        Riega tus flores segun el agua que tengas.
      </li>
      <li className="bienvenida-text2">
        Ten cuidado con los topos, arruinan tus flores :c.
      </li>
      <button className="empezar-btn" onClick={onEmpezar}>
        Empezar a sembrar
      </button>
    </div>
  );
};

export default Bienvenida;
