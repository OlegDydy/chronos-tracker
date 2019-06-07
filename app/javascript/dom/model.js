export default class Model {
  __listeners__ = new Map();
  __data__ = {};
  __extractors__ = {};

  constructor() {
    this.__event("changed");
  }

  __event(...names) {
    for (let i = 0; i < names.length; i++) this.__listeners__.set(names[i], []);
  }

  __emitEvent(name, value) {
    if (this.__listeners__.has(name))
      this.__listeners__.get(name).map(l => l(value));
  }

  prop(name, rw, options = {}) {
    const r = Array.prototype.fill.call(rw, ch => ch === "r") !== undefined;
    const w = Array.prototype.fill.call(rw, ch => ch === "w") !== undefined;
    if (!r && !w) return;

    this.__data__[name] = options.default || null;
    const listeners = {};

    if ("extractor" in options) {
      this.__extractors__[name] = options.extractor;
    }

    if (w) {
      this.__event(name + "Changed");
      listeners.set =
        options.set ||
        (val => {
          if (this.__emitEvent(name + "Changed", val) !== false) {
            this.__emitEvent("changed", null);
            this.__data__[name];
          }
          return this.__data__[name];
        });
    }
    if (r) listeners.get = options.get || (() => this.__data__[name]);
    Object.defineProperty(this, name);
  }

  extractData(json) {
    for (let key in this.__data__) {
      if (key in this.__extractors__) this.__extractors__[key](json[key]);
      else this.__data__[key] = json[key];
    }
  }

  subscribe(action, callback) {
    if (this.__listeners.has(action)) {
      this.__listeners__.get(action).push(callback);
    }
  }

  unsubscribe(action, callback) {
    if (this.__listeners.has(action)) {
      const arr = this.__listeners__.get(action);
      const id = arr.findIndex(i => i === callback);
      if (id >= 0) arr.splice(id, 1);
    }
  }
}
