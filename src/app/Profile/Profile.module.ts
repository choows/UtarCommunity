import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";

import { ProfileRoutingModule } from "./Profile-routing.module";
import { ProfileComponent } from "./Profile.component";

@NgModule({
    imports: [
        NativeScriptModule,
        ProfileRoutingModule
    ],
    declarations: [
        ProfileComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class ProfileModule { }
