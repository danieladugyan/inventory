const React = require('react');
const DefaultLayout = require('./layouts/default');

class LocationList extends React.Component {
  render() {
    let title = this.props.title;
    let location_list = this.props.location_list;
    return (
      <DefaultLayout>
        <h1>{title}</h1>
        <a href="/location/create"><button type="button" className="btn btn-success btn-lg">Add location</button></a>
        <div className="card-deck">
          <div className="row">
            {location_list ? (location_list.map((location) =>
              <div className="col-sm-6 p-2" style={{"maxWidth": "20rem"}} key={location}>
                <div className="card card-shadow">
                <a href={location.url} className="link-unstyled">
                  <img className="card-img-top" src="https://placehold.it/500x280" alt="Card image top"/>
                  <div className="card-body">
                    <h5 className="card-title">{location.name}</h5>
                    <p className="card-text">{location.desc}</p>
                  </div>
                </a>
                  </div>
              </div>
            )) : (
              <p>There are no locations.</p>
            )}
          </div>
        </div>
      </DefaultLayout>
    )
  }
}

module.exports = LocationList;
