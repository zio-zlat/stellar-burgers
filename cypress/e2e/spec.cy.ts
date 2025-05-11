/// <reference types="cypress" />
import {TIngredient} from '../../src/utils/types'

describe('тест страницы конструктора бургера', () => {
  describe('добавление ингредиента из списка в конструктор', () => {
    beforeEach(() => {
      cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients' });

      cy.visit('http://localhost:4000/');
    });
    it('добавление булок', () => {
      cy.get('[data-testid=ingredient_bun] button').first().click();

      cy.get('[data-testid=burger_bun-top] .constructor-element__text').should(
        'have.text',
        'Краторная булка N-200i (верх)'
      );
      cy.get(
        '[data-testid=burger_bun-bottom] .constructor-element__text'
      ).should('have.text', 'Краторная булка N-200i (низ)');

      cy.get('[data-testid=burger_main]').should('not.exist');
      cy.get('[data-testid=burger_sauce]').should('not.exist');
    });

    it('добавление начинок', () => {
      cy.get('[data-testid=ingredient_main] button').first().click();
      cy.get('[data-testid=ingredient_sauce] button').first().click();

      cy.get('[data-testid=burger_main] .constructor-element__text').should(
        'have.text',
        'Биокотлета из марсианской Магнолии'
      );
      cy.get('[data-testid=burger_sauce] .constructor-element__text').should(
        'have.text',
        'Соус фирменный Space Sauce'
      );

      cy.get('[data-testid=burger_bun-top]').should('not.exist');
      cy.get('[data-testid=burger_bun-bottom]').should('not.exist');
    });
  });

  describe('работа модальных окон', () => {
    beforeEach(() => {
      cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients' });

      cy.visit('http://localhost:4000/');

      cy.get('[data-testid=ingredient_link]').first().as('ingredient_link');
    });

    it('открытие модального окна ингредиента', () => {
      cy.get('@ingredient_link').click();

      cy.get('[data-testid=modal]').should('exist');
      cy.get('[data-testid=header_modal]').should(
        'have.text',
        'Детали ингредиента'
      );
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

      cy.visit('http://localhost:4000/');
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

          cy.get('[data-testid=order] button').click();
          cy.wait('@order').then((data) => {
            //проверка токена
            expect(data.request?.headers.authorization).to.eq('test-token');
            cy.clearCookie('accessToken')

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
            cy.get('[data-testid=order_number]').should('have.text', '100');

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
