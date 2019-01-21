import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";

import { ViewNoteRoutingModule } from "./ViewNote-routing.module";
import { ViewNoteComponent } from "./ViewNote.component";

@NgModule({
    imports: [
        NativeScriptModule,
        ViewNoteRoutingModule
    ],
    declarations: [
        ViewNoteComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class ViewNoteModule { }
