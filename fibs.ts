// deno-lint-ignore no-unversioned-import
import { Builder, Configurer } from "jsr:@floooh/fibs";

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
  c.addImport({
    name: "dcimgui",
    url: "https://github.com/floooh/dcimgui",
  })
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
    t.addSources(["demo.c", "demo.glsl"]);
    t.addDependencies(["sokol", "stb", "fileutil", "imgui"]);
    t.addProperties({
      MACOSX_BUNDLE_BUNDLE_NAME: "BLA",
      MACOSX_BUNDLE_BUNDLE_VERSION: "1.0",
    });
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
    if (b.isMacOS()) {
      t.addSource("fileutil_osx.m");
    } else {
      t.addSource("fileutil.c");
    }
  });
}
