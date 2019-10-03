import React, { Component } from 'react';
import Links from '../api/links';
import { autorun, makeTracker } from 'meteor/cereal:reactive-render';
import { Tracker } from 'meteor/tracker';

const useTracker = makeTracker(() => {
  return {
    links: Links.find().fetch()
  }
});

makeLink = (link) => {
  return (
    <li key={link._id}>
      <a href={link.url} target="_blank">{link.title}</a>
    </li>
  );
}

export default () => {
  const { links = [] } = useTracker();
  const linkComponents = links.map(
    link => this.makeLink(link)
  );
  return(
    <div>
      <h2>Learn Meteor!</h2>
      <ul>{linkComponents}</ul>
    </div>
  )
};