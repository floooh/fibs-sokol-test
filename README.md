# fibs-sokol-test

A small Fibs demo using the sokol headers, sokol-shdc for shader compilation and
the STB headers.

## Clone, Build and Run

First, install Deno: https://docs.deno.com/runtime/manual/getting_started/installation.

You'll also need cmake in the path, and a platform-specific build environment
(MSVC on Windows, Clang on macOS, GCC or Clang on Windows).

Git clone and cd into directory:

```
git clone https://github.com/floooh/fibs-sokol-test
cd fibs-sokol-test
```

Run `./fibs build`, this will pull in external dependencies and tools, generates a CMakeLists.txt
and CMakePresets.json file, run cmake and then build the project.

```
./fibs build
```

If the build finishes without problems, run the demo:

```
./fibs run demo
```

If there was a problem, `./fibs diag tools` to check if any required tools are missing.

### Build a WebGL version with Emscripten

First install a local Emscripten SDK:

```
./fibs emsdk install
```

...next re-configure the project to use an Emscripten build config:

```
./fibs config emsc-ninja-release
```

...fibs will complain at this point if it cannot find Ninja in the path. Please
install Ninja in that case, run `./fibs diag tools` to check if fibs can find
Ninja now, and then run `./fibs config emsc-ninja-release` again.

...next build the Emscripten sample:

```
./fibs build
```

...and run the resulting demo, this should open the system web browser which
then should load and run the demo.html file.

```
./fibs run demo
```

Explore fibs by running `./fibs help`.

Finally, get rid of everything that was downloaded and built by deleting
the `fibs-sokol-test` directory.
