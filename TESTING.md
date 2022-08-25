# Omni-Component Testing

This guide will take you through the process of creating a story for your UI component, it will cover the writing of exports for the different permutations of a component along with some basic interaction tests.
<br/>
<br/>

---

## Prerequisites 

### Workstation

- Visual Code
- Typescript
- Node

### Storybook 

- Component story format
- Familiarity with existing Javascript testing frameworks like Jest and Playwright.
<br/>
<br/>
---
## Definition of Done

All components have to fulfill the following criteria to meet the definition of done.

- Component(s) must be written in Typescript according to the Component development standard.
- Component(s) requires a completed story written in Typescript with examples for every permutation.
- The story will need the relevant interaction tests to cover the following criteria.
    - Confirm the firing of event(s).
    - Confirm the non firing of event(s) based on a disabled state.
    - Confirm that elements exist if a component is in a specific state (error labels that appear under specific conditions).
    - Confirm that every permutation renders as expected.
- Ensure that all tests pass successfully for the component and meets at least 80% code coverage.
- All tests pass successfully when creating a pull request to the develop or main branches, this will automatically run as part of the "Repo name" repository Github action(s).
<br/>
<br/>
---

## Component files

**For the purposes of the examples we will use the Button component**

When developing a new "Omni-component" web component, or if you want to check the structure of an existing components files pay attention to the following. 

All components will exist in the src folder with a folder name specific to the component.

- Button.ts - Button component file. 
- Button.stories.ts - Story file for the Button component.
- index.ts - root index file used to export the specific component.
- README.md - The README file for the component (Generated when the pull request is merged).
<br/><br/>
---

## Understanding the structure of the components story file

This example will be a basic guide on how to write a story file for a component. A story describes a component with a set of arguments that define how the component should render.

