class Ics {
  constructor(title, description, start, end, created, location) {
    this.title = title;
    this.description = description;
    this.start = start;
    this.end = end;
    this.created = created;
    this.location = location;
    this.modified = new Date();
  }

  set modified(modified) {
    if (modified instanceof Date) {
      this.modified = modified;
    }
  }

  build() {
    let output = '';

    const objectKeys = Object.keys(this);

    objectkeys.forEach(() => { 
      output += 'V' 
    });
  }
}

