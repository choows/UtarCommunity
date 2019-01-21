import { Component, OnInit,ViewContainerRef } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import {FirstTimeLoginComponent} from "../home/FirstTimeLogin/FirstTimeLogin.component";
import {UserService} from "../service/Firebase.service";
import { ModalDialogService } from "nativescript-angular/directives/dialogs";

/* ***********************************************************
* Before you can navigate to this page from your app, you need to reference this page's module in the
* global app router module. Add the following object to the global array of routes:
* { path: "Profile", loadChildren: "./Profile/Profile.module#ProfileModule" }
* Note that this simply points the path to the page module file. If you move the page, you need to update the route too.
*************************************************************/

@Component({
    selector: "Profile",
    moduleId: module.id,
    templateUrl: "./Profile.component.html"
})
export class ProfileComponent implements OnInit {
    profile_image ;
    User_Name;
    Email;
    Position;
    Phone_Number;
    About ;
    constructor( private userservice: UserService, private modal: ModalDialogService, private vcRef: ViewContainerRef) {
        /* ***********************************************************
        * Use the constructor to inject app services that you need in this component.
        *************************************************************/
    }

    ngOnInit(): void {
        let profile = this.userservice.Fetch_User_Detail();
        this.User_Name = profile["UserName"];
        this.profile_image = profile["Profile_picture"];
        this.About = profile["About"];
        this.Phone_Number = profile["Phone_num"]
        this.Position = profile["Position"];
        this.userservice.User_Profile().then((res)=>{
            this.Email = res["email"];
        });
    }
    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }
    onEdit(){
        let options = {
            context: {},
            fullscreen: true,
            viewContainerRef: this.vcRef
        };
        this.modal.showModal(FirstTimeLoginComponent, options).then(()=>{
            this.ngOnInit();
        });
    }
}
