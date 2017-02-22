# Redmine Time Tracker

Your best friend if your are destined to log your hours into Redmine. Or would
be if sufficient time would have been spent making things work as planned.

Features:

* Track time for Redmine issues.
* Local storage for records.
* Edit records.
* Edit running records.
* Upload time records to Redmine time tracking.

As expected most of the features are either absent or not functional.

## Redmine requirements

* Redmine API has to be enabled.
* User needs to have an API token.

## Toolchain

Required tools

* Android Sdk
* `node`
* `npm`

## Getting started

First start packager:

```
npm install # Install dependencies
npm start # Start packager, needs to be running on background
```

After the packager is runnig the application can be launched on device or
emulator. For Android the command is somewhat comical:

```
npm run run
```

Reading logs from Android:

```
npm run log
```

## "Architecture"

There was a novel aim to build a clean React + Redux application with loose
actor concept and multi-source repository-like DAO layer.

* Views are mainly stateless components. If state is used, it is used to handle
  layout, etc.
* Actors receive every action and can dispatch new actions.
* DAO wraps Redmine API and local Realm db behind single interface.

### Async operations

Async operations are handled by actors as request-response pairs. Actors
isolate the nice and reactive state tracking from the potentially convoluted
async I/O operations. For example, a login operation would start with a
`login-request` action:

```
{ type: 'login-request', username: 'user', password: 'pass' }
```

Actor will receive this request, perform the async HTTP call and respond by
dispatching a new action:

```
{ type: 'login-response', success: true, apiToken: 'asdf' }
```

The actions most likely do not match anything used in the source code but
convey the idea sufficiently.


## Contributing

PRs are welcome. Test suite is missing completely but PR has to pass linters
before it is merged. Linters are run with:

```
npm run lint
```
