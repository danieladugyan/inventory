const React = require('react');
const DefaultLayout = require('./layouts/default');

class LocationForm extends React.Component {
  render() {
    let location = this.props.location;
    let things   = this.props.things;
    let errors   = this.props.errors;
    return (
      <DefaultLayout>
        {errors ? (
          <div className="alert alert-danger" role="alert">
            <ul>
              {errors.map(error => <li key={error}>{error.msg}</li>)}
            </ul>
          </div>
        ): ""}
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
            <input id="desc" name="desc" className="form-control" type="text" placeholder="Description" defaultValue={undefined === location ? '' : location.desc}></input>
          </div>
          <label htmlFor="things">Things:</label><br/>
          <select className="selectpicker" id="things" name="things" data-live-search="true" placeholder="" multiple defaultValue={[]}>
            {things ? (things.map((thing) =>
              <option key={thing}>{thing.name}</option>
            )) : (
              ""
            )}
          </select>
          <br/><br/>

          <button className="btn btn-primary" type="submit">Submit</button>
        </form>
      </DefaultLayout>
    )
  }
}

module.exports = LocationForm;
