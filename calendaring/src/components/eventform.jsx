import React, { Component } from 'react';
import { Form, Icon, Container, Label, Grid } from 'semantic-ui-react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Vevents from '../vevents';
import Ics from '../ics';
import fileDownload from 'js-file-download';
import '../App.css';
import Alert from '@material-ui/lab/Alert';
import DateAndTimePickers from './datePicker';
import TimezonePicker from 'react-bootstrap-timezone-picker';
import 'react-bootstrap-timezone-picker/dist/react-bootstrap-timezone-picker.min.css';
// import Button from '@material-ui/core/Button';
// import SaveIcon from '@material-ui/icons/Save';
// import TextField from '@material-ui/core/TextField';
// import Container from '@material-ui/core/Container';
// import { Icon } from '@material-ui/core';
// import Map from './map'
// import LocationPickerExample from './locationPicker'
// import AlertDialog from './alertDialog'
// import AppBar from './appBar'
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';

const options = [
  { key: 'm', text: 'Male', value: 'male' },
  { key: 'f', text: 'Female', value: 'female' },
  { key: 'o', text: 'Other', value: 'other' },
]

const classificatication = [
  {text: 'Public', value:'PUBLIC'},
  {text: 'Private', value:'PRIVATE'}
]

const priorityOptions = [
  {text: '1', value: '1'},
  {text: '2', value:'2'},
  {text: '3', value:'3'},
  {text: '4', value:'4'},
  {text: '5', value:'5'},
  {text: '6', value:'6'},
  {text: '7', value:'7'},
  {text: '8', value:'8'},
  {text: '9', value:'9'},
  {text: '10', value:'10'}
]


const recurrOptions = [
    { text: 'Yearly', value: 'YEARLY' },
    { text: 'Weekly', value: 'WEEKLY' },
    { text: 'Daily', value: 'DAILY' },
    { text: 'None', value: '' }
]

const countOptions = [
    { text: 'Indefinitely', value: '' },
    { text: '1', value: 'COUNT=1' },
    { text: '2', value: 'COUNT=2' },
    { text: '3', value: 'COUNT=3' },
    { text: '4', value: 'COUNT=4' },
    { text: '5', value: 'COUNT=5' },
    { text: '10', value: 'COUNT=10' },
    { text: '20', value: 'COUNT=20' },
]

class EventForm extends Component {

  // constructor(props){
  //   super(props);

  //   this.state= {
  //     classification:'PUBLIC',
  //     geo: {
  //       latitude: '',
  //       longtitude: '' 
  //     },
  //     summary:'',
  //     start:'',
  //     end:'',
  //     priority:'PRIORITY',
  //     location:'LOCATION',
  //   };
  // }

  state = {
      classification:'PUBLIC',
      latitude: '',
      longtitude: '' ,
      summary:'',
      start: new Date(),
      end: new Date(),  
      priority:'',
      location: '',
      recurr: '',
      count: '',
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      errorToggle: false,
      error: 'None'
  }

  
  handleChange = (event) => {
    console.log(event);
    const {name, value} = event.target;
    console.log(name);
    console.log(value);
    console.log('Handle Change Called');
    this.setState({ [name]: value })
  }

  handlePlaceChange = (location) => {
    console.log(location);
    this.setState({ location: location})
  }
  
  handleTimezoneChange = (userTimezone) => {
    this.setState({ timezone: userTimezone})
  }

  handleDateStartChange = (event) => {
    const startDate = new Date(event.target.value);
    const endDate = new Date(this.state.end);
    console.log(event.target.value);
    if(startDate < new Date()){
      this.setState({errorToggle: true});
      this.setState({error: 'Start date cannot be in the past. Please pick a different date'});
      console.log(this.state);
    }else{
      this.setState({ 'start': event.target.value })
    }
  }

  handleDateEndChange = (event) => {
    const endDate = new Date(event.target.value);
    const startDate = new Date(this.state.start);
    // console.log(endDate);
    // console.log(new Date());
    if(endDate < new Date()){
      this.setState({errorToggle: true});
      this.setState({error: 'End date cannot be in the past. Please pick a different date'});
      console.log(this.state);
    }else{
      this.setState({ 'end': event.target.value})
    }
  }

  /**
   * Processes the dates to have to correct offsets and conform to ics calendar requirments
   */
  buildDate = (date) => {
    let year = date.getYear() + 1900;
    let month = date.getMonth() + 1  > 9 ? date.getMonth() +1  : '0' + (date.getMonth() + 1);
    let day = date.getDate() > 9 ? date.getDate() : '0' + date.getDate();
    let buildDate = `${year}${month}${day}`;
    return buildDate;
  }
  
  

