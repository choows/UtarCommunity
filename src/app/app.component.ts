import { Component, OnInit, ViewChild } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { RouterExtensions } from "nativescript-angular/router";
import { DrawerTransitionBase, RadSideDrawer, SlideInOnTopTransition } from "nativescript-ui-sidedrawer";
import { filter } from "rxjs/operators";
import * as app from "tns-core-modules/application";
import * as appSettings from "tns-core-modules/application-settings";
import { UserService } from "../app/service/Firebase.service";
import * as dialogs from "tns-core-modules/ui/dialogs";


@Component({
    moduleId: module.id,
    selector: "ns-app",
    templateUrl: "app.component.html"
})
export class AppComponent implements OnInit {
    @ViewChild("sidedrawer") sidedrawer: RadSideDrawer;
    private _activatedUrl: string;
    private _sideDrawerTransition: DrawerTransitionBase;
    private UserName: string;
    private email: string;
    private photourl: string;
    Lecturer: boolean;
    constructor(private router: Router, private routerExtensions: RouterExtensions, private userservice: UserService) {
        // Use the component constructor to inject services.
        this.UserName = "UserName";
        this.email = "username@mail.com";
        this.photourl = "https://firebasestorage.googleapis.com/v0/b/utar-community.appspot.com/o/shared%2Fno_image.jpg?alt=media&token=f5039b6f-b1e2-4ac2-bd00-2447289b7276";
    }

    ngOnInit(): void {
        this.userservice.Initialization();
        this._activatedUrl = "/login";
        this._sideDrawerTransition = new SlideInOnTopTransition();
        this.sideDrawerRefresh();
        this.router.events
            .pipe(filter((event: any) => event instanceof NavigationEnd))
            .subscribe((event: NavigationEnd) => this._activatedUrl = event.urlAfterRedirects);
    }

    sideDrawerRefresh() {
        this.userservice.User_Profile().then((res) => {
            this.UserName = res["name"];
            this.email = res["email"];
            this.photourl = res["profileImageURL"];
        });
    }

    sideDrawerEnable() {
        this.sidedrawer.gesturesEnabled = true;
        this.Lecturer = appSettings.getBoolean("Lecturer");
    }
    get sideDrawerTransition(): DrawerTransitionBase {
        return this._sideDrawerTransition;
    }

    isComponentSelected(url: string): boolean {
        return this._activatedUrl === url;
    }

    onNavItemTap(navItemRoute: string): void {
        this.routerExtensions.navigate([navItemRoute], {
            transition: {
                name: "fade"
            }
        });
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.closeDrawer();
    }
    Logout() {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.closeDrawer();

        dialogs.confirm({
            title: "Confirm to Logout ?",
            okButtonText: "Logout",
            cancelButtonText: "Cancel",
        }).then(result => {
            if (result) {
                this.userservice.Logout().then(() => {
                    this.routerExtensions.navigate(["/login"], {
                        transition: {
                            name: "fade"
                        },
                        clearHistory: true,
                        animated: true
                    });
                }).then(() => {
                    this.sidedrawer.gesturesEnabled = false;
                });
            }
        });


    }
}
