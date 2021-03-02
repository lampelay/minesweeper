export class Status {
  constructor(name) {
    this.name = name;
  }

  toString() {
    return this.name;
  }
}

Status.OPENED = new Status('OPENED');
Status.CLOSED = new Status('CLOSED');
Status.MARKED = new Status('MARKED');
Object.freeze(Status);