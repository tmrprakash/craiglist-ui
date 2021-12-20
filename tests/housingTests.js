import * as envConfig from "../resources/envConfig";
import homePage from '../page-object/homePage.js';
import housingPage from '../page-object/housingPage.js';


fixture('Housing')
    .page(envConfig.getEnvironmentURL())

test(`verify default sorting options`, async t => {
    await homePage.navigateToHousing();
    await housingPage.verifyDefaultSortingOptions();
});

test(`verify ascending sorting`, async t => {
    await homePage.navigateToHousing();
    await housingPage.verifyDefaultSortingOptions();
    await housingPage.ascSortVerification(true);
});

test(`verify descending sorting`, async t => {
    await homePage.navigateToHousing();
    await housingPage.verifyDefaultSortingOptions();
    await housingPage.ascSortVerification(false);
});

test(`verify sorting options after search`, async t => {
    await homePage.navigateToHousing();
    await housingPage.verifyDefaultSortingOptions();
    await housingPage.searchForKeyword('comfortable');
    await housingPage.verifySortingOptionsAfterSearch();
});
