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

        <h4>Locations</h4>
        <div className="card-group pt-md-3">
          <div className="row">
            {location_locations[0] ? (
              location_locations.map(location =>
                <div className="col-sm-5" key={location}>
                  <div className="card">
                    <img className="card-img-top" src="https://placehold.it/500x280" alt="Card image top"/>
                    <div className="card-body">
                      <h5 className="card-title">{location.name}</h5>
                      {/*<p className="card-text">{location.desc}</p>*/}
                      <a href={location.url} className="btn btn-primary stretched-link">Details</a>
                    </div>
                  </div>
                </div>
              )
            ) : (
              <a href="/location/create"><button type="button" className="btn btn-success btn-lg">Add location</button></a>
            )}
          </div>
        </div>

        <h4>Things</h4>
        <div className="card-group pt-md-3">
          <div className="row">
            {location_things ? (
              location_things.map(thing =>
                <div className="col-sm-5" key={thing}>
                  <div className="card">
                    <img className="card-img-top" src="https://placehold.it/500x280" alt="Card image top"/>
                    <div className="card-body">
                      <h5 className="card-title">{thing.name}</h5>
                      {/*<p className="card-text">{thing.notes}</p>*/}
                      <a href={thing.url} className="btn btn-primary">Details</a>
                    </div>
                  </div>
                </div>
              )
            ) : (
              <a href="/thing/create"><button type="button" className="btn btn-success btn-lg">Add thing</button></a>
            )}
          </div>
        </div>

        <img src={this.props.qrdata}/>
      </DefaultLayout>
    )
  }
}

module.exports = LocationDetail;
