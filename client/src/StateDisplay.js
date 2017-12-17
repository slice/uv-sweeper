import React from 'react'

import './StateDisplay.css'

export default ({ master, inferior, onRemove }) => {
  const following = inferior
    .slice(1)
    .map(id => `!dupe ${id} -`)
    .join('\n')
  const commands =
    master && inferior.length
      ? `!dupe ${inferior[0]} ${master}\n${following}`
      : ''

  return (
    <div className="state-display">
      <div className="state-display-inner">
        <small>
          <strong>Merging into:</strong>
        </small>
        <div className="master">{master}</div>
        <ul>
          {inferior.map(id => (
            <li key={id} onClick={onRemove.bind(null, id)} className="inferior">
              ⬑ {id}
            </li>
          ))}
        </ul>
        <pre>
          <code>{commands}</code>
        </pre>
      </div>
    </div>
  )
}
