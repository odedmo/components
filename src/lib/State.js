export default class State {
  constructor() {
    this.observers = [];
    this.state = {};
  }
 
  addObserver(observer) {
    this.observers.push(observer);
  }

  removeObserver(observer) {
    const removeIndex = this.observers.findIndex(obs => {
      return observer === obs;
    });

    if (removeIndex !== -1) {
      this.observers = this.observers.slice(removeIndex, 1);
    }
  }

  notify(data) {
    this.observers.forEach(observer => observer.update(data));
  }

  setState(data = {}) {
    this.state = {...this.state, ...data};
    this.notify(this.state);
  }

  // setState(field, data) {
  //   this.state[field] = data;
  // }

  getState() {
    return this.state;
  }
}