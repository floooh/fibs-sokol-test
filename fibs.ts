import * as fibs from 'https://deno.land/x/fibs/mod.ts'

if (import.meta.main) fibs.main();

export const project: fibs.ProjectDesc = {
    name: 'fibs-sokol-test',

    imports: [
        // import sokol and stb dependencies
        {
            name: 'libs',
            url: 'https://github.com/floooh/fibs-libs',
            import: [ 'sokol.ts', 'stb.ts' ],
        },
        // import Emscripten platform support
        {
            name: 'platforms',
            url: 'https://github.com/floooh/fibs-platforms',
            import: [ 'emscripten.ts' ],
        },
        // import job wrappers for sokol-shdc and file copying, and standard build options
        {
            name: 'utils',
            url: 'https://github.com/floooh/fibs-utils',
            import: [ 'stdoptions.ts', 'sokolshdc.ts', 'copyfiles.ts' ],
        }
    ],

    targets: [
        {
            name: 'demo',
            type: 'windowed-exe',
            dir: 'src',
            sources: () => [ 'demo.c' ],
            libs: () => [ 'sokol-autoconfig', 'stb' ],
        }
    ]
}
