import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { FirstTimeLoginComponent } from "./FirstTimeLogin.component";

const routes: Routes = [
    { path: "", component: FirstTimeLoginComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class FirstTimeLoginRoutingModule { }
