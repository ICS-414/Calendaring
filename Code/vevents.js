class Vevents {
  constructor(summary, classification, description, start, end, priority, location, latitude, longtitude) {
    this.summary = 'SUMMARY:' + summary;
    this.classification = 'CLASS:' + (classification || 'PUBLIC');
    this.description = 'DESCRIPTION:' +  description;
    this.start = 'DTSTART:' + start;
    this.end = 'DTEND:' + end;
    this.proirity = 'PRIORITY:' + priority;
    this.location = location;
    this.modified = new Date();
    this.geo = 'GEO:' + latitude + ';' + longtitude;
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

 let e = new Vevents('Tim test', 'PUBLIC', 'To test');

 console.log(e.build());
