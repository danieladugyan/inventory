const React = require('react');
const DefaultLayout = require('./layouts/default');

class ThingForm extends React.Component {
  render() {
    let thing = this.props.thing;
    let errors = this.props.errors;
    return (
      <DefaultLayout>
        {errors ? (
          <div className="alert alert-danger" role="alert">
            <ul>
              {errors.map(error => <li key={error}>{error.msg}{console.log(error)}</li>)}
            </ul>
          </div>
        ): ""}

        <form method="POST" action="">
          <div className='form-group'>
            <label htmlFor="name">Name:</label>
            <input id="name" name="name" className="form-control" required={true} type="text" placeholder="Name"  defaultValue={undefined === thing ? '' : thing.name}></input>
          </div>
          <div className='form-group'>
            <label htmlFor="price">Price:</label>
            <input id="price" name="price" className="form-control" type="number" placeholder="Price" defaultValue={undefined === thing ? '' : thing.price}></input>
          </div>
          {/* add input to choose which location thing belongs to*/}
          <div className='form-group'>
            <label htmlFor="date_of_purchase">Date of purchase:</label>
            <input id="date_of_purchase" name="date_of_purchase" className="form-control" type="date" defaultValue={undefined === thing ? '' : thing.date_of_purchase}></input>
          </div>
          <div className='form-group'>
            <label htmlFor="warranty_expires">Warranty expires:</label>
            <input id="warranty_expires" name="warranty_expires" className="form-control" type="date" defaultValue={undefined === thing ? '' : thing.warranty_expires}></input>
          </div>
          <div className='form-group'>
            <label htmlFor="notes">Receipt:</label>
            <input id="receipt" name="receipt" className="form-control" type="text" placeholder="Where is the receipt" defaultValue={undefined === thing ? '' : thing.receipt}></input>
          </div>
          <div className='form-group'>
            <label htmlFor="notes">Notes:</label>
            <input id="notes" name="notes" className="form-control" type="text" placeholder="Notes" defaultValue={undefined === thing ? '' : thing.notes}></input>
          </div>
          <button className="btn btn-primary" type="submit">Submit</button>
        </form>

      </DefaultLayout>
    )
  }
}

module.exports = ThingForm;
