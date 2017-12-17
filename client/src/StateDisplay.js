import React from 'react'

import './StateDisplay.css'

export default ({ master, inferior }) => {
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
          {inferior.map((id, idx) => (
            <li key={idx} className="inferior">
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
