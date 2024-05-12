import { dia } from "@joint/plus";

import JointPlusService from "../../services/joint-plus.service";
import { Controller } from "../controller";
import * as actions from "../actions";

export class KeyboardController extends Controller {
    startListening() {
        const { keyboard } = this.service;

        this.listenTo(keyboard, {
            escape: onEscape,
            "delete backspace": onDelete,
            "ctrl+0": onCtrlZero,
            "ctrl+plus": onCtrlPlus,
            "ctrl+minus": onCtrlMinus,
            "ctrl+z": onCtrlZ,
            "ctrl+y": onCtrlY,
            "ctrl+e": onCtrlE,
        });
    }
}

function onEscape(service: JointPlusService): void {
    actions.setSelection(service, []);
}

function onDelete(service: JointPlusService): void {
    actions.removeSelection(service);
}

function onCtrlPlus(service: JointPlusService, evt: dia.Event): void {
    evt.preventDefault();
    actions.zoomIn(service);
}

function onCtrlMinus(service: JointPlusService, evt: dia.Event): void {
    evt.preventDefault();
    actions.zoomOut(service);
}

function onCtrlZero(service: JointPlusService): void {
    actions.zoomToFit(service);
}

function onCtrlZ(service: JointPlusService): void {
    actions.undoAction(service);
}

function onCtrlY(service: JointPlusService): void {
    actions.redoAction(service);
}

function onCtrlE(service: JointPlusService): void {
    actions.exportToPNG(service);
}
