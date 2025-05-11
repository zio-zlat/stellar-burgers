/// <reference types="cypress" />
import { TIngredient } from '../../src/utils/types';

describe('тест страницы конструктора бургера', () => {
  describe('добавление ингредиента из списка в конструктор', () => {
    beforeEach(() => {
      cy.ingredients();
    });
    it('добавление булок', () => {
      cy.get('[data-testid=burger_bun-top]').should('not.exist');
      cy.get('[data-testid=burger_bun-bottom]').should('not.exist');

      cy.get('[data-testid=ingredient_bun] button').first().click();

      //проверка корректного добавления булок
      (
        cy.get('@ingredientData') as unknown as Cypress.Chainable<TIngredient[]>
      ).then((ingredients) => {
        const bun = ingredients[0];

        //верхняя булка
        cy.get('[data-testid=burger_bun-top] .constructor-element__image')
          .should('have.attr', 'src')
          .and('include', bun.image);
        cy.get(
          '[data-testid=burger_bun-top] .constructor-element__text'
        ).should('have.text', `${bun.name} (верх)`);
        cy.get(
          '[data-testid=burger_bun-top] .constructor-element__price'
        ).should('have.text', bun.price);

        //нижняя булка
        cy.get('[data-testid=burger_bun-bottom] .constructor-element__image')
          .should('have.attr', 'src')
          .and('include', bun.image);
        cy.get(
          '[data-testid=burger_bun-bottom] .constructor-element__text'
        ).should('have.text', `${bun.name} (низ)`);
        cy.get(
          '[data-testid=burger_bun-bottom] .constructor-element__price'
        ).should('have.text', bun.price);
      });

      cy.get('[data-testid=burger_main]').should('not.exist');
      cy.get('[data-testid=burger_sauce]').should('not.exist');
    });

    it('добавление начинок', () => {
      cy.get('[data-testid=burger_main]').should('not.exist');
      cy.get('[data-testid=burger_sauce]').should('not.exist');

      cy.get('[data-testid=ingredient_main] button').first().click();
      cy.get('[data-testid=ingredient_sauce] button').first().click();

      //проверка корректного добавления начинки и соуса
      (
        cy.get('@ingredientData') as unknown as Cypress.Chainable<TIngredient[]>
      ).then((ingredients) => {
        const main = ingredients[1];
        const sauce = ingredients[2];

        //начинка
        cy.get('[data-testid=burger_main] .constructor-element__image')
          .should('have.attr', 'src')
          .and('include', main.image);
        cy.get('[data-testid=burger_main] .constructor-element__text').should(
          'have.text',
          main.name
        );
        cy.get('[data-testid=burger_main] .constructor-element__price').should(
          'have.text',
          main.price
        );

        //соус
        cy.get('[data-testid=burger_sauce] .constructor-element__image')
          .should('have.attr', 'src')
          .and('include', sauce.image);
        cy.get('[data-testid=burger_sauce] .constructor-element__text').should(
          'have.text',
          sauce.name
        );
        cy.get('[data-testid=burger_sauce] .constructor-element__price').should(
          'have.text',
          sauce.price
        );
      });

      cy.get('[data-testid=burger_bun-top]').should('not.exist');
      cy.get('[data-testid=burger_bun-bottom]').should('not.exist');
    });
  });

  describe('работа модальных окон', () => {
    beforeEach(() => {
      cy.ingredients();

      cy.get('[data-testid=ingredient_link]').first().as('ingredient_link');
    });

    it('открытие модального окна ингредиента', () => {
      cy.get('[data-testid=modal]').should('not.exist');

      cy.get('@ingredient_link').click();

      //проверка открытия модального окна с верным ингредиентом (булкой)
      cy.get('[data-testid=modal]').should('exist');
      cy.get('[data-testid=header_modal]').should(
        'have.text',
        'Детали ингредиента'
      );
      (
        cy.get('@ingredientData') as unknown as Cypress.Chainable<TIngredient[]>
      ).then((ingredients) => {
        const bun = ingredients[0];
        cy.get('[data-testid=ingredient_image_large]')
          .should('have.attr', 'src')
          .and('include', bun.image_large);
        cy.get('[data-testid=ingredient_name]').should('have.text', bun.name);
        cy.get('[data-testid=ingredient_calories]').should(
          'have.text',
          bun.calories
        );
        cy.get('[data-testid=ingredient_proteins]').should(
          'have.text',
          bun.proteins
        );
        cy.get('[data-testid=ingredient_fat]').should('have.text', bun.fat);
        cy.get('[data-testid=ingredient_carbohydrates]').should(
          'have.text',
          bun.carbohydrates
        );
      });
    });

    it('закрытие модального окна с ингредиентом по клику на крестик', () => {
      cy.get('@ingredient_link').click();

      cy.get('[data-testid=close_modal]').click();

      cy.get('[data-testid=modal]').should('not.exist');
    });

    it('закрытие модального окна с ингредиентом по клику на оверлей ', () => {
      cy.get('@ingredient_link').click();

      cy.get('body').click(0, 0);
      cy.get('[data-testid=modal]').should('not.exist');
    });
  });

  describe('создание заказа', () => {
    beforeEach(() => {
      cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients' });
      cy.intercept('GET', 'api/auth/user', { fixture: 'user' });
      cy.setCookie('accessToken', 'test-token');

      cy.visit('/');
    });

    afterEach(() => {
      cy.clearCookie('accessToken');
    });

    it('выполнение всех действий', () => {
      cy.get('[data-testid=ingredient_bun] button').first().click();
      cy.get('[data-testid=ingredient_main] button').first().click();
      cy.get('[data-testid=ingredient_sauce] button').first().click();

      cy.fixture('order.json').then((mockOrder) => {
        cy.fixture('answerOrder.json').then((mockAnswerOrder) => {
          cy.intercept('POST', 'orders', (req) => {
            req.reply({
              body: mockAnswerOrder
            });
          }).as('order');

          //модалка не открыта
          cy.get('[data-testid=modal]').should('not.exist');

          cy.get('[data-testid=order] button').click();
          cy.wait('@order').then((data) => {
            //проверка токена
            expect(data.request?.headers.authorization).to.eq('test-token');

            //запрос на создание заказа был выполнен по верным id
            expect(data.request.body.ingredients).to.deep.equal(
              mockOrder.ingredients
            );

            //ответ на запрос содержит список тех же id ингредиентов, что в запросе
            const listIdOrder = data.response?.body.order.ingredients.map(
              (item: TIngredient) => item._id
            );
            expect(listIdOrder).to.deep.equal(mockOrder.ingredients);

            //модалка открылась и номер заказа верный
            cy.get('[data-testid=modal]').should('exist');
            cy.get('[data-testid=order_number]').should(
              'have.text',
              data.response?.body.order.number
            );

            //закрытие модалки и проверка ее закрытия
            cy.get('[data-testid=close_modal]').click();
            cy.get('[data-testid=modal]').should('not.exist');

            //проверка удаления ингредиентов
            cy.get('[data-testid=burger_bun-top]').should('not.exist');
            cy.get('[data-testid=burger_main]').should('not.exist');
            cy.get('[data-testid=burger_sauce]').should('not.exist');
            cy.get('[data-testid=burger_bun-bottom]').should('not.exist');
          });
        });
      });
    });
  });
});
