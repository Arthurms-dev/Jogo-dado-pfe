"use client";

import { useState } from 'react';
import Dado from './components/Dado';

export default function Home() {
  const [rodada, setRodada] = useState(1);
  const [placar, setPlacar] = useState({ j1: 0, j2: 0 });
  const [turno, setTurno] = useState('J1');
  const [dadoJ1, setDadoJ1] = useState([0, 0]);
  const [dadoJ2, setDadoJ2] = useState([0, 0]);
  const [resultadoRodada, setResultadoRodada] = useState("");

  const jogadorUm = () => {
    const d1 = Math.floor(Math.random() * 6) + 1;
    const d2 = Math.floor(Math.random() * 6) + 1;
    setDadoJ1([d1, d2]);
    setDadoJ2([0, 0]); // Limpa dados do J2 para a nova rodada
    setResultadoRodada("Vez do Jogador 2");
    setTurno('J2');
  };

  const jogadorDois = () => {
    const d1 = Math.floor(Math.random() * 6) + 1;
    const d2 = Math.floor(Math.random() * 6) + 1;
    setDadoJ2([d1, d2]);

    const somaJ1 = dadoJ1[0] + dadoJ1[1]; // Agora soma corretamente os dados do J1
    const somaJ2 = d1 + d2;

    let novoPlacar = { ...placar };
    if (somaJ1 > somaJ2) {
      novoPlacar.j1++;
      setResultadoRodada("Jogador 1 venceu a rodada!");
    } else if (somaJ2 > somaJ1) {
      novoPlacar.j2++;
      setResultadoRodada("Jogador 2 venceu a rodada!");
    } else {
      setResultadoRodada("A rodada empatou!");
    }
    
    setPlacar(novoPlacar);

    if (rodada === 5) {
      setTurno('FIM');
    } else {
      setTurno('ESPERA'); // Bloqueia botões durante a transição
      setTimeout(() => {
        setRodada(prev => prev + 1);
        setTurno('J1');
      }, 1500);
    }
  };

  const reiniciarJogo = () => {
    setRodada(1);
    setTurno('J1');
    setPlacar({ j1: 0, j2: 0 });
    setDadoJ1([0, 0]);
    setDadoJ2([0, 0]);
    setResultadoRodada("");
  };

  const getVencedorGeral = () => {
    if (placar.j1 > placar.j2) return "Vencedor: Jogador 1!!";
    if (placar.j2 > placar.j1) return "Vencedor : Jogador 2!!";
    return "Empate!!";
  };

  return (
    <div style={{ textAlign: 'center', fontFamily: 'sans-serif', padding: '20px' }}>
      <h1>Batalha de Dados</h1>
      <p>Rodada: {rodada} de 5</p>
      
      <div style={{ display: 'flex', justifyContent: 'center', gap: '50px', marginBottom: '20px' }}>

        <div style={{ border: '1px solid black', padding: '10px' }}>
          <h3>Jogador 1</h3>
          <p>Placar: {placar.j1}</p>
          <Dado valor={dadoJ1[0]} />
          <Dado valor={dadoJ1[1]} />
          <br />

          <div style={{ fontWeight: 'bold', color: '#2563eb', fontSize: '1.2rem' }}>
            {dadoJ1[0] + dadoJ1[1] > 0 ? `Soma: ${dadoJ1[0] + dadoJ1[1]}` : "---"}
           </div>
          <button class="bg-transparent hover:bg-blue-300 text-blue-700 font-semibold hover:text-white py-1 px-2  border border-blue-500 hover:border-transparent rounded" style={{ marginTop: '20px', cursor: 'pointer' }} disabled={turno !== 'J1'} onClick={jogadorUm}>Jogar J1</button>
        </div>

        <div style={{ border: '1px solid black', padding: '10px' }}>
          <h3>Jogador 2</h3>
          <p>Placar: {placar.j2}</p>
          <Dado valor={dadoJ2[0]} />
          <Dado valor={dadoJ2[1]} />
          <br />

          <div style={{ fontWeight: 'bold', color: 'red', fontSize: '1.2rem' }}>
            {dadoJ1[0] + dadoJ1[1] > 0 ? `Soma: ${dadoJ1[0] + dadoJ1[1]}` : "---"}
          </div>
          <button class="bg-transparent hover:bg-red-300 text-red-700 font-semibold hover:text-white py-1 px-2  border border-red-500 hover:border-transparent rounded" style={{ marginTop: '20px', cursor: 'pointer' }} disabled={turno !== 'J2'} onClick={jogadorDois}>Jogar J2</button>
        </div>
      </div>

      <div style={{ marginTop: '20px', fontWeight: 'bold' }}>
        {turno === 'FIM' ? (
          <div>
            <h2>{getVencedorGeral()}</h2>
            <button class="bg-transparent hover:bg-black-500 text-black-700 font-semibold hover:text-white py-1 px-2  border border-black-500 hover:border-transparent rounded" style={{ marginTop: '20px', cursor: 'pointer' }} onClick={reiniciarJogo}>JOGAR NOVAMENTE</button>
          </div>
        ) : (
          <p>{resultadoRodada || "Clique em J1 para começar!"}</p>
        )}
      </div>
    </div>
  );
}