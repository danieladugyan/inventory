const React = require('react');
const DefaultLayout = require('./layouts/default');

class Index extends React.Component {
  render() {
    return (
      <DefaultLayout>
        {/*QR Code*/}
        <img src={this.props.urlqr}/>
      </DefaultLayout>
    )
  }
}

module.exports = Index;
