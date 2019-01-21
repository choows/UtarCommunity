import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { ClassDetailComponent } from "./ClassDetail.component";

const routes: Routes = [
    { path: "", component: ClassDetailComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class ClassDetailRoutingModule { }
