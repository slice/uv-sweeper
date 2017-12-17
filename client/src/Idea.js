import React from 'react'

import './Idea.css'

export default props => (
  <div className="idea">
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
    <h1>
      <a href={props.url} target="_blank" rel="noopener">
        {props.title}
      </a>
    </h1>
    <p>{props.description}</p>
  </div>
)
