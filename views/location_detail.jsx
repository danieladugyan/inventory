const React = require('react');
const DefaultLayout = require('./layouts/default');
const AddButton = require('./components/add_button');
const Card = require('./components/card')

class LocationDetail extends React.Component {
  render() {
    let location = this.props.location;
    let location_locations = this.props.location_locations;
    let location_things = this.props.location_things;
    let update_link = "/location/"+ this.props.location._id + "/update"

    return (
      <DefaultLayout js={this.props.js}>
        <div className="border-bottom">
          <img className="img-fluid float-right" src={this.props.qrdata}/>
          <h1>{location.name} <span className="text-muted">{location.type}</span> <a href={update_link} className="link-unstyled"><i className="fas fa-edit font float-right pt-2" style={{fontSize:"2rem"}}></i></a> </h1>
          <h3 className="text-muted">{location.desc}</h3>
        </div>

        <div className="card-deck border-bottom py-2">
          <AddButton update_link={update_link} text="Add location"/>

            {location_locations[0] ? (
              location_locations.map(location =>
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
              )
            ) : (
              ""
            )}
        </div>

        <div className="card-deck py-2">
            <AddButton update_link={update_link} text="Add thing"/>

            {location_things ? (location_things.map(thing =>
              <Card url={thing.url} name={thing.name} desc={thing.notes} key={thing}/>
              )
            ) : (
              ""
            )}
        </div>

      </DefaultLayout>
    )
  }
}

module.exports = LocationDetail;
