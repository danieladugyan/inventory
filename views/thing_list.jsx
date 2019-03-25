const React = require('react');
const DefaultLayout = require('./layouts/default');

class ThingList extends React.Component {
  render() {
    let title = this.props.title;
    let thing_list = this.props.thing_list;
    return (
      <DefaultLayout>
        <h1>{title}</h1>
        <a href="/thing/create"><button type="button" className="btn btn-success btn-lg">Add thing</button></a>
        <div className="card-group pt-md-3">
          <div className="row">
            {thing_list ? (thing_list.map((thing) =>
              <div className="col-sm-3" key={thing}>
                <div className="card">
                  <img className="card-img-top" src="https://placehold.it/500x280" alt="Card image top"/>
                  <div className="card-body">
                    <h5 className="card-title">{thing.name}</h5>
                    {/*<p className="card-text">{thing.notes}</p>*/}
                    <a href={thing.url} className="btn btn-primary stretched-link">Details</a>
                  </div>
                </div>
              </div>
            )) : (
              <p>There are no things.</p>
            )}
          </div>
        </div>
      </DefaultLayout>
    )
  }
}

module.exports = ThingList;
