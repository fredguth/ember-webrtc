import DS from 'ember-data';

export default DS.Adapter.extend({
    init() {
        this._super(...arguments);
    },
    findRecord(store, type, id) {
        return Ember.RSVP.Promise((resolve) => { resolve(JSON.parse(window.localStorage.getItem(id))); });
    },
    createRecord(store, type, snapshot) {
        return new Ember.RSVP.Promise((resolve) => {
            const data = this.serialize(snapshot, { includeId: true });
            window.localStorage.setItem(snapshot.id, JSON.stringify(data));
            resolve();
        });
    },
    updateRecord(store, type, snapshot) {
        return this.createRecord(...arguments);
    },
    deleteRecord(store, type, snapshot) {
        return new Ember.RSVP.Promise((resolve) => {
            window.localStorage.removeItem(snapshot.id);
        });
    },
    findAll(store, type, sinceToken) {
        return new Ember.RSVP.Promsie((resolve) => {
            const archive = {};
            Object.keys(window.localStorage).forEach((key) => {
                archive[key] = JSON.parse(window.localStorage.getItem(key));
            });
            resolve(archive);
        });
    },
    query() {

    }
});
