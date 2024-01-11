import { LitElement, ReactiveController, ReactiveControllerHost } from 'lit';

export class StoryController implements ReactiveController {
    host: ReactiveControllerHost;
    storyPath: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    story: any;

    constructor(host: ReactiveControllerHost, storyPath: string) {
        this.storyPath = storyPath;
        (this.host = host).addController(this);
    }

    async hostConnected() {
        this.story = await import(document.baseURI + this.storyPath);
        this.host.requestUpdate();

        await this.host.updateComplete;

        (this.host as LitElement).dispatchEvent(
            new CustomEvent('component-render-complete', {
                bubbles: true
            })
        );
    }
}
