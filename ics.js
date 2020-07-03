// Pass in components to build the ICS file
export default class Ics {
  constructor(vevents = [], prodID, version, timezone) {
    this.prodID = 'PRODID:' + (prodID || '-//Google Inc//Google Calendar 70.9054//EN');
    this.version = 'VERSION:' + (version || '2.0');
    this.timezone = 'TZID:' + (timezone || 'Pacific/Honolulu');
    this.vevents = vevents;
  }

  build() {
    const output = `BEGIN:VCALENDAR'
     ${this.prodID}
     ${this.version}
     ${this.events.reduce((accumulator, currentVal) => accumulator + currentVal.build() + '/n', '')}
     END:VCALENDAR`;

    return output;
  }
}
