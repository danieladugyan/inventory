const React = require('react');
const DefaultLayout = require('./layouts/default');

class LocationForm extends React.Component {
  render() {
    let location = this.props.location;
    let things_list = this.props.things_list;
    let things = [];
    if (location) {
      if (location.things) {
        if (typeof location.things === 'string') {
          things.push(location.things._id)
        } else {
          // if more than one thing (prevents forEach from throwing error for < 2 things)
          location.things.forEach(thing => {
            things.push(thing._id)
          })
        }
      }
    }
    let errors = this.props.errors;
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
          <select className="selectpicker" id="things" name="things" data-live-search="true" placeholder="" multiple defaultValue={things}>
            {things_list ? (things_list.map((thing) =>
              <option key={thing} value={thing._id}>{thing.name}</option>
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
