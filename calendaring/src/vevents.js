export default class Vevents {
  constructor(classification, latitude, longtitude, location, priority, summary, start, end, recurr, count, timezone) {
    this.begin = 'Begin:VEVENT';
    this.classification = 'CLASS:' + (classification || 'PUBLIC');
    this.geo = 'GEO:' + latitude + ';' + longtitude;
    this.summary = 'SUMMARY:' + summary;
    this.start = 'DTSTART;TZID='+ timezone + ':' + start;
    this.end = 'DTEND;TZID='+ timezone + ':' + end;
    this.recurr = (recurr == '') ? '' : 'RRULE:FREQ=' + recurr + ';' + count;
    this.priority = 'PRIORITY:' + priority;
    this.location = 'LOCATION:' + location;
    this.ending = 'END:VEVENT';
    // this.description = 'DESCRIPTION:' +  description;
    // this.modified = new Date();
    // this.created = created; -- not sure if we need this
  }

  // set modified(modified) {
  //   if (modified instanceof Date) {
  //     this.modified = modified;
  //   }
  // }

  build() {
    let output = '';
    const objectKeys = Object.keys(this);
    output = objectKeys.reduce((accumulator, currentValue) => accumulator + this[currentValue] + '\n', '');
    output = output.substring(0, output.length - 1);
    return output;
  }
}