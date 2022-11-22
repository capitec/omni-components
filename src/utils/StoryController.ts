import { ReactiveController, ReactiveControllerHost } from 'lit';

export class StoryController implements ReactiveController {
    host: ReactiveControllerHost;
    storyPath: string;
    story: any;

    constructor(host: ReactiveControllerHost, storyPath: string) {
        this.storyPath = storyPath;
        (this.host = host).addController(this);
    }

    async hostConnected() {
        this.story = await import(document.baseURI + this.storyPath);
        this.host.requestUpdate();
    }
}
