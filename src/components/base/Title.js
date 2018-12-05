export default class Title extends React.Component {
  render() {
    document.title = this.props.title;
    return this.props.children;
  }
}
