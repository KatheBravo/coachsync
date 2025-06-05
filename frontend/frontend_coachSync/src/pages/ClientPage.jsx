// src/pages/ClientePage.jsx
import { useCoach } from '../components/CoachInfo';
import ClientCard from '../components/ClientCard';

function ClientePage() {
  const { clients } = useCoach();

  return (
    <div className="clientes-page">
      <h2>Lista de Clientes</h2>
      {clients.length === 0 ? (
        <p>No hay clientes registrados.</p>
      ) : (
        <div className="clientes-list">
          {clients.map((cliente) => (
            <ClientCard key={cliente._id} cliente={cliente} />
          ))}
        </div>
      )}
    </div>
  );
}

export default ClientePage;

