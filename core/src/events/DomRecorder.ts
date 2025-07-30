import { record } from 'rrweb';
import EventsManager from '../EventsManager';

export function startRecording() {
  record({
    emit(event) {
      EventsManager.on('dom-update', {
        type: 'dom-update',
        event,
      });
    },
  });
}
