const assert = require('assert');
const path = require('path');

const Application = require('spectron').Application;
const electronPath = require('electron');

// Test group.
describe('Basic tests', () => {

    //* -- Setup

    jest.setTimeout(10000);

    const app = new Application({
        path: electronPath,
        args: [path.join(__dirname, '..')],
        startTimeout: 20000,
    });

    // Called before every test.
    beforeEach(() => {
        return app.start();
    });

    // Called after every test.
    afterEach(() => {
        if (app && app.isRunning())
            return app.stop();
    });

    // Called after all tests are finished.
    afterAll(() => {
        return afterEach();
    });

    //* -- Tests

    it('The app is functionnal', () => {
        return assert.notEqual(app, undefined);
    });

    it('The app shows an initial window', async () => {

        return app.client.getWindowCount().then((count) => {
          assert.equal(count, 1);
        })
        .catch(() => {
            assert.fail("Failed to get the window count.");
        })
    });

    it('Test HTML content', async () => {

        const text = await app.client.getText("body");

        return assert.equal(text, 'Hello person, welcome to this place.');
    });
});