const React = require('react');
const DefaultLayout = require('./layouts/default');
const moment = require('moment');

class ThingDetail extends React.Component {
  render() {
    let thing = this.props.thing;
    let location = this.props.location;
    let header;
    if (location) {
      header = <h1>{thing.name} | <a href={location.url}>{location.name}</a></h1>;
    } else {
      header = <h1>{thing.name}</h1>;
    }
    let dop = moment(thing.date_of_purchase).format('MMMM Do, YYYY');
    let warranty = moment(thing.warranty_expires).format('MMMM Do, YYYY');

    return (
      <DefaultLayout>
        {header}
        <a href={thing._id + '/update/'}><button type="button" className="btn btn-success btn-lg">Edit</button></a>
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
