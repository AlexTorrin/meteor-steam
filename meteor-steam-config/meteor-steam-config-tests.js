// Import Tinytest from the tinytest Meteor package.
import { Tinytest } from "meteor/tinytest";

// Import and rename a variable exported by meteor-steam-config.js.
import { name as packageName } from "meteor/alextorrin:meteor-steam-config";

// Write your tests here!
// Here is an example.
Tinytest.add('meteor-steam-config - example', function (test) {
  test.equal(packageName, "meteor-steam-config");
});
