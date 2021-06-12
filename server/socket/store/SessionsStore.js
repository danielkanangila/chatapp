class SessionsStore {
    constructor() {
        this.store = new Map();
    }

    getUserSessionId(userId) {
      const result = [...this.store.entries()]
        .filter(({1: v}) => v.userId === userId)
        .map(([key]) => key);
      
      return result.length ? result[0] : undefined; 
    }

    find(id) {
        return this.store.get(id);
    }

    findAll() {
      return [...this.store.values()]
    }

    findWhere(key, value) {
      const result = [...this.store.values()].filter(item => item[key] === value)
      return result.length ? result : null
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