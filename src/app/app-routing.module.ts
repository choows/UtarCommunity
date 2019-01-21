import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { LoginComponent } from "./Login/Login.component";
import { MyStarJobComponent } from "./My_Star_Job/My_Star_Job.component";
import { TableModifyComponent } from "./home/TableModify/TableModify.component";
import { ProfileComponent } from "./Profile/Profile.component";
import { ClassComponent } from "./Class/Class.component";
import {ClassDetailComponent} from "./Class/ClassDetail/ClassDetail.component";
const routes: Routes = [
    { path: "", redirectTo: "/login", pathMatch: "full" },
    { path: "home", loadChildren: "~/app/home/home.module#HomeModule" },
    { path: "login", component: LoginComponent },
    { path: "my_star_job", component: MyStarJobComponent },
    { path: "ModifyTable", component: TableModifyComponent },
    { path: "profile", component: ProfileComponent },
    { path: "class", component: ClassComponent },
    {path : "class_detail" , component : ClassDetailComponent}
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
