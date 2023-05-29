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
    load?: (args: T, self: FrameworkSource<T>) => string;

    /**
     * Indicates that code is not valid for translating to CodePen.
     */
    disableCodePen?: boolean;

    /**
     * Optional specific source parts for use when additional source is required.
     */
    sourceParts?: SourceParts<T>;
};

export type SourceParts<T = any> = {
    /**
     * Fragment source that will be injected after imports and before content in CodePen js file.
     */
    jsFragment?: string | ((args: T) => string);

    /**
     * Fragment source that will be injected in relevant html part for CodePen.
     */
    htmlFragment?: string | ((args: T) => string);
    /**
     * Fragment source that will be injected at the end of CodePen css file.
     */
    cssFragment?: string | ((args: T) => string);
    /**
     * Will force CodePen generation as fallback HTML framework even if specified as other framework.
     */
    fallbackFramework?: boolean;
};

export type FrameworkOption = 'HTML' | 'Lit' | 'React' | 'Vue';

export type CSFIdentifier = {
    title: string;
    component: string;
};
