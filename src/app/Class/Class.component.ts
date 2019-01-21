import { Component, OnInit, ViewContainerRef } from "@angular/core";
import * as appSettings from "tns-core-modules/application-settings";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { ModalDialogService } from "nativescript-angular/directives/dialogs";
import { UserService } from "../service/Firebase.service";
import {AddClassComponent} from "./AddClass/AddClass.component";
import { RouterExtensions } from "nativescript-angular/router";
import { ActivatedRoute, ActivationEnd, NavigationExtras } from "@angular/router";
/* ***********************************************************
* Before you can navigate to this page from your app, you need to reference this page's module in the
* global app router module. Add the following object to the global array of routes:
* { path: "Class", loadChildren: "./Class/Class.module#ClassModule" }
* Note that this simply points the path to the page module file. If you move the page, you need to update the route too.
*************************************************************/

@Component({
    selector: "Class",
    moduleId: module.id,
    templateUrl: "./Class.component.html"
})
export class ClassComponent implements OnInit {
    constructor(private activetedroute : ActivatedRoute, private routerextension : RouterExtensions, private modal: ModalDialogService, private vcr: ViewContainerRef, private userservice: UserService) {
        /* ***********************************************************
        * Use the constructor to inject app services that you need in this component.
        *************************************************************/
    }
    List = [] ; 
    ngOnInit(): void {
        /* ***********************************************************
        * Use the "ngOnInit" handler to initialize data for this component.
        *************************************************************/
       this.userservice.FetchClass().then((result)=>{
           this.List = result;
       });
    }
    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }
    onAddButtonTap(){
        let options = {
            context: {},
            fullscreen: true,
            viewContainerRef: this.vcr
        };
        this.modal.showModal(AddClassComponent, options).then(()=>{
            this.ngOnInit();
        })
    }
    onItemTap(args){
        this.routerextension.navigate(["class_detail"] , {
            queryParams : this.List[args.index]
        });
    }

}
