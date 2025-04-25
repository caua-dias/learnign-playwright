// .spec para reconhecer arquivos de testes

import { expect, test } from "@playwright/test";
test.describe('Login tests', async () => {
    test('the user login with sucess', async ({ page }) => {
        await page.goto('https://www.saucedemo.com/'); // goto para visitar a página
        await expect(await page.title()).toBe('Swag Labs'); // expect serve para vericar algo do site
    
        // uma forma de localizar é passar o elemento css 
        await page.locator('[data-test="username"]').fill('standard_user'); //locator é objeto que representa um elemento, fill preencher um valor
        await page.locator('[data-test="password"]').fill('secret_sauce');
        
        await page.locator('[data-test="login-button"]').click(); // simulação um click
        await expect(await page.url()).toBe('https://www.saucedemo.com/inventory.html')//url pega o endereço que está no momento
    
        const productTitle = await page.locator('.header_secondary_container > span').textContent();
        await expect(productTitle).toBe('Products'); //verifica se meu productTitle tem o texto correspondente "Products"
    
        // const productTitle = await page.locator('.header_secondary_container > span');
        // await expect(productTitle).toHaveText('Products'); //verifica se meu productTitle tem o texto correspondente "Products"
    });
    
    test('the user inserts wrong credentials', async ({ page }) => {
        await page.goto('https://www.saucedemo.com/'); // goto para visitar a página
    
        await page.locator('[data-test="username"]').fill('standard_user'); //locator é objeto que representa um elemento, fill preencher um valor
        await page.locator('[data-test="password"]').fill('incorect_password');
        
        await page.locator('[data-test="login-button"]').click(); // simulação um click
        
        /* Nessa outra forma o getByText vai buscar o mesmo texto que for passado
        Não utilizar em texto que possam aparecer mais de uma vez
        */
        const errorText = await page.getByText('Epic sadface: Username and password do not match any user in this service')
        await expect(errorText).toBeVisible(); //verifica se é visível 
    })
})

