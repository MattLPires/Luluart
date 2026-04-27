import './FormacaoCard.css'

function FormacaoCard({ titulo, instituicao, anos }) {
  return (
    <div className="formacao-card">
      <h4>{titulo}</h4>
      <p className="inst">{instituicao}</p>
      {Array.isArray(anos) ? (
        anos.map((ano, i) => (
          <span className="year" key={i}>{ano}</span>
        ))
      ) : (
        <span className="year">{anos}</span>
      )}
    </div>
  )
}

export default FormacaoCard
