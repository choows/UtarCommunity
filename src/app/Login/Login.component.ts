import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { User } from "../shared/user.module";
import {UserService} from "../service/Firebase.service";
import * as appSettings from "tns-core-modules/application-settings";
/* ***********************************************************
* Before you can navigate to this page from your app, you need to reference this page's module in the
* global app router module. Add the following object to the global array of routes:
* { path: "Login", loadChildren: "./Login/Login.module#LoginModule" }
* Note that this simply points the path to the page module file. If you move the page, you need to update the route too.
*************************************************************/

@Component({
    selector: "Login",
    moduleId: module.id,
    templateUrl: "./Login.component.html"
})
export class LoginComponent implements OnInit {
    username: string;
    password: string;
    constructor(private routerExtensions: RouterExtensions , private userservice : UserService) {
    }

    ngOnInit() {
        if(appSettings.hasKey("user_id")){
            this.routerExtensions.navigate(["/home"]);
        }
    }
    onSigninButtonTap() {
        //used to login
        const user = new User() ; 
        user.email = this.username ; 
        user.password = this.username ;
        this.userservice.Login(user).then((res)=>{
            this.routerExtensions.navigate(["/home"] ,{
                clearHistory : true,
                transition : {
                    name : "fade"
                },
                animated : true
            });
        }).catch((err)=>{
            alert(err);
        });
    }
    checkActiveState() {

    }
    onSignupButtonTap() {
        //sign up 
        const user = new User() ; 
        user.email = this.username ; 
        user.password = this.username ;
        this.userservice.SignUp(user).then((res)=>{
            alert("User Sign Up Successfully..");
        }).catch((err)=>{
            alert(err);
        });
    }

    forgotPassword() {
        //forgot password
    }

}
