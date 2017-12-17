import React, { Component } from 'react'

import './App.css'
import Idea from './Idea'
import Search from './Search'
import StateDisplay from './StateDisplay'

export default class App extends Component {
  state = {
    error: false,
    ideas: null,
    master: null,
    inferior: [],
  }

  handleQuery = event => {
    if (event.target.value === '') {
      this.setState({
        ideas: null,
        error: false,
      })
      return
    }

    const query = encodeURIComponent(event.target.value)
    fetch(`/uv-portal/search?q=${query}`)
      .then(resp => resp.json())
      .then(ideas => this.setState({ ideas, error: false }))
      .catch(err => this.setState({ ideas: null, error: err.toString() }))
  }

  handleMaster = id => {
    // set new master id, remove any inferior that shares the id with new master
    this.setState(prevState => ({
      master: id,
      inferior: prevState.inferior.filter(inf => inf !== id),
    }))
  }
  handleAdd = id => {
    // do not add master or duplicate inferiors
    if (this.state.inferior.includes(id) || this.state.master === id) return
    this.setState(prevState => ({
      inferior: [id, ...prevState.inferior],
    }))
  }
  handleInferiorRemove = id => {
    this.setState(prevState => ({
      inferior: prevState.inferior.filter(inf => inf !== id),
    }))
  }

  render() {
    let view
    if (this.state.error) {
      view = <div className="error">{this.state.error}</div>
    } else if (this.state.ideas && !this.state.ideas.length) {
      view = <div className="error">No ideas found.</div>
    } else if (this.state.ideas) {
      view = this.state.ideas.map(idea => (
        <Idea
          onAssignMaster={this.handleMaster}
          onAddToInferior={this.handleAdd}
          key={idea.id}
          {...idea}
        />
      ))
    }

    return (
      <div>
        <Search onChange={this.handleQuery} />
        <main>
          <div className="ideas">{view}</div>
          {this.state.master || this.state.inferior.length ? (
            <StateDisplay
              master={this.state.master}
              inferior={this.state.inferior}
              onRemove={this.handleInferiorRemove}
            />
          ) : null}
        </main>
      </div>
    )
  }
}
