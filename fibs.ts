import {
  Builder,
  Configurer,
  main,
} from "https://raw.githubusercontent.com/floooh/fibs/master/index.ts";

main(import.meta);

export function configure(c: Configurer) {
  c.addImport({
    name: "libs",
    url: "https://github.com/floooh/fibs-libs",
    files: ["sokol.ts", "stb.ts"],
  });
  c.addImport({
    name: "platforms",
    url: "https://github.com/floooh/fibs-platforms",
    files: ["emscripten.ts"],
  });
  c.addImport({
    name: 'utils',
    url: 'https://github.com/floooh/fibs-utils',
    files: ['stdoptions.ts' /*, 'sokolshdc.ts', 'copyfiles.ts' */],
  });
}

export function build(b: Builder) {
  b.addTarget("simple", "windowed-exe", (t) => {
    t.setDir("src");
    t.addSource("simple.c");
    t.addDependencies(["sokol"]);
  });
}

/*
export const project: fibs.ProjectDesc = {
  name: "fibs-sokol-test",

  imports: [
    // import sokol and stb dependencies
    {
      name: "libs",
      url: "https://github.com/floooh/fibs-libs",
      import: ["sokol.ts", "stb.ts"],
    },
    // import Emscripten platform support
    {
      name: "platforms",
      url: "https://github.com/floooh/fibs-platforms",
      import: ["emscripten.ts"],
    },
    // import job wrappers for sokol-shdc and file copying, and standard build options
    {
      name: "utils",
      url: "https://github.com/floooh/fibs-utils",
      import: ["stdoptions.ts", "sokolshdc.ts", "copyfiles.ts"],
    },
  ],

  // We need to tell the sokol headers what 3D backend to use, and the
  // sokol shader compiler the output shader language. One convenient
  // way to do this is to 'patch' existing build config templates
  // with new information.
  configs: [
    // all build configs derived from the 'macos' template will use the Metal backend
    {
      name: "macos",
      compileDefinitions: { "SOKOL_METAL": "1" },
      options: { "shdc-slang": "metal_macos" },
    },
    // all build configs derived from the 'win(dows)' template will use the D3D11 backend
    {
      name: "win",
      compileDefinitions: { "SOKOL_D3D11": "1" },
      options: { "shdc-slang": "hlsl4" },
    },
    // all build configs derived from the 'linux' template will use the GL backend
    {
      name: "linux",
      compileDefinitions: { "SOKOL_GLCORE33": "1" },
      options: { "shdc-slang": "glsl330" },
    },
    // all Emscripten build configs will use the GLES3 backend
    {
      name: "emsc",
      compileDefinitions: { "SOKOL_GLES3": "1" },
      options: { "shdc-slang": "glsl300es" },
    },
  ],

  targets: [
    // a windowed executable with sokol-shdc and copyfile build jobs
    {
      name: "demo",
      type: "windowed-exe",
      dir: "src",
      deps: () => ["sokol-config", "stb", "fileutil"],
      sources: () => ["demo.c"],
      // sokol-shdc generates headers into the @targetbuild directory
      includeDirectories: { private: () => ["@targetbuild:"] },
      jobs: (ctx) => [
        {
          job: "sokolshdc",
          args: { src: "demo.glsl", slang: ctx.config.options["shdc-slang"] },
        },
        {
          job: "copyfiles",
          args: { srcDir: "@root:assets", files: ["baboon.png"] },
        },
      ],
    },
    // a little helper library to determine the runtime asset path
    {
      name: "fileutil",
      type: "lib",
      dir: "src",
      sources: (ctx) => [
        "fileutil.h",
        ctx.config.platform === "macos" ? "fileutil_osx.m" : "fileutil.c",
      ],
    },
  ],
};
*/
