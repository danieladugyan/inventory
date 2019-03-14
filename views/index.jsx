const React = require('react');
const DefaultLayout = require('./layouts/default');

class Index extends React.Component {
  render() {
    return (
      <DefaultLayout title={this.props.title} css={this.props.css} js={this.props.js}>
        <h1>Hello</h1>
      </DefaultLayout>
    )
  }
}

module.exports = Index;
