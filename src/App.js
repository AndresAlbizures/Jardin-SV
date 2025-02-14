// App.js
import React, { useState } from 'react';
import Bienvenida from './Componentes/Bienvenida.js'; // Importar el componente de bienvenida
import Jardin from './Componentes/Jardin.js'; // Este será el siguiente componente

function App() {
  const [iniciando, setIniciando] = useState(true);

  // Función para cambiar a la pantalla del jardín
  const empezar = () => {
    setIniciando(false);
  };

  return (
    <div className="App">
      {iniciando ? (
        <Bienvenida onEmpezar={empezar} />
      ) : (
        <Jardin />
      )}
    </div>
  );
}

export default App;
