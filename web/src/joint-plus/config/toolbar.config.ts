import { ZOOM_MAX, ZOOM_MIN, ZOOM_STEP } from "../../theme";

export const toolbarConfig = {
    tools: [
        {
            type: "undo",
            name: "undo",
            group: "undo-redo",
            attrs: {
                button: {
                    "data-tooltip": "Undo <i>(Ctrl+Z)</i>",
                    "data-tooltip-position": "top",
                },
            },
        },
        {
            type: "redo",
            name: "redo",
            group: "undo-redo",
            attrs: {
                button: {
                    "data-tooltip": "Redo <i>(Ctrl+Y)</i>",
                    "data-tooltip-position": "top",
                },
            },
        },
        {
            type: "zoom-in",
            name: "zoom-in",
            group: "zoom",
            max: ZOOM_MAX,
            step: ZOOM_STEP,
            attrs: {
                button: {
                    "data-tooltip": "Zoom In <i>(Ctrl+Plus)</i>",
                    "data-tooltip-position": "top",
                },
            },
        },
        {
            type: "zoom-out",
            name: "zoom-out",
            group: "zoom",
            min: ZOOM_MIN,
            step: ZOOM_STEP,
            attrs: {
                button: {
                    "data-tooltip": "Zoom Out <i>(Ctrl+Minus)</i>",
                    "data-tooltip-position": "top",
                },
            },
        },
        {
            type: "zoom-to-fit",
            name: "zoom-to-fit",
            group: "zoom",
            max: ZOOM_MAX,
            min: ZOOM_MIN,
            step: ZOOM_STEP,
            useModelGeometry: true,
            attrs: {
                button: {
                    "data-tooltip": "Fit Diagram <i>(Ctrl+0)</i>",
                    "data-tooltip-position": "top",
                },
            },
        },
        {
            type: "button",
            name: "png",
            group: "export",
            text: "Экспорт PNG",
            attrs: {
                button: {
                    id: "btn-png",
                    "data-tooltip": "Export as PNG <i>(Ctrl+E)</i>",
                    "data-tooltip-position": "top",
                },
            },
        },
    ],
};
