import { Selector, t } from 'testcafe'

class HousingPage {

    constructor() {
        this.date = Selector('a').withAttribute('data-selection', /date/);
        this.asc = Selector('a').withAttribute('data-selection', /priceasc/);
        this.desc = Selector('a').withAttribute('data-selection', /pricedsc/);
        this.rel = Selector('a').withAttribute('data-selection', /rel/);
        this.upcoming = Selector('a').withAttribute('data-selection', /upcoming/);
        this.date = Selector('a').withAttribute('data-selection', /date/);
        this.searchButton = Selector('.searchbtn')
        this.query = Selector("input[id='query']")
        this.searchResultList = Selector('#search-results')
        this.houseListCount = Selector('.totalcount')
    }

    async ascOrDescSortVerification(isAscending) {
        if (isAscending)
            await t.click(this.asc)
                .expect(this.houseListCount.exists).ok("No house exist to sort");
        else
            await t.click(this.desc)
                .expect(this.houseListCount.exists).ok("No house exist to sort");
        const childrenElementCount = Number(await this.houseListCount.textContent);
        await t.expect(childrenElementCount).gt(1,"Required atleast two houses to sort");
        for (let i = 0; i < childrenElementCount - 1; i++) {
            let currentHouse = Number((await this.searchResultList.child('li').nth(i).child('a').child('.result-price').textContent).slice(1))
            let nextHouse = Number((await this.searchResultList.child('li').nth(i + 1).child('a').child('.result-price').textContent).slice(1))
            if (isAscending) {
                await t.expect(currentHouse).lte(nextHouse);
            }
            else {
                await t.expect(currentHouse).gte(nextHouse);
            }
        }
    }

    async typeSearchText(queryString) {
        await t.click(this.query)
            .typeText(this.query, queryString)
            .click(this.searchButton)
    }
    async verifySortingOptionsAfterSearch() {
        await t
            .click(this.rel)
            .expect(this.upcoming.exists).ok()
            .expect(this.date.exists).ok()
    }
    async verifyDefaultSortingOptions() {
        await t
            .click(this.date)
            .expect(this.asc.exists).ok()
            .expect(this.desc.exists).ok()
    }

}
export default new HousingPage()
