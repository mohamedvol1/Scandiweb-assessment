class Observable {
  constructor() {
    this.observers = [];
    this.idsList = []
  }

  subscribe(f) {
    this.observers.push(f);
  }

  unsubscribe(f) {
    this.observers = this.observers.filter(subscriber => subscriber !== f);
  }

  notify(bool, id) {
    this.observers.forEach(observer => observer(bool, id));
  }

  emptyIdsList() {
    this.idsList = []
  }
}

export default new Observable();
