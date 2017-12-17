import React from 'react'

import './Idea.css'

const colors = {
  completed: '#53fa00',
}

export default props => {
  const votes = new Intl.NumberFormat().format(props.votes)

  return (
    <div className={`idea idea-status-${props.status}`}>
      <button
        type="button"
        className="master-button"
        title="Use as master"
        onClick={props.onAssignMaster.bind(null, props.id)}
      >
        *
      </button>
      <button
        type="button"
        className="add-button"
        title="Add to inferiors"
        onClick={props.onAddToInferior.bind(null, props.id)}
      >
        +
      </button>
      {props.status != null && props.status !== 'none' ? (
        <div
          className="status"
          style={{ background: colors[props.status] || 'gray' }}
        >
          {props.status}
        </div>
      ) : null}
      <h1>
        <a href={props.url} target="_blank" rel="noopener">
          {props.title}
        </a>
      </h1>
      <strong className="vote-count">
        {votes} vote{props.votes !== 1 ? 's' : ''}
      </strong>
      <p>{props.description}</p>
    </div>
  )
}
