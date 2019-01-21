import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";

import { ClassDetailRoutingModule } from "./ClassDetail-routing.module";
import { ClassDetailComponent } from "./ClassDetail.component";

@NgModule({
    imports: [
        NativeScriptModule,
        ClassDetailRoutingModule
    ],
    declarations: [
        ClassDetailComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class ClassDetailModule { }
