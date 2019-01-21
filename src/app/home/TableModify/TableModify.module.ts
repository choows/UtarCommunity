import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";

import { TableModifyRoutingModule } from "./TableModify-routing.module";
import { TableModifyComponent } from "./TableModify.component";

@NgModule({
    imports: [
        NativeScriptModule,
        TableModifyRoutingModule
    ],
    declarations: [
        TableModifyComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class TableModifyModule { }
