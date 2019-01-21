import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";

import { ClassRoutingModule } from "./Class-routing.module";
import { ClassComponent } from "./Class.component";

@NgModule({
    imports: [
        NativeScriptModule,
        ClassRoutingModule
    ],
    declarations: [
        ClassComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class ClassModule { }
