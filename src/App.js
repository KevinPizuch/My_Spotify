import React,{Component} from 'react';
import './style.css';
import axios from "axios";
//import logo from './images/spotify.png';

class ContactForm extends React.Component {
    state = {
        name: '',
        email: '',
        country: '',
        city: '',
        job: '',

    }

    handleFormSubmit( event ) {
        event.preventDefault();


        let formData = new FormData();
        formData.append('name', this.state.name)
        formData.append('email', this.state.email)
        formData.append('city', this.state.city)
        formData.append('country', this.state.country)
        formData.append('job', this.state.job)

        axios({
            method: 'post',
            url: '/api/contacts.php',
            data: formData,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
        })
        .then(function (response) {
            //handle success
            console.log(response)

        })
        .catch(function (response) {
            //handle error
            console.log(response)
        });
    }

    render(){
        return (
        <form>
            <label>Name</label>
            <input type="text" name="name" value={this.state.name}
                onChange={e => this.setState({ name: e.target.value })}/>

            <label>Email</label>
            <input type="email" name="email" value={this.state.email}
                onChange={e => this.setState({ email: e.target.value })}/>

            <label>Country</label>
            <input type="text" name="country" value={this.state.country}
                onChange={e => this.setState({ country: e.target.value })}/>

            <label>City</label>
            <input type="text" name="city" value={this.state.city}
                onChange={e => this.setState({ city: e.target.value })}/>

            <label>Job</label>
            <input type="text" name="job" value={this.state.job}
                onChange={e => this.setState({ job: e.target.value })}/>

            <input type="submit" onClick={e => this.handleFormSubmit(e)} value="Create Contact" />
        </form>);
    }
}

class App extends React.Component {
  state = {
    contacts: []
  }
  render() {
    return (
        <React.Fragment>
        <h1>Contact Management</h1>
        <table border='1' width='100%' >
        <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Country</th>
            <th>City</th>
            <th>Job</th>
        </tr>

        {this.state.contacts.map((contact) => (
        <tr>
            <td>{ contact.name }</td>
            <td>{ contact.email }</td>
            <td>{ contact.country }</td>
            <td>{ contact.city }</td>
            <td>{ contact.job }</td>
        </tr>
        ))}
        </table>
        </React.Fragment>
    );
  }
  componentDidMount() {
    const url = 'contacts.php'
    axios.get(url).then(response => response.data)
    .then((data) => {
      this.setState({ contacts: data })
      console.log(this.state.contacts)
     })
  }
}

export default App;

















/*
function App() {
  return (
    <div className="content">
    <div className="nav">
      <img src={logo}  id="logo" alt="logo"/>
      <p id='acceuil'><i className="fas fa-home"></i>&nbsp; Acceuil</p>

      <p id='rechercher'><i className="fas fa-search"></i>&nbsp; Rechercher</p>
      <p id='biblio'><i className="fas fa-layer-group"></i>&nbsp; Bibliothèque</p>

      <p id='playlist' >Playlists</p>

      <p><i className="fas fa-plus-square"></i>&nbsp; Créer une playlist</p>
    </div>
      <div className="main">


      </div>
      <div className="player">

      </div>
    </div>

  );
}

*/
