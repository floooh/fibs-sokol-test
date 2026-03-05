import { Builder, Configurer } from "jsr:@floooh/fibs@^1";

export function configure(c: Configurer) {
  c.addImportOptions({
    emscripten: {
      initialMemory: 8 * 1024 * 1024,
      stackSize: 64 * 1024,
      useLTO: false,
      useClosure: false,
    },
  });
  c.addImport({
    name: "extras",
    url: "https://github.com/floooh/fibs-extras",
    files: [
      "emscripten.ts",
      "ios.ts",
      "macos.ts",
      "copyfiles.ts",
      "sokolshdc.ts",
      "stdoptions.ts",
      "linux-threads.ts",
      "vscode.ts",
    ]
  })
  c.addImport({
    name: "libs",
    url: "https://github.com/floooh/fibs-libs",
    files: ["sokol.ts", "stb.ts"],
  });
  c.addImport({
    name: "dcimgui",
    url: "https://github.com/floooh/dcimgui",
  });
}

export function build(b: Builder) {
  b.addTarget({
    name: "simple",
    type: "windowed-exe",
    sources: ["src/simple.c"],
    deps: ["sokol"],
  });
  b.addTarget("demo", "windowed-exe", (t) => {
    const shdcOutDir = t.buildDir();
    t.setDir("src");
    t.addSources(["demo.c", "demo.glsl", "vecmath.h"]);
    t.addDependencies(["sokol", "stb", "fileutil", "imgui"]);
    t.addJob({
      job: "copyfiles",
      args: { srcDir: `${b.projectDir()}/assets`, files: ["baboon.png"] },
    });
    // NOTE: sokol-shdc slang is auto-selected
    t.addJob({
      job: "sokolshdc",
      args: { src: "demo.glsl", outDir: shdcOutDir },
    });
    t.addIncludeDirectories([shdcOutDir]);
  });
  b.addTarget("fileutil", "lib", (t) => {
    t.setDir("src");
    t.addSource("fileutil.h");
    if (b.isMacOS() || b.isIOS()) {
      t.addSource("fileutil_osx.m");
    } else {
      t.addSource("fileutil.c");
    }
  });
}
