// Pass in components to build the ICS file
export default class Ics {
  constructor(vevents = [], prodID, version, timezone) {
    this.prodID = `PRODID:${prodID || '-//ICS 414 Turkey Pie//Calendar Project //EN'}`;
    this.version = `VERSION:${version || '2.0'}`;
    this.timezone = `TZID:${timezone || 'Pacific/Honolulu'}`;
    this.vevents = vevents;
  }

  build() {
    const output = `${'BEGIN:VCALENDAR'}${'\n'}${this.prodID}${'\n'}${this.version}${'\n'}${this.timezone}${'\n'}`
    + `${this.vevents.reduce((accumulator, currentVal) => accumulator + currentVal.build() + '\n', '')}`;

    return output.trim() + '\nEND:VCALENDAR';
  }
};
