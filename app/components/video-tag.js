import Ember from 'ember';

export default Ember.Component.extend({
    tagName: 'video',

    didRender() {
        this._super(...arguments);
        const videoEl = this.$()[0];
        if (videoEl.src || videoEl.srcObject) {
            videoEl.play();
        } else if (videoEl.hasOwnProperty('srcObject')) {
            videoEl.srcObject = this.get('stream');
        } else {
            videoEl.src = URL.createObjectURL(this.get('stream'));
        }
    }
});
