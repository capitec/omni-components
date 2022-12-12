import { ComponentStoryFormat } from './ComponentStoryFormat.js';

export type PlayFunction<T> = (context: PlayFunctionContext<T>) => Promise<void> | void;

export type PlayFunctionContext<T> = {
    args: T;
    story: ComponentStoryFormat<T>;
    canvasElement: HTMLElement;
};
