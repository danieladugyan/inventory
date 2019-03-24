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
        <div className="card-group pt-md-3">
          {location_list ? (location_list.map((location) =>
            <div className="card" key={location} style={{width: "18rem"}}>
              {/*<img className="card-img-top" src="#" alt="Card image top"/>*/}
              <div className="card-body">
                <h5 className="card-title">{location.name}</h5>
                <p className="card-text">{location.desc}</p>
                <a href={location.url} className="btn btn-primary">Details</a>
              </div>
            </div>
          )) : (
            <p>There are no locations.</p>
          )}
        </div>
      </DefaultLayout>
    )
  }
}

module.exports = LocationList;
