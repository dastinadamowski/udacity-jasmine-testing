/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
  /* This is our first test suite - a test suite just contains
   * a related set of tests. This suite is all about the RSS
   * feeds definitions, the allFeeds variable in our application.
   */
  describe('RSS Feeds', function() {
    /* This is our first test - it tests to make sure that the
     * allFeeds variable has been defined and that it is not
     * empty. Experiment with this before you get started on
     * the rest of this project. What happens when you change
     * allFeeds in app.js to be an empty array and refresh the
     * page?
     */
    it('are defined', function() {
      expect(allFeeds).toBeDefined();
      expect(allFeeds.length).not.toBe(0);
    });


    /* Write a test that loops through each feed
     * in the allFeeds object and ensures it has a URL defined
     * and that the URL is not empty.
     */
    function checkValidUrl(feed) {
      it('has URL defined && URL !== empty', function() { // test defined
        expect(feed.url).toBeDefined(); // checks if an 'url' key is defined
        expect(feed.url).toMatch(/^http(s?)\:\/\//); // checks if allFeeds object's url elements contain http or https
        expect(feed.url.length).not.toBeLessThan(9); // checks if an URL stores more than just http:// or https://
      });
    };
    for (var i = 0; i < allFeeds.length; i++) { // loops through each feed
      checkValidUrl(allFeeds[i]); // function checkValidUrl to detect invalid URLs
    };


    /* Write a test that loops through each feed
     * in the allFeeds object and ensures it has a name defined
     * and that the name is not empty.
     */
    it('has a name defined', function() { // test defined
      for (var i = 0; i < allFeeds.length; i++) { // loops through each feed
        expect(allFeeds[i].name).toBeDefined(); // checks if a 'name' key is defined
        expect(allFeeds[i].name.length).not.toBe(0); // checks if the name is not empty
      }
    })
  });


  /* Write a new test suite named "The menu" */
  describe('The menu', function() {

    /* Write a test that ensures the menu element is
     * hidden by default. You'll have to analyze the HTML and
     * the CSS to determine how we're performing the
     * hiding/showing of the menu element.
     */
    it('is hidden by default', function() { // When the menu icon is clicked on, a class is toggled on the body to perform the hiding/showing of the menu
      expect($("body").hasClass('menu-hidden')).toBe(true); // checks if the class 'menu-hidden' is set as a default
    });

    /* Write a test that ensures the menu changes
     * visibility when the menu icon is clicked. This test
     * should have two expectations: does the menu display when
     * clicked and does it hide when clicked again.
     */
    it('changes visibility when the menu icon is clicked', function() {
      $(".menu-icon-link").trigger('click'); // When the menu icon is clicked, assigned by default class 'menu-hidden' should be removed
      expect($("body").hasClass('menu-hidden')).toBe(false); // Checks whether the class 'menu-hidden' is removed when menu icon cliked

      $(".menu-icon-link").trigger('click'); // When the menu icon is clicked again, assigned by default class 'menu-hidden' should be restored
      expect($("body").hasClass('menu-hidden')).toBe(true); // Checks whether the class 'menu-hidden' is applied when menu icon cliked again to restore the default setting
    });
  });

  /* Write a new test suite named "Initial Entries" */
  describe('Initial Entries', function() {

    /* Write a test that ensures when the loadFeed
     * function is called and completes its work, there is at least
     * a single .entry element within the .feed container.
     * Remember, loadFeed() is asynchronous so this test will require
     * the use of Jasmine's beforeEach and asynchronous done() function.
     */
    beforeEach(function(done) {
      loadFeed(0, done);
    });

    it('have at least a single .entry element within the .feed container', function() {
      expect($('.feed .entry').length).not.toBe(0); // Checks whether there is anything stored within the .feed container
    });
  });

  /* Write a new test suite named "New Feed Selection" */
  describe('New Feed Selection', function() {
    let previousFeed;
    /* Write a test that ensures when a new feed is loaded
     * by the loadFeed function that the content actually changes.
     * Remember, loadFeed() is asynchronous.
     */
    beforeEach(function(done) {
      loadFeed(0, function() {
        previousFeed = $('.feed').html(); // Stores the previous (old) feed
        loadFeed(1, done); // Loads a new feed
      });
    });

    it('is different than the previous one', function() {
      expect($('.feed').html()).not.toBe(previousFeed); // Checks if the new feed can actually be considered as "a new one"
    });
  });
}());
