// .spec para reconhecer arquivos de testes

import { expect, test } from "@playwright/test";

test('all product names begin with "Sauce Labs"', async ({ page }) => {
    test.fail(); //inverte a lógica, o teste então tem que falhar
    await test.step('login', async () => {
        await page.goto('https://www.saucedemo.com/'); // goto para visitar a página
        await page.locator('[data-test="username"]').fill('standard_user'); //locator é objeto que representa um elemento, fill preencher um valor
        await page.locator('[data-test="password"]').fill('secret_sauce');
        await page.locator('[data-test="login-button"]').click(); // simulação um click
    })

    await test.step('product title verification', async () => {
        const titleListLocator = await page.locator('.inventory_item_name')
        const producttitleList = await titleListLocator.allTextContents() //array de todos os valores alocados nele
        
        for(const item of producttitleList) {
            await expect(item.slice(0,10)).toBe('Sauce Labs');
        }
    });
});
