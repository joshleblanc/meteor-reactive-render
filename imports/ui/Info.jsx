import React, { Component } from 'react';
import Links from '../api/links';
import { Tracker } from 'meteor/tracker';

function makeComponentReactive(render) {
  console.log("This is called right before baseRender = render.bind(this);", this);
  const baseRender = render.bind(this);
  this.render = reactiveRender;
  function reactiveRender() {
    let rendering = undefined;
    Tracker.autorun(() => {
      console.log("Calling render", this);
      rendering = baseRender();
    });
    return rendering;
  }
  return reactiveRender.call(this);
}

function track(componentClass) {
  const target = componentClass.prototype;
  const baseRender = target.render.bind(this);
  target.render = function() {
    return makeComponentReactive.call(this, baseRender);
  }
  return componentClass;
}

@track
export default class Info extends Component {
  render() {
    console.log("In render", this);
    const links = Links.find().fetch();
    console.log(links);

    const linkComponents = links.map(
      link => this.makeLink(link)
    );

    return (
      <div>
        <h2>Learn Meteor!</h2>
        <ul>{ linkComponents }</ul>
      </div>
    );
  }

  makeLink(link) {
    return (
      <li key={link._id}>
        <a href={link.url} target="_blank">{link.title}</a>
      </li>
    );
  }
}