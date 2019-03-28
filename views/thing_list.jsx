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
        <div className="card-deck">
          <div className="row">
            {thing_list ? (thing_list.map((thing) =>
              <div className="col-sm-6 p-2" style={{"maxWidth": "20rem"}} key={thing}>
                <div className="card card-shadow">
                  <a href={thing.url} className="link-unstyled">
                    <img className="card-img-top" src="https://placehold.it/500x280" alt="Card image top"/>
                    <div className="card-body">
                      <h5 className="card-title">{thing.name}</h5>
                      <p className="card-text">{thing.notes}</p>
                    </div>
                  </a>
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
