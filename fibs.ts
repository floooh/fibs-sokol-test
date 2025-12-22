import { Builder, Configurer, Platform, main } from "https://raw.githubusercontent.com/floooh/fibs/master/index.ts";

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
    name: "utils",
    url: "https://github.com/floooh/fibs-utils",
    files: ["stdoptions.ts", "copyfiles.ts", "sokolshdc.ts"],
  });
}

export function build(b: Builder) {
  // simple demo
  b.addTarget("simple", "windowed-exe", (t) => {
    t.setDir("src");
    t.addSource("simple.c");
    t.addDependencies(["sokol"]);
  });

  // complex demo with assets and shaders
  b.addTarget("demo", "windowed-exe", (t) => {
    t.setDir("src");
    t.addSources(["demo.c", "demo.glsl"]);
    t.addDependencies(["sokol", "stb", "fileutil"]);
    t.addIncludeDirectories(["@targetbuild:"]); // needed for sokol-shdc output
    t.addJob({
      job: "copyfiles",
      args: { srcDir: "@root:assets", files: ["baboon.png"] },
    });
    t.addJob({
      job: "sokolshdc",
      args: { src: "demo.glsl", slang: getSlang(b.platform())}
    });
  });

  // a helper library for file access
  b.addTarget("fileutil", "lib", (t) => {
    t.setDir("src");
    t.addSource("fileutil.h");
    if (b.isMacOS()) {
      t.addSource("fileutil_osx.m");
    } else {
      t.addSource("fileutil.c");
    }
  });
}

function getSlang(platform: Platform): string {
  switch (platform) {
    case 'macos': return 'metal_macos';
    case 'ios': return 'metal_ios';
    case 'windows': return 'hlsl5';
    case 'emscripten': return 'glsl300es';
    case 'android': return 'glsl300es';
    default: return 'glsl430';
  }
}
