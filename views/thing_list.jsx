const React = require('react');
const DefaultLayout = require('./layouts/default');
const AddButton = require('./components/add_button');
const Card = require('./components/card')

class ThingList extends React.Component {
  render() {
    let title = this.props.title;
    let thing_list = this.props.thing_list;
    return (
      <DefaultLayout>
        <div className="card-deck">
          <AddButton update_link="/thing/create" text="Create thing"/>
          {thing_list ? (thing_list.map((thing) =>
            <Card url={thing.url} name={thing.name} desc={thing.notes} imgdata={thing.imgdata} key={thing}/>
          )) : (
            ""
          )}
        </div>
      </DefaultLayout>
    )
  }
}

module.exports = ThingList;
