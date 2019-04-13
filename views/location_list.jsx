const React = require('react');
const DefaultLayout = require('./layouts/default');
const AddButton = require('./components/add_button');
const Card = require('./components/card')

class LocationList extends React.Component {
  render() {
    let title = this.props.title;
    let location_list = this.props.location_list;
    return (
      <DefaultLayout>
        <div className="card-deck">
          <AddButton update_link="/location/create" text="Create location"/>
          {location_list ? (location_list.map((location) =>
            <Card url={location.url} name={location.name} desc={location.notes} imgdata={location.imgdata} key={location}/>
          )) : (
            ""
          )}
        </div>
      </DefaultLayout>
    )
  }
}

module.exports = LocationList;
