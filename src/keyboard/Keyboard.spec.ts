import * as jestMock from 'jest-mock';
import { test, expect, withCoverage, expectJest } from '../utils/JestPlaywright.js';
/*import {
    type Keyboard,
    type EnterKeyHint,
    type InputEventInitWithType,
    type InputEventTypes,
    type InputMode,
    type KeyboardInit,
    type KeyboardMode,
    attachAttribute,
    explicitKeyboardMode,
    hiddenAttribute,
    maskAttribute,
    multiLineAttribute,
    noDisplayValueAttribute
} from './Keyboard.js';*/

// keyboard-script-generated
test(`Keyboard - Visual and Behaviour`, async ({ page, isMobile }) => {
    await withCoverage(page, async () => {
        await page.goto('/components/keyboard/');

        const args = await page.locator('story-renderer[key=Interactive]').evaluate((storyRenderer) => (storyRenderer as any).story.args);
        const container = page.locator('.Interactive');
        const keyboard = container.locator('#keyboard-interactive');
        const keyboardArea = keyboard.locator('.footer').first();

        const textInput = container.locator('omni-text-field');
        const currencyInput = container.locator('omni-currency-field');

        await expect(page).toHaveScreenshot('keyboard-page-initial.png');
        await expect(keyboardArea).not.toBeVisible();

        await textInput.click();
        await expect(keyboardArea).toBeVisible();
        await expect(keyboardArea).toHaveScreenshot('keyboard-open.png');
        await expect(page).toHaveScreenshot('keyboard-page-open.png');

        // Click 1
        await keyboardArea.getByRole('button', { name: '1' }).click({
            force: true
        });
        // Click Backspace
        await keyboardArea.locator('div:nth-child(4) > omni-keyboard-button:nth-child(8) > .button').first().click({
            force: true
        });
        // Click f twice
        await keyboardArea.getByRole('button', { name: 'f' }).click({
            force: true
        });
        await keyboardArea.getByRole('button', { name: 'f' }).click({
            force: true
        });
        // Click Space
        await keyboardArea.getByRole('button', { name: 'Space' }).click({
            force: true
        });
        // Click Backspace
        await keyboardArea.locator('div:nth-child(4) > omni-keyboard-button:nth-child(8) > .button').first().click({
            force: true
        });
        // Click Space
        await keyboardArea.getByRole('button', { name: 'Space' }).click({
            force: true
        });
        // Click Caps Lock
        await keyboardArea
            .getByText('1 2 3 4 5 6 7 8 9 0 q w e r t y u i o p a s d f g h j k l z x c v b n m . @ !#$ ')
            .locator('.fill-space > .button')
            .first()
            .click({
                force: true
            });
        // Click H (capital)
        await keyboardArea.getByRole('button', { name: 'H', exact: true }).click({
            force: true
        });
        // Click Enter
        await keyboardArea.getByRole('button', { name: 'Enter' }).click({
            force: true
        });

        await expect(currencyInput).toBeFocused();

        await expect(textInput.locator('input')).toHaveValue('ff H');

        // Only check screenshot of the omni-text-field if on desktop. It is covered by the keyboard in mobile mode.
        if (!isMobile) {
            await expect(textInput).toHaveScreenshot('keyboard-interacted-text-field.png');
        }

        await expect(keyboardArea).toHaveScreenshot('keyboard-open-number.png');
        await expect(page).toHaveScreenshot('keyboard-page-interacted-text-field.png');

        await keyboardArea.getByRole('button', { name: '5' }).click({
            force: true
        });
        await keyboardArea
            .locator('omni-label')
            .filter({ hasText: /^Close$/ })
            .click({
                force: true
            });

        await expect(currencyInput.locator('input')).toHaveValue('0.05');
        await expect(currencyInput).toHaveScreenshot('keyboard-interacted-number-field.png');
        await expect(keyboardArea).not.toBeVisible();
        await expect(page).toHaveScreenshot('keyboard-page-interacted-number-field.png');
    });
});
