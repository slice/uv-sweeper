import React, { Component } from 'react'
import PropTypes from 'prop-types'

import debounce from 'lodash.debounce'
import './Search.css'

export default class Search extends Component {
  static propTypes = {
    onChange: PropTypes.func,
    delay: PropTypes.number,
  }

  handleChange = debounce(event => {
    if (this.props.onChange) this.props.onChange(event)
  }, this.props.delay || 150)

  render() {
    return (
      <input
        type="text"
        placeholder="Search for ideas..."
        className="search"
        {...this.props}
        onChange={event => {
          event.persist() // don't let react reuse this event
          this.handleChange(event)
        }}
      />
    )
  }
}
