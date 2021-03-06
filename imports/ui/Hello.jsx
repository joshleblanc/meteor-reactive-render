import React, { Component } from 'react';
import { autorun } from 'meteor/cereal:reactive-render';

const Count = new ReactiveVar(0);

@autorun
export default class Hello extends Component {
  increment() {
    Count.set(Count.get() + 1);
  }

  render() {
    return (
      <div>
        <button onClick={this.increment}>Click Me</button>
        <p>You've pressed the button {Count.get()} times.</p>
      </div>
    );
  }
}
