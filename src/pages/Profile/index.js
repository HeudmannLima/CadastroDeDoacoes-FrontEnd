import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';
import logoImg from '../../assets/logo.svg';

export default function Profile() {
  const [incidents, setIncidents] = useState([]);
  
  const ongId = localStorage.getItem('ongId');
  const ongName = localStorage.getItem('ongName');
  const history = useHistory();

  useEffect(() => {
    (async () => {
      const response = await api.get('profile', {
        headers: { Authorization: ongId }
      });
      setIncidents(response.data);
    })();
  }, [ongId]);

  /* // outra forma de fazer o async/await, usando promisses com .then()
  useEffect(() => {
    api.get('profile', {
      headers: { Authorization: ongId }
    }).then(response => {
      setIncidents(response.data);
    })
  }, [ongId]);
  */

 async function handleDeleteIncident(id, title) {
  try {
    await api.delete(`incidents/${id}`, {
      headers: { Authorization: ongId }
    });
    setIncidents(incidents.filter(incident => incident.id !== id));
    alert(`Caso "${title}" removido com sucesso.`);

    } catch (error) {
      alert('Erro ao deletar caso, tente novamente.');
    }
  }

  function handleLogOut() {
    alert(`Usuário "${ongName}" deslogado da plataforma.`);
    localStorage.clear('ongId');
    localStorage.clear('ongName');
    history.push('/');
  }

  return (
    <div className="profile-container">
      <header>
        <img src={logoImg} alt="Be The Hero"/>
        <span>Bem vinda, {ongName}</span>

        <Link className="button" to="/incidents/new">Cadastrar novo Caso</Link>
        <button onClick={handleLogOut}>
          <FiPower size={18} color="#e02041"/>
        </button>
      </header>

      <h1>Casos cadastrados: {incidents.length} </h1>

      <ul>
        {/* em arrow func, se usar parenteses incident => (...), é a mesma 
        coisa q utilizar incident => { return(...) }, ou seja, o parenteses
        abstrai o uso do { return(...) utilizado pro JSX */}
        {incidents.map(incident => (
          <li key={incident.id}>
            <strong>CASO:</strong>
            <p>{incident.title}</p>

            <strong>DESCRIÇÃO:</strong>
            <p>{incident.description}</p>

            <strong>Valor:</strong>
            <p>
              {Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              }).format(incident.value)}
            </p>

            <button
              onClick={() => {handleDeleteIncident(incident.id, incident.title)}}
              type="button"
            >
              <FiTrash2 size={20} color="a8a8b3" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}