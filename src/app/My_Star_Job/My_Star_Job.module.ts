import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";

import { MyStarJobRoutingModule } from "./My_Star_Job-routing.module";
import { MyStarJobComponent } from "./My_Star_Job.component";

@NgModule({
    imports: [
        NativeScriptModule,
        MyStarJobRoutingModule
    ],
    declarations: [
        MyStarJobComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class MyStarJobModule { }
