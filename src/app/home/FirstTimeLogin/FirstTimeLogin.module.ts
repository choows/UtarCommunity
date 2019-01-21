import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";

import { FirstTimeLoginRoutingModule } from "./FirstTimeLogin-routing.module";
import { FirstTimeLoginComponent } from "./FirstTimeLogin.component";

@NgModule({
    imports: [
        NativeScriptModule,
        FirstTimeLoginRoutingModule
    ],
    declarations: [
        FirstTimeLoginComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class FirstTimeLoginModule { }
