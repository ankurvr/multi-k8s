import React, { Component } from 'react';
import axios from 'axios';

class Fib extends Component {
  state = {
    seenIndexes: [],
    values: {},
    index: ''
  };

  componentDidMount() {
    this.fetchValues();
    this.fetchIndexes();
  }

  async fetchValues() {
    const values = await axios.get('/api/values/current');
    this.setState({ values: values.data });
  }

  async fetchIndexes() {
    const seenIndexes = await axios.get('/api/values/all');
    this.setState({
      seenIndexes: seenIndexes.data
    });
  }

  handleSubmit = async event => {
    event.preventDefault();

    await axios.post('/api/values', {
      index: this.state.index
    });
    this.setState({ index: '' });
  };

  renderSeenIndexes() {
    try {
      return this.state.seenIndexes.map(({ number }) => number).join(', ');
    } catch(e) {
      console.log("Error in renderSeenIndexes");
      console.log(e);
      return "F**k. It's not working.";
    }
  }

  renderValues() {
    const entries = [];

    try {
      for (let key in this.state.values) {
        entries.push(
          <div key={key}>
            For index {key} calculated value is {this.state.values[key]}.
          </div>
        );
      }
    } catch(e) {
      console.log("Error in renderValues");
      console.log(e);
    }
    
    return entries;
  }

  render() {
    return (
      <div>
        <br />
        <form onSubmit={this.handleSubmit}>
          <label>Enter your index:</label>
          <input
            value={this.state.index}
            onChange={event => this.setState({ index: event.target.value })}
          />
          <button>Submit</button>
        </form>

        <h3>Indexes I have seen:</h3>
        {this.renderSeenIndexes()}

        <h3>Calculated Values:</h3>
        {this.renderValues()}
      </div>
    );
  }
}

export default Fib;
