# Testing

This guide will take you through the process of creating a Story for your UI component  to render permutations  along with some basic interaction tests.

&nbsp;

# Table of Contents

[What is Storybook](#what-is-storybook)
  * [Definition of Done](#definition-of-done)
  * [Component files](#component-files)

[Story file](#story-file)
  * [Default Export](#default-export)
  * [Args](#args)
  * [ArgTypes](#argtypes)
  * [Story objects](#story-objects)
  * [Running Storybook](#running-storybook)
  * [Adding Stories](#adding-stories)
  * [UI Interaction Testing](#ui-interaction-testing)
     + [Class test](#class-test)
     + [Slotted content test](#slotted-content-test)
     + [Disabled test](#disabled-test)
  * [Checking the tests]()

&nbsp;

---

&nbsp;
## Prerequisites 

### Workstation

- Visual Code
- Typescript
- Node

### Storybook 

- Familiarity with [Component story format 3](https://storybook.js.org/blog/component-story-format-3-0/#:~:text=For%20your%20convenience%2C%20there%27s%20a%20codemod%20to%20upgrade%20your%20stories).
- Familiarity with existing Javascript testing frameworks like Jest and Playwright.

&nbsp;
&nbsp;

---
</br>

## What is Storybook

Storybook is a tool for UI development. It makes development faster and easier by isolating components. 

This allows you to work on one component at a time. You can develop entire UIs without needing to start up a complex dev stack, force certain data into your database, or navigate around your application.

Storybook helps you document components for reuse and automatically visually test your components to prevent bugs.

For more detail you can follow Storybooks [docs](https://storybook.js.org/docs/web-components/get-started/introduction)

</br>

>**Note**
>
> You can extend Storybook with an ecosystem of addons that help you do things like fine-tune responsive layouts or verify accessibility and simulate interaction tests. This has already been setup on this repository.
>
&nbsp;

---

</br>

## Definition of Done

All components have to fulfill the following criteria to meet the definition of done.

- Component(s) must be written in Typescript according to the [Component development standard](https://example.com).
- Component(s) requires a completed story written in Typescript that adheres to [Component Story Format 3](https://storybook.js.org/blog/component-story-format-3-0/#:~:text=For%20your%20convenience%2C%20there%27s%20a%20codemod%20to%20upgrade%20your%20stories).
- The story will need the relevant interaction tests to cover the following criteria.
    - Confirm the firing of event(s).
    - Confirm the non firing of event(s) based on a disabled state.
    - Confirm that elements exist if a component is in a specific state (error labels that appear under specific conditions).
    - Confirm that every permutation renders as expected.
- Ensure that all tests pass successfully for the component and meets at least 80% code coverage.
- All tests pass successfully when creating a pull request to the develop or main branches, this will automatically run as part of the "Repo name" repository Github action(s).

&nbsp;
&nbsp;

---
</br>

## Component files


**For the purposes of the examples we will use the Button component**

When developing a new component, or if you want to check the an existing components for reference pay attention to the following structure. 

All components will exist in the src folder with a folder name specific to the component(mention to the casing standard).

- Button.ts - Button component file. 
- Button.stories.ts - Story file for the Button component.
- index.ts - root index file used to export the specific component.
- README.md - The README file for the component (Generated when the pull request is merged).

&nbsp;

```
├── src
│   ├── button
│   │   ├── Button.stories.ts
│   │   ├── Button.ts
│   │   ├── index.ts
│   │   ├── README.md
│   ├── check
│   ├── code
│   ├── icon
├── dist 
├── node_modules
├── package.json
```
&nbsp;
&nbsp;

---

## Story file

&nbsp;

A story describes a component with a set of arguments that define how the component should render.

All stories are written in Component Story Format 3 for detail on the format familiarise yourself with the following [documentation](https://storybook.js.org/blog/component-story-format-3-0/#:~:text=For%20your%20convenience%2C%20there%27s%20a%20codemod%20to%20upgrade%20your%20stories).

The default export for a component story defines metadata about the component it will contain the following fields.

- title - The title metadata says where to place the story in the navigation hierachy.
- component - The component.
- argTypes -  Feature specifying the behavior of args.
- parameters - Static named metadata about the story used to control its behavior.

All named exports are objects this allows reuse of stories

---

## Default Export

This exports the metadata that controls how Storybook lists the stories and provides information to be used by the addons.

```js

import { Meta, StoryContext } from '@storybook/web-components'; //smport Storybook dependencies 
import { userEvent, within } from '@storybook/testing-library'; // Import dependencies for interaction testing
import { expect, jest } from '@storybook/jest'; // Import Jest dependencies 
import { loadCssPropertiesRemote } from '../utils/StoryUtils.js'; //Import required to load component specific css
import { Button, ButtonType, buttonType, slotPositionType, SlotPositionType } from './Button.js'; // Import Button component types
import './Button.js'; // Import Button component
import '../icon/Icon.js'; //Import Icon component used in Button icon permutations
import { ifNotEmpty } from '../utils/Directives.js';

 // The default export statement providing the information that will be used by addons. 	 
export default {
    title: 'UI Components/Button',
    component: 'omni-button',
    argTypes: {
        type: {
            control: 'radio',
            options: buttonType,
        },
        slotPosition: {
            control: 'radio',
            options: slotPositionType,
        },
    },
    parameters: {
        actions: {
            handles: ['value-change'],
        },
        cssprops: loadCssPropertiesRemote('omni-button'),
    },
} as Meta;
```
<br/>

---

</br>

## Args

Args is Storybooks mechanism for defining the arguments for a object which will be used to dynamically change the properties, styles and inputs. When the args value changes the component will re-render allowing you to interact with the UI. 

It reduces the boilerplate code you need to write for each permutation of the component.

</br>

```js

interface Args {
    type: ButtonType;
    label: string;
    slotPosition: SlotPositionType;
    disabled: boolean;
}

```

</br>

---

</br>

## ArgTypes

In the Story you can leverage the use of argTypes. This will specify the behavior of your args by specifying the type, you constrain the values that can be assigned that aren't explicitly set 

For this example we want to limit the options for the type property to be limited to the supported values **primary**, **secondary** and **clear**.

The button component has a type property that is of type string along with a slot

```js

export default {
    title: 'UI Components/Button',
    component: 'omni-button',
    argTypes: {
        // This will render a radio group with the Buttons type property options
        type: {
            control: 'radio',
            options: buttonType,
        },
        // This will render a radio group with the Button slot position property options
        slotPosition: {
            control: 'radio',
            options: slotPositionType,
        },
    }
} as Meta;

```

Consider adding a image or gif of the result here

</br>

---

</br>

## Story objects

All named exports are **objects**

The code snippet demonstrates how the we declare the the Interactive object the render function tells the story how to render this allows us to carry over all the annotations to subsequent exports 


```js

export const Interactive = {
    // render function that will map the Args to a html template to render.
    render: (args: Args) => html`
    <omni-button
        data-testid="test-button"
        type="${args.type}"
        label="${ifNotEmpty(args.label)}"
        slot-position="${args.slotPosition}"
        ?disabled=${args.disabled}>
        <omni-icon icon="@material/thumb_up"></omni-icon>
    </omni-button>
  `,
    name: 'Interactive',
    // args values that will be mapped
    args: {
        type: 'secondary',
        label: 'Button',
        slotPosition: 'top',
        disabled: false,
    }
    };
```
</br>

---

</br>

## Running Storybook

To run Storybook on your workstation locally open the Component repo in a VS code workspace navigate to the RUN AND DEBUG VS code extension.

You should see **Storybook Debug** listed click the play icon, this will compile the source code and run a local instance of Storybook that you can debug on your workstation.

A Storybook tab is opened in your default browser. 

- The component is listed under "UI Components/"component name"" 
- Docs page is documentation provided for the component aggregated onto a single page it includes
    - Component properties.
    - Component events.
    - CSS variables.
    - Theme variables.
    - Stories section listing all exported object in your story file.

</br>

---

## Adding Stories

Based on the Interactive object that was created earlier we can create more object exports for each Story we want to provide. This is to encapsulate the different rendered permutations the Button component has 

Below is examples of a Story to render the Primary permutation of the Button along with a Button permutation with a Label

```js

// export a Story to render the Button components Primary permutation
export const Type = {
    render: (args: Args) => html`
    <omni-button type="${args.type}" label="${args.label}" data-testid="test-button"></omni-button>
  `,
    name: 'Type',
    args: {
        type: 'primary',
        label: 'Click',
    }
};

// export a Story to render the Button component with a label set
export const Label = {
    render: (args: Args) => html`
    <omni-button label="${args.label}" data-testid="test-button"></omni-button>
  `,
    name: 'Label',
    args: {
        label: 'Click',
    }
};

```
</br>

---

</br>

## UI interaction testing 

</br>

Storybook testing is facilitated by the test runner which turns all stories into executable tests it is powered by Jest and Playwright.

For this section will give a brief example of writing a UI tests specifically focussing on user interaction.

The Button component has different stories exported per permutation rendered. We can add a play function to the export object to test specific UI cases.

The following cases will be covered

- Test if a UI component has a class applied
- Test if a UI component has events that fire or not depending on state
- Test if a UI component has content that only renders in specific permutations


>**Note**
>
>A **data-testid** attribute is added to the render template of the export objects we use this attribute to target the component.
>



### Class test

```js


// Type object Story with a play function to confirm if the Primary class exists on the component
export const Type = {
    render: (args: Args) => html`
    <omni-button type="${args.type}" label="${args.label}" data-testid="test-button"></omni-button>
  `,
    name: 'Type',
    args: {
        type: 'primary',
        label: 'Click',
    },
    play: async (context: StoryContext) => {
        const button = within(context.canvasElement).getByTestId<Button>('test-button');
        const buttonElement = button.shadowRoot.getElementById('button');
        const foundPrimaryClass = buttonElement.classList.contains('primary');
        await expect(foundPrimaryClass).toBeTruthy();
    },
};

```

For the purposes of minimizing code duplication we will only focus on the play function itself for the rest of the examples.

### Event test

```js
    // Play function testing that the click event was fired twice
    play: async (context: StoryContext) => {
        const button = within(context.canvasElement).getByTestId<Button>('test-button');
        const click = jest.fn();
        button.addEventListener('click', () => click());
        await userEvent.click(button);
        await userEvent.click(button);
        await expect(click).toBeCalledTimes(2);
    },
```

### Slotted content test

```js
    play: async (context: StoryContext) => {
        const button = within(context.canvasElement).getByTestId<Button>('test-button');
        const slotElement = button.shadowRoot.querySelector('slot');
        const foundSlottedOmniIconElement = slotElement
            .assignedElements()
            .find((e) => e.tagName.toLowerCase() === 'omni-icon');
        await expect(foundSlottedOmniIconElement).toBeTruthy();
    },
```

### Disabled test

```js
    play: async (context: StoryContext) => {
        const button = within(context.canvasElement).getByTestId<Button>('test-button'); // Test for disabled CSS.

        const buttonElement = button.shadowRoot.getElementById('button');
        const foundDisabledClass = buttonElement.classList.contains('disabled');
        await expect(foundDisabledClass).toBeTruthy(); // Test for not clickable.

        const click = jest.fn();
        button.addEventListener('click', () => click());
        await userEvent.click(button);
        await userEvent.click(button);
        await expect(click).toBeCalledTimes(0);
    },
```

## Checking the tests

To ensure that your interaction tests passed successfully you can use one of the 2 options. 

