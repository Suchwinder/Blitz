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

  uploadImage = async () => {
    const data = {
      "image": this.state.file 
    }
    const response = await fetch('/api/upload', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(data)
    })
    const status = response.status

    if(status === 200) {
      console.log(response.success)
    }

  }

  handleChange(event) {
    this.setState({
      file: URL.createObjectURL(event.target.files[0])
    }, () => {console.log(this.state.file)})
  }
  render() {
    return (
      <div>
        <input type="file" onChange={this.handleChange}/>
        <br></br>
        <img style={{width: 250}} src={this.state.file} alt={""}/>
      </div>
    );
  }
}
module.exports = Upload