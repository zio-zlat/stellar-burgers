import './commands'

declare global {
    namespace Cypress{
        interface Chainable {
            ingredients(): void
        }
    }
}