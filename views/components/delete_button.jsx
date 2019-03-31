const React = require('react');

class DeleteButton extends React.Component {
  render() {
    let id = this.props.id;
    let type = this.props.type;

    return (
      <span>
        <button type="button" className="btn bg-white float-right pt-2 px-1" data-toggle="modal" data-target="#delModal">
          <i className="fas fa-trash-alt" style={{fontSize:"2rem", color:"red"}}></i>
        </button>

        <div className="modal fade" id="delModal" tabIndex="-1" role="dialog" aria-labelledby="delModalTitle" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="delModalTitle">Are you sure you want to delete this {type}?</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                <a href={"/"+type+"/"+ id + "/delete"} className="link-unstyled">
                  <button type="button" className="btn btn-danger">Delete</button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </span>
    )
  }
}

module.exports = DeleteButton;