All stories are written in Component Story Format(CSF) for detail on the format familiarise yourself with the following [documentation](https://storybook.js.org/docs/react/api/csf).

- All stories consist of a default export.
- One or more named exports **(It is advised that one is made permutation)**.

The default export for a component story defines metadata about the component it will contain the following fields.

- title - The path to the component story.
- component - The component.
- argTypes -  Feature specifying the behavior of args.
- parameters - Static named metadata about the story used to control its behavior.

---

## Default Export

This exports the metadata that controls how Storybook lists the stories and provides information to be used by the addons.

```js

import { html, TemplateResult } from 'lit'; // Import required dependencies from lit.  
import { Story, Meta, WebComponentsFramework } from '@storybook/web-components'; // Import the required Story dependencies.
import { expect, jest } from '@storybook/jest'; // Import dependencies that will allow us to leverage Jest functionality.
import { within, userEvent } from '@storybook/testing-library';	// Import dependencies for user interaction testing.
import { loadCssPropertiesRemote } from '../utils/StoryUtils'; // Import the required to load the component specific css.

import './Button.js'; // Import the component you are writing this story for in this case the Button component.

 // The default export statement providing the information that will be used by addons. 	 
export default {																										
    title: 'UI Components/Button',																			
    component: "omni-button",																				
    argTypes: { 																							
      type: { control: { type: 'select', options: ['primary', 'secondary', 'clear'] } }
    },
    parameters: {																							
      cssprops: loadCssPropertiesRemote("omni-button"),														
      actions: {
         handles: ['click']																		 			
       },     
	}
  } as Meta;
```
<br/>

---

</br>

## Using args in a Story

Args is Storybooks mechanism for defining the arguments for a object which will be used to dynamically change the properties, styles and inputs. When the args value changes the component will re-render allowing you to interact with the UI. 

It reduces the boilerplate code you need to write for each permutation of the component.

</br>

---
</br>

## Template

For the purposes of rendering the different permutations of a component we create a template which is used to state how the args of the component should be mapped. We bind to this Template for each export permutation of the component

The code snippet demonstrates how the we declare the Template in the story and have the different export permutations bind to it.

```js
// The template that all story examples will bind to.
const Template: Story<ArgTypes> = (args: ArgTypes) => html`
    <omni-button 
        data-testid='test-button'
        label="${args.label}"
		type="${args.type}"
    >
    </omni-button>
`;

// The Primary permutation of the button component.
export const Default = Template.bind({});
Default.storyName = 'Default';
Default.args = {
    label: 'Primary',
	type: 'Secondary'
};

// The Secondary permutation of the button component.
export const Secondary = Template.bind({});
Secondary.storyName = 'Secondary';
Secondary.args = {
    label: 'Secondary',
    type: 'Secondary'
};
```
</br>

---

</br>

## Using ArgTypes

In the Story you can levarage the user of argTypes. This will specify the behaviour of your args by specifying the type, you constrain the values that can be assigned that arent explicitly set 

For this example we want to limit the options for the type property to be limited to the supported values **primary**, **secondary** and **clear**.

The button component has a type property that is of type string

```js

export default {
    title: 'UI Components/Button',
    component: 'omni-button ',
    argTypes: {
        // Adds a select control to set the 'type' property of the Button component allows more fine grained control 
        type: { control: { type: 'select', options: ['primary', 'secondary', 'clear'] } }      
	},
    parameters: {
        actions: {
            handles: ['click']
        },
        cssprops: loadCssPropertiesRemote('omni-button')
    }
} as Meta;

```

Consider adding a image or gif of the result here

</br>

---

</br>

## Running Storybook on your workstation

To run Storybook on your workstation locally click **F5** this will compile the source code and run a local instance of Storybook that you can debug on your workstation.

Based on the steps above you will see the following when the Storybook tab is opened in your default browser.

- The component is listed under "UI Components/"component name"" 
- Docs page is documentation provided for the component aggregated onto a single page it includes
    - Component properties.
    - Component events.
    - CSS variables.
    - Theme variables.
    - Stories section listing all exports.

</br>

---

</br>

## Writing Play function tests for the component 

</br>

Storybook testing is facilitated by the test runner which turns all stories into executable tests it is powered by Jest and Playwright.This section will give a brief example of writing a UI tests specifically focussing on user interaction tests.

A Play function to click the button component and confirm that the event is fired a specified amount of times will be added. For this example we will add a play function to the Default story of the button component note as part of the Template we added a **data-testid** attribute this will be used to we can target the component.


```js

// Template used by all stories of the component pay attention to the data-test-id attribute this will be used in the Play function below
const Template: Story<ArgTypes> = (args: ArgTypes) => html`
    <omni-button 
	  data-testid attribute this will be used to we can assign the component to a variable
        data-testid="test-button" 
        label="${args.label}" 
		type="${args.type}"
    >
    </omni-button>
`;

// Default story for the Button component
Default.storyName = 'Default';
Default.args = {
    label: 'Primary',
    type: 'primary'
	disabled: false
};

// Disabled story for the Button component
Disabled.storyName = 'Disabled';
Default.args = {
    label: 'Primary',
    type: 'primary'
	disabled: false
};

//Play function for Default story of the Button component to test the click event
Default.play = async (context) => {
  //assign the canvas to a variable
  const canvas = within(context.canvasElement);

  //assign the Button component to the Button variable 
  const Button = canvas.getByTestId(`test-button`);

  //Create a mock which will be used to assert if the test passed
  const click = jest.fn();
  Button.addEventListener('click',() => click());


  //Simulate a click 
  await userEvent.click(Button);
  //Simulate the press of the Enter key 
  await userEvent.type(Button,'[Enter]');
  // Assertion to confirm that the click event was called 2 times.
  await expect(click).toBeCalledTimes(2);
};


//Play function for Disabled story of the Button component to test the click event in this case we dont expect the click event to be called
Disabled.play = async (context) => {
  //assign the canvas to a variable
  const canvas = within(context.canvasElement);

  //assign the Button component to the Button variable 
  const Button = canvas.getByTestId(`test-button`);

  //Create a mock which will be used to assert if the test passed
  const click = jest.fn();
  Button.addEventListener('click',() => click());


  //Simulate a click 
  await userEvent.click(Button);
  // Assertion to confirm that the click event was called 0 times.
  await expect(click).toBeCalledTimes(0);
};

```

## Checking the interaction tests in Storybook

To ensure that your interaction tests passed successfully you can use one of the 2 options. 

