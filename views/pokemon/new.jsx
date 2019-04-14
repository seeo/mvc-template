var React = require("react");

class Home extends React.Component {
  render() {
    console.log(this.props.types);
    return (
      <html>
        <head />
        <body>
          <h3>We are creating new pokemon</h3>
        </body>
      </html>
    );
  }
}

module.exports = Home;
