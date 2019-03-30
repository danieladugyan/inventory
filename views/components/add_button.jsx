const React = require('react');

class AddButton extends React.Component {
  render() {
    let update_link = this.props.update_link;
    let text = this.props.text;
    //let width = {maxWidth: (this.props.width || 10) + "rem"};
    let fontsize = ((this.props.width || 10) / 2) + "rem";

    return (
      <a href={update_link} className="card text-center card-shadow link-unstyled mb-3">
        <div className="card-body">
          <h5 className="card-title">{text}</h5>
          <br/>
          <i className="fas fa-plus-circle" style={{color:"green", fontSize:fontsize}}></i>
        </div>
      </a>
    )
  }
}

module.exports = AddButton;
