const EVENTS: any = {};

class EventEmitter {
	subscribe(event: string, callback: any) {
		if (!EVENTS[event]) {
			EVENTS[event] = [];
		}

		EVENTS[event].push(callback);
	}

	unsubscribe(name: string, callback = null) {
		if (!EVENTS[name]) {
			return;
		}

		if (callback) {
			for (let i = 0; i < EVENTS[name].length; i++) {
				if (EVENTS[name][i] === callback) {
					EVENTS[name][i] = null;

					return;
				}
			}

			return;
		}

		delete EVENTS[name];
	}

	dispatch(name: string, ...payload: any) {
		if (!EVENTS[name]) {
			return;
		}

		for (let i = 0; i < EVENTS[name].length; i++) {
			if (EVENTS[name][i]) {
				EVENTS[name][i](...payload);
			}
		}
	}
}

export default new EventEmitter();
