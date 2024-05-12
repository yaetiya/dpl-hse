import { mvc, dia, shapes } from "@joint/plus";

import { FONT_FAMILY, PADDING_L, LIGHT_COLOR, MAIN_COLOR, MESSAGE_ICON } from "../../theme";

export enum ShapeTypesEnum {
    MESSAGE = "stencil.Message",
    CLASSIFY = "stencil.Classify",
    EXTERNAL_REQUEST = "stencil.ExternalRequest",
    FLOWCHART_START = "stencil.FlowchartStart",
    FLOWCHART_END = "stencil.FlowchartFinish",
}

const SHAPE_SIZE = 48;

const FlowchartStart = dia.Element.define(
    ShapeTypesEnum.FLOWCHART_START,
    {
        name: "FlowchartStart",
        title: "Старт",
        size: { width: SHAPE_SIZE, height: SHAPE_SIZE },
        attrs: {
            body: {
                fill: MAIN_COLOR,
                stroke: "none",
                cx: "calc(0.5 * w)",
                cy: "calc(0.5 * h)",
                r: "calc(0.5 * w)",
            },
            icon: {
                d: "M 2 8 L 4.29 5.71 L 1.41 2.83 L 2.83 1.41 L 5.71 4.29 L 8 2 L 8 8 Z M -2 8 L -8 8 L -8 2 L -5.71 4.29 L -1 -0.41 L -1 -8 L 1 -8 L 1 0.41 L -4.29 5.71 Z",
                fill: "#FFFFFF",
                transform: "translate(calc(0.5 * w), calc(0.5 * h))",
            },
            label: {
                text: "Старт",
                x: `calc(w + ${PADDING_L})`,
                y: "calc(0.5 * h)",
                textAnchor: "start",
                textVerticalAnchor: "middle",
                fill: "#242424",
                fontFamily: FONT_FAMILY,
                fontSize: 13,
            },
        },
    } as mvc.ObjectHash,
    {
        markup: [
            {
                tagName: "circle",
                selector: "body",
            },
            {
                tagName: "path",
                selector: "icon",
            },
            {
                tagName: "text",
                selector: "label",
            },
        ],
    }
);

const FlowchartFinish = dia.Element.define(
    ShapeTypesEnum.FLOWCHART_END,
    {
        name: "FlowchartFinish",
        title: "Финиш",
        size: { width: SHAPE_SIZE, height: SHAPE_SIZE },
        attrs: {
            body: {
                fill: MAIN_COLOR,
                stroke: "none",
                cx: "calc(0.5 * w)",
                cy: "calc(0.5 * h)",
                r: "calc(0.5 * w)",
            },
            icon: {
                d: "M 5 -8.45 L 6.41 -7.04 L 3 -3.635 L 1.59 -5.04 Z M -4.5 3.95 L -1 3.95 L -1 -1.63 L -6.41 -7.04 L -5 -8.45 L 1 -2.45 L 1 3.95 L 4.5 3.95 L 0 8.45 Z",
                fill: "#FFFFFF",
                transform: "translate(calc(0.5 * w), calc(0.5 * h))",
            },
            label: {
                text: "Финиш",
                x: `calc(w + ${PADDING_L})`,
                y: "calc(0.5 * h)",
                textAnchor: "start",
                textVerticalAnchor: "middle",
                fill: "#242424",
                fontFamily: FONT_FAMILY,
                fontSize: 13,
            },
        },
    } as mvc.ObjectHash,
    {
        markup: [
            {
                tagName: "circle",
                selector: "body",
            },
            {
                tagName: "path",
                selector: "icon",
            },
            {
                tagName: "text",
                selector: "label",
            },
        ],
    }
);

const Message = dia.Element.define(
    ShapeTypesEnum.MESSAGE,
    {
        name: "Message",
        size: { width: SHAPE_SIZE, height: SHAPE_SIZE },
        attrs: {
            body: {
                fill: LIGHT_COLOR,
                stroke: "#E8E8E8",
                cx: "calc(0.5 * w)",
                cy: "calc(0.5 * h)",
                r: "calc(0.5 * w)",
            },
            icon: {
                width: 20,
                height: 20,
                x: "calc(0.5 * w - 10)",
                y: "calc(0.5 * h - 10)",
                xlinkHref: MESSAGE_ICON,
            },
            label: {
                text: "Component",
                x: `calc(w + ${PADDING_L})`,
                y: "calc(0.5 * h)",
                textAnchor: "start",
                textVerticalAnchor: "middle",
                fill: "#242424",
                fontFamily: FONT_FAMILY,
                fontSize: 13,
            },
        },
    } as mvc.ObjectHash,
    {
        markup: [
            {
                tagName: "circle",
                selector: "body",
            },
            {
                tagName: "image",
                selector: "icon",
            },
            {
                tagName: "text",
                selector: "label",
            },
        ],
    }
);

const Classify = dia.Element.define(
    ShapeTypesEnum.CLASSIFY,
    {
        name: "Classify",
        size: { width: SHAPE_SIZE, height: SHAPE_SIZE },
        attrs: {
            body: {
                fill: LIGHT_COLOR,
                stroke: "#E8E8E8",
                cx: "calc(0.5 * w)",
                cy: "calc(0.5 * h)",
                r: "calc(0.5 * w)",
            },
            icon: {
                width: 20,
                height: 20,
                x: "calc(0.5 * w - 10)",
                y: "calc(0.5 * h - 10)",
                xlinkHref: MESSAGE_ICON,
            },
            label: {
                text: "Component",
                x: `calc(w + ${PADDING_L})`,
                y: "calc(0.5 * h)",
                textAnchor: "start",
                textVerticalAnchor: "middle",
                fill: "#242424",
                fontFamily: FONT_FAMILY,
                fontSize: 13,
            },
        },
    } as mvc.ObjectHash,
    {
        markup: [
            {
                tagName: "circle",
                selector: "body",
            },
            {
                tagName: "image",
                selector: "icon",
            },
            {
                tagName: "text",
                selector: "label",
            },
        ],
    }
);

const ExternalRequest = dia.Element.define(
    ShapeTypesEnum.EXTERNAL_REQUEST,
    {
        name: "ExternalRequest",
        size: { width: SHAPE_SIZE, height: SHAPE_SIZE },
        attrs: {
            body: {
                fill: LIGHT_COLOR,
                stroke: "#E8E8E8",
                cx: "calc(0.5 * w)",
                cy: "calc(0.5 * h)",
                r: "calc(0.5 * w)",
            },
            icon: {
                width: 20,
                height: 20,
                x: "calc(0.5 * w - 10)",
                y: "calc(0.5 * h - 10)",
                xlinkHref: MESSAGE_ICON,
            },
            label: {
                text: "Component",
                x: `calc(w + ${PADDING_L})`,
                y: "calc(0.5 * h)",
                textAnchor: "start",
                textVerticalAnchor: "middle",
                fill: "#242424",
                fontFamily: FONT_FAMILY,
                fontSize: 13,
            },
        },
    } as mvc.ObjectHash,
    {
        markup: [
            {
                tagName: "circle",
                selector: "body",
            },
            {
                tagName: "image",
                selector: "icon",
            },
            {
                tagName: "text",
                selector: "label",
            },
        ],
    }
);

Object.assign(shapes, {
    stencil: {
        Message,
        Classify,
        ExternalRequest,
        FlowchartStart,
        FlowchartFinish,
    },
});
