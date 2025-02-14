import React, { useState, useEffect } from 'react';
import './Jardin.css';

const imagenesFlor = {
  Tulipan: { 
    semilla: `${process.env.PUBLIC_URL}/seed.png`, 
    tallo: `${process.env.PUBLIC_URL}/sprout.png`, 
    boton: `${process.env.PUBLIC_URL}/spr.png`, 
    flor: `${process.env.PUBLIC_URL}/Tulip100.svg`
  },
  Herbera: { 
    semilla: `${process.env.PUBLIC_URL}/seed.png`, 
    tallo: `${process.env.PUBLIC_URL}/sph.png`, 
    boton: `${process.env.PUBLIC_URL}/talh.png`, 
    flor: `${process.env.PUBLIC_URL}/herb100.svg`
  },
  Chatia: { 
    semilla: `${process.env.PUBLIC_URL}/seed.png`, 
    tallo: `${process.env.PUBLIC_URL}/chatsp.png`, 
    boton: `${process.env.PUBLIC_URL}/chattall.png`, 
    flor: `${process.env.PUBLIC_URL}/chat100.svg`
  },
};

const topoImg = `${process.env.PUBLIC_URL}/topo.png`; // Imagen del topo

const Jardin = () => {
  const [flores, setFlores] = useState([]);
  const [florSeleccionada, setFlorSeleccionada] = useState('Tulipan');
  const [agua, setAgua] = useState(100);
  const [llenando, setLlenando] = useState(false);
  const [tiempoRestante, setTiempoRestante] = useState(0);
  const [musica, setMusica] = useState(null);
  const [muted, setMuted] = useState(false);
  const [topos, setTopos] = useState([]); // Estado para los topos

  useEffect(() => {
    const canciones = [
      `${process.env.PUBLIC_URL}/aud-3.mp3`,
      `${process.env.PUBLIC_URL}/aud-2.mp3`,
      `${process.env.PUBLIC_URL}/aud-1.mp3`
    ];
    const audio = new Audio(canciones[Math.floor(Math.random() * canciones.length)]);
    audio.loop = true;
    audio.play().catch(err => console.warn("Error al reproducir la música:", err));
    setMusica(audio);
    return () => { audio.pause(); audio.src = ""; };
  }, []);

  const toggleMute = () => {
    if (musica) {
      musica.muted = !musica.muted;
      setMuted(!muted);
    }
  };

  useEffect(() => {
    if (llenando && agua < 100) {
      const tiempoRecargaTotal = 30;
      const tiempoRecargaFaltante = (100 - agua) * (tiempoRecargaTotal / 100);
      setTiempoRestante(Math.ceil(tiempoRecargaFaltante));

      const intervaloCronometro = setInterval(() => {
        setTiempoRestante(prev => (prev > 0 ? prev - 1 : 0));
      }, 1000);

      const intervaloAgua = setInterval(() => {
        setAgua(prev => {
          const nuevoAgua = Math.min(prev + (100 - agua) / tiempoRecargaFaltante, 100);
          if (nuevoAgua >= 100) {
            setLlenando(false);
            clearInterval(intervaloCronometro);
            clearInterval(intervaloAgua);
          }
          return nuevoAgua;
        });
      }, 1000);

      return () => { clearInterval(intervaloCronometro); clearInterval(intervaloAgua); };
    }
  }, [llenando]);

  useEffect(() => {
    const intervaloTopo = setInterval(() => {
      if (flores.length > 0) {
        const florAfectada = flores[Math.floor(Math.random() * flores.length)];
        setFlores(flores.map(flor => 
          flor.id === florAfectada.id 
            ? { ...flor, crecimiento: Math.max(flor.crecimiento - 15, 0) } 
            : flor
        ));
        setTopos([...topos, { id: florAfectada.id, terreno: florAfectada.terreno }]);

        setTimeout(() => {
          setTopos(topos.filter(topo => topo.id !== florAfectada.id));
        }, 5000);
      }
    }, 15000); 

    return () => clearInterval(intervaloTopo);
  }, [flores, topos]);

  const agregarFlor = (index) => {
    if (!florSeleccionada || flores.some(flor => flor.terreno === index)) return;
    setFlores([...flores, { id: flores.length + 1, tipo: florSeleccionada, terreno: index, crecimiento: 0 }]);
  };

  const regarFlor = (id) => {
    if (agua >= 33.33) {
      setFlores(flores.map(flor =>
        flor.id === id ? { ...flor, crecimiento: Math.min(flor.crecimiento + 10, 100) } : flor
      ));
      setAgua(prevAgua => {
        const nuevoAgua = prevAgua - 33.33;
        if (nuevoAgua < 100 && !llenando) setLlenando(true);
        return nuevoAgua;
      });
    } else {
      alert("No hay suficiente agua para regar.");
    }
  };

  const obtenerImagenFlor = (tipo, crecimiento) => {
    if (crecimiento <= 30) return imagenesFlor[tipo].semilla;
    if (crecimiento <= 60) return imagenesFlor[tipo].tallo;
    if (crecimiento <= 90) return imagenesFlor[tipo].boton;
    return imagenesFlor[tipo].flor;
  };

  const limpiarTerreno = (index) => {
    setFlores(flores.filter(flor => flor.terreno !== index));
  };

  return (
    <div className="jardin">
      <button className="mute-button" onClick={toggleMute}>{muted ? "🔇" : "🔊"}</button>
      <h3>¡Bienvenida a tu Jardín!</h3>
      <div className="regadera-container">
        <img src={`${process.env.PUBLIC_URL}/regadera.png`} alt="Regadera" className="regadera" style={{ width: "250px" }} />
        <div className="barra-agua">
          <div className="nivel-agua" style={{ width: `${agua}%` }}></div>
        </div>
      </div>

      <div className="selector">
        <label htmlFor="tipoFlor">Escoge una flor:</label>
        <select id="tipoFlor" value={florSeleccionada} onChange={(e) => setFlorSeleccionada(e.target.value)}>
          <option value="Tulipan">🌷 Tulipán</option>
          <option value="Herbera">🌼 Herbera</option>
          <option value="Chatia">🌻 Chatia</option>
        </select>
      </div>

      <div className="jardin-container">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="terreno" onClick={() => agregarFlor(index)}>
            {flores.filter(flor => flor.terreno === index).map(flor => (
              <div key={flor.id} className="flor-container">
                <img src={obtenerImagenFlor(flor.tipo, flor.crecimiento)} alt={flor.tipo} className="flor" />
                <button className="boton-regar" onClick={() => regarFlor(flor.id)}>💧 Regar</button>
                <button className="boton-limpiar" onClick={(e) => { e.stopPropagation(); limpiarTerreno(index); }}>Limpiar</button>
                {topos.some(topo => topo.terreno === index) && <img src={topoImg} alt="Topo" className="topo" style={{ width: "200px", height: "150px" }} />}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Jardin;
