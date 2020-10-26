// https://medium.com/@650egor/react-30-day-challenge-day-2-image-upload-preview-2d534f8eaaa

const React = require('react')
class Upload extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      file: null
    }
    this.handleChange = this.handleChange.bind(this)
  }
  handleChange(event) {
    this.setState({
      file: URL.createObjectURL(event.target.files[0])
    })
  }
  render() {
    return (
      <div>
        <input type="file" onChange={this.handleChange}/>
        <br></br>
        <img style={{width: 250}} src={this.state.file}/>
      </div>
    );
  }
}
module.exports = Upload