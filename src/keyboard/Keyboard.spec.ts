import { test, expect, withCoverage } from '../utils/JestPlaywright.js';

test(`Keyboard - Visual and Behaviour`, async ({ page, isMobile }) => {
    await withCoverage(page, async () => {
        await page.goto('/components/keyboard/');

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

/*
    'enter' | 'go' | 'done' | 'next' | 'previous' | 'search' | 'send' 
*/
test(`Keyboard - Enter Key Hint Variations`, async ({ page }) => {
    await withCoverage(page, async () => {
        await page.goto('/components/keyboard/');

        const container = page.locator('.Enter_Key_Hint_Variations');
        const keyboard = page.locator('#keyboard-interactive');
        const keyboardArea = keyboard.locator('.footer').first();
        const keyboardOnly = keyboardArea.locator('.shadow');

        const firstTextInput = container.locator('omni-text-field').first();

        await firstTextInput.click();
        await expect(keyboardArea).toBeVisible();

        await expect(keyboardArea).toHaveScreenshot('keyboard-open-alpha-enter.png');
        await expect(keyboardOnly).toHaveScreenshot('keyboard-only-open-alpha-enter.png');

        // Click Enter
        await keyboardArea.getByRole('button', { name: 'Enter' }).click({
            force: true
        });

        await expect(keyboardArea).toHaveScreenshot('keyboard-open-number-enter.png');
        await expect(keyboardOnly).toHaveScreenshot('keyboard-only-open-number-enter.png');

        // Click Enter
        await keyboardArea.getByRole('button', { name: 'Enter' }).click({
            force: true
        });

        await expect(keyboardArea).toHaveScreenshot('keyboard-open-alpha-go.png');
        await expect(keyboardOnly).toHaveScreenshot('keyboard-only-open-alpha-go.png');

        // Click Enter
        await keyboardArea.locator('.action-button').click({
            force: true
        });

        await expect(keyboardArea).toHaveScreenshot('keyboard-open-number-go.png');
        await expect(keyboardOnly).toHaveScreenshot('keyboard-only-open-number-go.png');

        // Click Enter
        await keyboardArea.locator('.action-button').click({
            force: true
        });

        await expect(keyboardArea).toHaveScreenshot('keyboard-open-alpha-done.png');
        await expect(keyboardOnly).toHaveScreenshot('keyboard-only-open-alpha-done.png');

        // Click Enter
        await keyboardArea.locator('.action-button').click({
            force: true
        });

        await expect(keyboardArea).toHaveScreenshot('keyboard-open-number-done.png');
        await expect(keyboardOnly).toHaveScreenshot('keyboard-only-open-number-done.png');

        // Click Enter
        await keyboardArea.locator('.action-button').click({
            force: true
        });

        await expect(keyboardArea).toHaveScreenshot('keyboard-open-alpha-next.png');
        await expect(keyboardOnly).toHaveScreenshot('keyboard-only-open-alpha-next.png');

        // Click Enter
        await keyboardArea.locator('.action-button').click({
            force: true
        });

        await expect(keyboardArea).toHaveScreenshot('keyboard-open-number-next.png');
        await expect(keyboardOnly).toHaveScreenshot('keyboard-only-open-number-next.png');

        // Click Enter
        await keyboardArea.locator('.action-button').click({
            force: true
        });

        await expect(keyboardArea).toHaveScreenshot('keyboard-open-alpha-previous.png');
        await expect(keyboardOnly).toHaveScreenshot('keyboard-only-open-alpha-previous.png');

        // Explicitly focus element as pressing Enter would cause keyboard to focus previous tabIndex
        const previousNumberInput = container.locator('omni-number-field[enterkeyhint=previous]').first();
        await previousNumberInput.click();

        await expect(keyboardArea).toHaveScreenshot('keyboard-open-number-previous.png');
        await expect(keyboardOnly).toHaveScreenshot('keyboard-only-open-number-previous.png');

        // Explicitly focus element as pressing Enter would cause keyboard to focus previous tabIndex
        const searchInput = container.locator('omni-text-field[enterkeyhint=search]').first();
        await searchInput.click();

        await expect(keyboardArea).toHaveScreenshot('keyboard-open-alpha-search.png');
        await expect(keyboardOnly).toHaveScreenshot('keyboard-only-open-alpha-search.png');

        // Click Enter
        await keyboardArea.locator('.action-button').click({
            force: true
        });

        await expect(keyboardArea).toHaveScreenshot('keyboard-open-number-search.png');
        await expect(keyboardOnly).toHaveScreenshot('keyboard-only-open-number-search.png');

        // Click Enter
        await keyboardArea.locator('.action-button').click({
            force: true
        });

        await expect(keyboardArea).toHaveScreenshot('keyboard-open-alpha-send.png');
        await expect(keyboardOnly).toHaveScreenshot('keyboard-only-open-alpha-send.png');

        // Click Enter
        await keyboardArea.locator('.action-button').click({
            force: true
        });

        await expect(keyboardArea).toHaveScreenshot('keyboard-open-number-send.png');
        await expect(keyboardOnly).toHaveScreenshot('keyboard-only-open-number-send.png');
    });
});
