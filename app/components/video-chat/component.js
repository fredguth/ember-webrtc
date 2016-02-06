import Ember from 'ember';

export default Ember.Component.extend({
    classNames: ['video-chat'],
    inVideo: false,
    videoService: Ember.inject.service('video-chat'),

    participants: [],

    init() {
        this._super(...arguments);
        const videoService = this.get('videoService');

        videoService.on('videoAdded', this.videoAdded.bind(this));
        videoService.on('videoRemoved', this.videoRemoved.bind(this));

        window.thething = this;
    },

    actions: {
        joinVideo() {
            this.set('inVideo', true);
            this.get('videoService').joinRoom();
        },

        leaveVideo() {
            this.set('inVideo', false);
            this.get('videoService').leaveRoom();
        }
    },

    videoAdded(person) {
        this.get('participants').addObject(person);
    },

    videoRemoved(person) {
        this.get('participants').removeObject(person);
    }
});
