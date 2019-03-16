const React = require('react');
const DefaultLayout = require('./layouts/default');

class LocationList extends React.Component {
  render() {
    let title = this.props.title;
    let location_list = this.props.location_list;
    return (
      <DefaultLayout>
        <h1>{title}</h1>
        <ul>
          {location_list ? (location_list.map((location) =>
            <li key={location}><a href={location.url}>{location.name}</a></li>
          )) : (
            <li>There are no locations.</li>
          )}
        </ul>
      </DefaultLayout>
    )
  }
}

module.exports = LocationList;
