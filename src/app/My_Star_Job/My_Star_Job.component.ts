import { Component, OnInit } from "@angular/core";
import { WebView } from "tns-core-modules/ui/web-view";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";

/* ***********************************************************
* Before you can navigate to this page from your app, you need to reference this page's module in the
* global app router module. Add the following object to the global array of routes:
* { path: "My_Star_Job", loadChildren: "./My_Star_Job/My_Star_Job.module#MyStarJobModule" }
* Note that this simply points the path to the page module file. If you move the page, you need to update the route too.
*************************************************************/

@Component({
    selector: "MyStarJob",
    moduleId: module.id,
    templateUrl: "./My_Star_Job.component.html"
})
export class MyStarJobComponent implements OnInit {
    SourceWeb : string = "http://mystarjob.com/";; 
    constructor() {
        /* ***********************************************************
        * Use the constructor to inject app services that you need in this component.
        *************************************************************/
    }

    ngOnInit(): void {
        this.SourceWeb = "http://mystarjob.com/";
        /* ***********************************************************
        * Use the "ngOnInit" handler to initialize data for this component.
        *************************************************************/
    }
    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }
}
