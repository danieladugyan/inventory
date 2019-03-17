const React = require('react');
const DefaultLayout = require('./layouts/default');

class ThingList extends React.Component {
  render() {
    let title = this.props.title;
    let thing_list = this.props.thing_list;
    return (
      <DefaultLayout>
        <h1>{title}</h1>
        <h3><a href="/thing/create">Add thing</a></h3>
        <ul>
          {thing_list ? (thing_list.map((thing) =>
            <li key={thing}><a href={thing.url}>{thing.name}</a></li>
          )) : (
            <li>There are no things.</li>
          )}
        </ul>
      </DefaultLayout>
    )
  }
}

module.exports = ThingList;