  handleSubmit = () => {
    // let {classification, latitude, longtitude, location, priority, summary, start, end, recurr, count} = this.state; 
    // start = this.buildDate(start);
    // end = this.buildDate(end);
    // let icsEvent = [new Vevents(classification, latitude, longtitude, location, priority, summary, start, end, recurr, count)];
    // let icsCalendar = new Ics(icsEvent);
    // let calendar = icsCalendar.build();
    // console.log(this.state);
    // fileDownload(calendar, 'Calendar.ics');


    if (this.formComplete() === true){
      let {classification, latitude, longtitude, location, priority, summary, start, end, timezone,recurr, count} = this.state; 
      start = this.buildDate(start);
      end = this.buildDate(end);
      let icsEvent = [new Vevents(classification, latitude, longtitude, location, priority, summary, start, end, recurr, count)];
      let icsCalendar = new Ics(icsEvent,timezone);
      let calendar = icsCalendar.build();
      fileDownload(calendar, 'Calendar.ics');
    }
    else{
      console.log('Error, form is not complete');
      this.setState({errorToggle: true});
    }
  }
  

  formComplete = () =>{
    const endDate = new Date(this.state.end);
    const startDate = new Date(this.state.start);

    for (let val of Object.keys(this.state)){
      console.log(val);
      if (this.state[val] === ''){
        console.log('Here in my garage');
        this.setState({error: val + ' is missing. Please complete the form '});
        return false;
      }
    }

    if(endDate < startDate){
      this.setState({errorToggle: true});
      this.setState({error: 'End date cannot be before start date. Please pick a different date'});
      // console.log(this.state);
      return false;
    }

    return true;
  }

  formReset = () => {
    console.log('FormReset');
    this.setState({errorToggle: false});
  }

  renderFunc = ({ getInputProps, getSuggestionItemProps, suggestions, loading }) => (
    <div className="autocomplete-root">
      <input {...getInputProps({placeholder: 'Location'})} />
      <div className="autocomplete-dropdown-container">
        {loading && <div>Loading...</div>}
        {suggestions.map(suggestion => (
          <div {...getSuggestionItemProps(suggestion)}>
            <span>{suggestion.description}</span>
          </div>
        ))}
      </div>
    </div>
  );

  render() { 
    const{classification, latitude, longtitude, summary, start, end, priority, location, recurr, count, errorToggle, error, timezone} = this.state;

    if(errorToggle === true){
      console.log('Error Toggle');
      return (
      <Alert onClose={this.formReset}>{error}</Alert>
      )
    }

    return (  
      <React.Fragment >
        <Container className='Container'>
            <Grid centered >
              <h1>Create A Downloadable Calendar Event File</h1>
            </Grid>
            <Form method="get" action="../App.js">
              <Form.Input
                fluid
                inline 
                placeholder='Title...'
                label='Title' 
                value={summary}
                onChange={this.handleChange}
                name='summary'
                size='huge'
              />
              <DateAndTimePickers 
                id='Start'
                selected={this.state.date} 
                onChange={this.handleDateStartChange} 
                name='start'
              />

              <DateAndTimePickers
                id='End'
                selected={this.state.date} 
                onChange={this.handleDateEndChange} 
                name= 'end'
              />           
              <TimezonePicker
                absolute      = {false}
                defaultValue  = {timezone}
                placeholder   = "Select timezone..."
                onChange      = {this.handleTimezoneChange}
              />                 
              {/* <Form.Group>
                <Form.Input 
                  width={12}
                  label='End Date' 
                  placeholder='EndDate'
                  value={end}
                  readOnly
                />
                <Label>
                  <Icon name='calendar outline' size='big'/>
                  <DatePicker 
                  selected={this.state.date} 
                  onChange={this.handleDateEndChange} 
                  name={end}
                />
                </Label>
              </Form.Group> */}

              <PlacesAutocomplete
                value={location}
                onChange={this.handlePlaceChange}
                onSelect={this.handlePlaceChange}
              >
                {this.renderFunc}
              </PlacesAutocomplete>
              {/* <Form.Input inline fluid
                label='Location' 
                placeholder='Location' 
                onChange={this.handleChange}
                name='location'
              /> */}
              <Form.Group>
                <Form.Input 
                  label='Latitude' 
                  placeholder='Latitude' 
                  value={latitude}
                  name='latitude'
                  onChange={this.handleChange}
                />
                <Form.Input
                  label='Longtitude' 
                  placeholder='Longtitude' 
                  value={longtitude}
                  name='longtitude'
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group >
                <Form.Select
                  options={recurrOptions}
                  label='Recurring'
                  placeholder='Recurring'
                  name='recurr'
                  onChange={this.handleChange}
                />
                <Form.Select
                  options={countOptions}
                  label='Count'
                  placeholder='Count'
                  name='count'
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Select 
                width={4}
                label='Classification'
                options={classificatication}
                placeholder='Classification'
                value={classification}
                name='classification'
                onChange={this.handleChange}
              />
              <Form.Select 
                width={4}
                label='priority'
                options={priorityOptions}
                placeholder='priority'
                value={priority}
                name='priority'
                onChange={this.handleChange}
              />              
              <Form.Input
                width={4}
                label='Priority' 
                placeholder='Priority: 1-10' 
                onChange={this.handleChange}
                name='priority'
              />
            </Form>
            <Grid centered>
              <button className='button'
                onClick={this.handleSubmit}
              >
               Click to download file
              </button>
            </Grid>
        </Container>
      </React.Fragment>
    );
  }
}
 
export default EventForm;