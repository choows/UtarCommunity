import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { TableModifyComponent } from "./TableModify.component";

const routes: Routes = [
    { path: "", component: TableModifyComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class TableModifyRoutingModule { }
