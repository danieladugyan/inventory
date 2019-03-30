const React = require('react');

class Card extends React.Component {
  render() {
    //let width = {maxWidth: (this.props.width || 15) + "rem"};
    let url = this.props.url;
    let name = this.props.name;
    let desc = this.props.desc;

    return (
      <a href={url} className="card card-shadow link-unstyled mb-3">
        <img className="card-img-top" src="https://placehold.it/500x280" alt="Card image top"/>
        <div className="card-body">
          <h5 className="card-title">{name}</h5>
          <p className="card-text">{desc}</p>
        </div>
      </a>
    )
  }
}

module.exports = Card;
