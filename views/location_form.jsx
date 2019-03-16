const React = require('react');
const DefaultLayout = require('./layouts/default');

class LocationForm extends React.Component {
  render() {
    let location = this.props.location;
    let errors   = this.props.error;
    return (
      <DefaultLayout>
        <form method="POST" action="">
          <div className='form-group'>
            <label htmlFor="name">Name:</label>
            <input id="name" name="name" className="form-control" required={true} type="text" placeholder="Name"  defaultValue={undefined === location ? '' : location.name}></input>
          </div>
          <div className='form-group'>
            <label htmlFor="type">Type:</label>
            <input id="type" name="type" className="form-control" required={true} type="text" placeholder="Type" defaultValue={undefined === location ? '' : location.type}></input>
          </div>
          <div className='form-group'>
            <label htmlFor="desc">Description:</label>
            <input id="desc" name="desc" className="form-control" type="desc" placeholder="Description" defaultValue={undefined === location ? '' : location.desc}></input>
          </div>
          <button className="btn btn-primary" type="submit">Submit</button>
        </form>

        {errors ? (
          <ul>
            {errors.map(error => <li key={error}>{error.msg}</li>)}
          </ul>
        ) : ""}

      </DefaultLayout>
    )
  }
}

module.exports = LocationForm;
