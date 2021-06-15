class SessionsStore {
    constructor() {
        this.store = new Map();
    }

    find(id) {
        return this.store.get(id);
    }

    findAll() {
      return this.store.values();
    }

    findWhere(key, value) {
      let result;
      this.store.forEach((instance) => {
        if (instance[key] === value){
          result = instance;
          return;
        }
      })
      return result;
    }

    isUserOnline(userId) {
      const result = this.findWhere('userId', userId);
      return !!result;
    }

    save(id, data) {
      this.store.set(id, data);
    }

    remove(id) {
      this.store.delete(id)
    }
}

module.exports = SessionsStore;