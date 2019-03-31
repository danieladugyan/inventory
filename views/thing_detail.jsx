const React = require('react');
const DefaultLayout = require('./layouts/default');
const DeleteButton = require('./components/delete_button');
const moment = require('moment');

class ThingDetail extends React.Component {
  render() {
    let thing = this.props.thing;
    let location = this.props.location;
    let update_link = "/thing/" + thing._id + "/update"
    let header;
    if (location) {
      header = <h1>{thing.name} | <a href={location.url}>{location.name}</a> <DeleteButton id={thing._id} type="thing"/> <a href={update_link} className="link-unstyled"><i className="fas fa-edit font float-right pt-2" style={{fontSize:"2rem"}}></i></a> </h1> ;
    } else {
      header = <h1>{thing.name} <DeleteButton id={thing._id} type="thing"/> <a href={update_link} className="link-unstyled"><i className="fas fa-edit font float-right pt-2" style={{fontSize:"2rem"}}></i></a> </h1>;
    }
    let dop = moment(thing.date_of_purchase).format('MMMM Do, YYYY');
    let warranty = moment(thing.warranty_expires).format('MMMM Do, YYYY');

    return (
      <DefaultLayout>
        {header}
        <div>
          {/*<p>Image: {thing.image}</p>*/}
          <p>Date of Purchase: {dop}</p>
          <p>Price: {thing.price}:-</p>
          <p>Warranty Expires: {warranty}</p>
          <p>Lended: {thing.lended.toString()}</p>
          <p>Receipt: {thing.receipt}</p>
          <p>Notes: {thing.notes}</p>
        </div>

        <img src={this.props.qrdata}/>
      </DefaultLayout>
    )
  }
}

module.exports = ThingDetail;
