# Nobind example skeleton

This is an example skeleton for a C++ project that uses Nobind using the traditional `node-gyp` build system.

It includes some non-trivial examples such as C buffers, vectors of objects and maps.

# Try building yourself

## Build the project

```shell
git clone https://github.com/mmomtchev/nobind-example-project.git
cd nobind-example-project
npm install
```

Run the unit tests:
```shell
# Run all unit tests
npm test
```

# Code instrumentation

Build with:

```shell
npm install
npx node-gyp configure build --debug
```
