class ErrObservable {
  constructor() {
    this.observers = [];
    this.errMsgList = []
  }

  subscribe(f) {
    this.observers.push(f);
  }

  unsubscribe(f) {
    this.observers = this.observers.filter(subscriber => subscriber !== f);
  }

  notify(msg, field) {
    this.observers.forEach(observer => observer(msg, field));
  }

  emptyMsgList() {
    this.errMsgList = []
  }
}

export default new ErrObservable();