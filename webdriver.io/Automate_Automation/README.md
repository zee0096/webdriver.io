# wdioTest
Page Objects-based GUI tests using the [Webdriver.io](http://webdriver.io) framework

## Getting started

Install the LTS version of [Node.js](https://nodejs.org)

Clone the repo, then inside the new wdio project folder, do `npm install` (you might need to `sudo` that command)

There will be some warnings, including the final one:

```
npm WARN install-kit-for-webdriverio-salesfloor@0.0.4 No repository field.
```

Don't worry about it, this is perfectly normal...

If running on Mac and you experience weird pauses and timeouts, you need to update your `/etc/hosts` file and add your `hostname` to the `127.0.0.1` and `::1` entries as shown below (see this [issue](https://github.com/SeleniumHQ/selenium/issues/2824)):

```
127.0.0.1 localhost YourHostNameHere.local
::1 localhost YourHostNameHere.local
```

## Running tests

Remember to set the retailer and environment first:

```
export NODE_ENV=bloom
export NODE_APP_INSTANCE=stg
```

The possible retailers names are: `Ann`, `BBBaby`, `Bix`, `Bloom`, `BRU`, `BTS`, `Elguntors`, `HBC`, `HR`, `Lord`, `NM`, `Peru`, `Saks`, `SW` and `TRU`.
The environments are `dev`, `int`, `prod`, `qa04` to `qa06` and `stg`.

To actually run something:

```
node_modules/.bin/wdio --suite [name(s)_of_suite(s)]
```

The available suites are:

- backoffice
- footer (footer suppression)
- salestracking
- shopping
- sidebar
- storefront

To run more than one suite, just separate them with a comma (with no added spaces):

```
wdio --suite shopping,sidebar,storefront
```

To run a single test (ideal when writing new stuff):

```
wdio --spec [full_path_and_filename_of_test_case]
```

The path and filename should look something like `test/sidebar/chat.spec.js`.

## Full documentation

See Confluence page below to get further documentation and all kind of other relevant information:

https://salesfloor.atlassian.net/wiki/spaces/QA/pages/63471620/Webdriver.io+Automated+GUI+Test+Suite

## To run automat client tests

export NODE_ENV=pcaskin
export NODE_APP_INSTANCE=stg

The possible retailer names are: `amika`, `evanyc`, `pcaskin`, `grooming`, `filorga`

Currently there is `stg` environment for all of the above clients.

first time after you clone the repo use `npm install`.

Consider this command to run pcaskin test:
npx wdio wdio.conf.automat.js -spec=./test/automat/banner_recommendations.spec.js.

Always provide SF_ARGS='{"timeout":200000}' while running the tests. You may increase the time limit here as it require more time specification in some cases.

pcaskin website is too slow, prefer SF_ARGS='{"timeout":500000}'.

Refer to this Confluence page for more information:

https://salesfloor.atlassian.net/wiki/spaces/MAES/pages/42304503813/QA+Testing+Strategy





