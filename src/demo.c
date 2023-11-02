//------------------------------------------------------------------------------
//  demo.c
//
//  A little standalone sokol+stb demo similar to the loadpng-sapp.c sample.
//------------------------------------------------------------------------------
#define SOKOL_IMPL
#include "sokol_app.h"
#include "sokol_gfx.h"
#include "sokol_log.h"
#include "sokol_glue.h"

static struct {
    float rx, ry;
    sg_pass_action pass_action;
    sg_pipeline pip;
    sg_bindings bind;
    uint8_t file_buffer[256 * 1024];
} state;

typedef struct {
    float x, y, z;
    int16_t u, v;
} vertex_t;

static void init(void) {
    sg_setup(&(sg_desc){
        .context = sapp_sgcontext(),
        .logger.func = slog_func,
    });
}

static void frame(void) {
    sg_begin_default_pass(&state.pass_action, sapp_width(), sapp_height());
    sg_end_pass();
    sg_commit();
}

static void cleanup(void) {
    sg_shutdown();
}

sapp_desc sokol_main(int argc, char* argv[]) {
    (void)argc; (void)argv;
    return (sapp_desc) {
        .init_cb = init,
        .frame_cb = frame,
        .cleanup_cb = cleanup,
        .width = 800,
        .height = 600,
        .sample_count = 4,
        .window_title = "Fibs + Sokol + Stb",
        .icon.sokol_default = true,
        .logger.func = slog_func,
    };
}
