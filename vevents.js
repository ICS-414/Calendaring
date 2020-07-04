module.exports = class Vevents {
  constructor(summary, classification, description, start, end, priority, latitude, longtitude, location) {
    this.begin = 'Begin:Vevent';
    this.summary = 'SUMMARY:' + summary;
    this.classification = 'CLASS:' + (classification || 'PUBLIC');
    this.description = 'DESCRIPTION:' +  description;
    this.start = 'DTSTART:' + start;
    this.end = 'DTEND:' + end;
    this.proirity = 'PRIORITY:' + priority;
    this.geo = 'GEO:' + latitude + ';' + longtitude;
    this.ending = 'END:Vevent';
    // this.modified = new Date();
    // this.location = location;
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