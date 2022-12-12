import { PlayFunction } from './PlayFunction.js';

export type ComponentStoryFormat<T> = {
    render?: (args: T) => any;
    name?: string;
    args?: Partial<T>;
    play?: PlayFunction<T>;
    source?: () => string;
};

export type CSFIdentifier = {
    title: string;
    component: string;
};
