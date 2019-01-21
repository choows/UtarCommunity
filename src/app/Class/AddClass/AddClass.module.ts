import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";

import { AddClassRoutingModule } from "./AddClass-routing.module";
import { AddClassComponent } from "./AddClass.component";

@NgModule({
    imports: [
        NativeScriptModule,
        AddClassRoutingModule
    ],
    declarations: [
        AddClassComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AddClassModule { }
