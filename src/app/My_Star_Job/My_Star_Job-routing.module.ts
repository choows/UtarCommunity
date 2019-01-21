import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { MyStarJobComponent } from "./My_Star_Job.component";

const routes: Routes = [
    { path: "", component: MyStarJobComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class MyStarJobRoutingModule { }
