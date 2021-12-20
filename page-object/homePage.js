import { Selector, t } from 'testcafe'

class HomePage {
    constructor() {
        this.housingLink = Selector('a').withAttribute('href', /apartments-housing-for-rent/);
    }

    async navigateToHousing() {
        await t
            .click(this.housingLink);
    }
}
export default new HomePage()

