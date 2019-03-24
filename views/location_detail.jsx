const React = require('react');
const DefaultLayout = require('./layouts/default');

class LocationDetail extends React.Component {
  render() {
    let location = this.props.location;
    let location_locations = this.props.location_locations;
    let location_things = this.props.location_things;

    return (
      <DefaultLayout js={this.props.js}>
        <h1>{location.name} | {location.type}</h1>
        <p>Description: {location.desc}</p>
        <a href={location._id + '/update/'}><button type="button" className="btn btn-success btn-lg">Edit</button></a>

        <div>
          <h4>Locations</h4>
          {location_locations[0] ? (
            location_locations.map(location =>
              <div key={location}>
                <dt><a href={location.url}>{location.name}</a></dt>
                <dd>{location.desc}</dd>
              </div>
            )
          ) : (
            <p>This location doesn't contain any locations.</p>
          )}
        </div>

        <div>
          <h4>Things</h4>
          {location_things[0] ? (
            location_things.map(thing =>
              <div key={thing}>
                <dt><a href={thing.url}>{thing.name}</a></dt>
                <dd>{thing.notes}</dd>
              </div>
            )
          ) : (
            <p>This location doesn't contain any things.</p>
          )}
        </div>

        <img src={this.props.qrdata}/>
      </DefaultLayout>
    )
  }
}

module.exports = LocationDetail;
