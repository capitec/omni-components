/* eslint-disable @typescript-eslint/no-explicit-any */
import { PlayFunction } from './PlayFunction.js';

/**
 * This type intends to implement Component Story Format (CSF) v3.
 * https://github.com/ComponentDriven/csf
 */
export type ComponentStoryFormat<T> = {
    /**
     * Custom render function for the story. (standard)
     */
    render?: (args: T) => any;

    /**
     * Suitable name for the story. (standard)
     */
    name?: string;

    /**
     * Suitable description for the story. (non-standard)
     */
    description?: string | (() => any);

    /**
     * Dynamic set of arguments for the story to execute. (standard)
     */
    args?: Partial<T>;

    /**
     * Test function for the story (standard)
     */
    play?: PlayFunction<T>;

    /**
     * Obtain original DOM source (non-standard)
     */
    //source?: () => string;

    /**
     * Obtain source per framework (non-standard)
     */
    frameworkSources?: FrameworkSource<T>[];
};

export type FrameworkSource<T> = {
    /**
     * Framework that the source relates to.
     */
    framework: FrameworkOption;
    /**
     * Function that generates a source string from provided args.
     */
    load?: (args: T) => string;

    /**
     * Indicates that code is not valid for translating to CodePen.
     */
    disableCodePen?: boolean;
};

export type FrameworkOption = 'HTML' | 'React';

export type CSFIdentifier = {
    title: string;
    component: string;
};
