import { Component, OnInit, ViewChild, ElementRef, ViewContainerRef } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import * as imagepicker from "nativescript-imagepicker";
import { UserService } from "../service/Firebase.service";
import { RouterExtensions } from "nativescript-angular/router";
import { ModalDialogService } from "nativescript-angular/directives/dialogs";
import { ViewNoteComponent } from "./ViewNote/ViewNote.component";
import { RadListView } from "nativescript-ui-listview";
import * as dialogs from "tns-core-modules/ui/dialogs";
import { iterateListLike } from "@angular/core/src/change_detection/change_detection_util";
import { injectTemplateRef } from "@angular/core/src/render3/view_engine_compatibility";
import { FirstTimeLoginComponent } from "./FirstTimeLogin/FirstTimeLogin.component";
import { AppComponent } from "../app.component";
@Component({
    selector: "Home",
    moduleId: module.id,
    templateUrl: "./home.component.html"
})

export class HomeComponent implements OnInit {
    @ViewChild('radlistview') radlistviewRef: ElementRef;
    constructor(private appcompo : AppComponent, private userservice: UserService, private routerextension: RouterExtensions, private modal: ModalDialogService, private vcRef: ViewContainerRef) {
    }
    //sample data 
    data;
    Monday = [];
    Tuesday = [];
    Wednesday = [];
    Thursday = [];
    Friday = [];
    Saturday = [];
    Sunday = [];
    is_mon = false;
    is_tues = false;
    is_wed = false;
    is_thurs = false;
    is_fri = false;
    is_sat = false;
    is_sun = false;
    /**
     * used to seperate the input into different output array....
     */
    Seperator() {
        this.Monday = [];
        this.Tuesday = [];
        this.Wednesday = [];
        this.Thursday = [];
        this.Friday = [];
        this.Saturday = [];
        this.Sunday = [];

        for (var item in this.data) {
            switch (this.data[item].Day) {
                case "Monday": {
                    this.Monday.push(this.data[item]);
                    this.is_mon = true;
                    break;
                }
                case "Tuesday": {
                    this.Tuesday.push(this.data[item]);
                    this.is_tues = true;
                    break;
                }
                case "Wednesday": {
                    this.Wednesday.push(this.data[item]);
                    this.is_wed = true;
                    break;
                }
                case "Thursday": {
                    this.Thursday.push(this.data[item]);
                    this.is_thurs = true;
                    break;
                }
                case "Friday": {
                    this.Friday.push(this.data[item]);
                    this.is_fri = true;
                    break;
                }
                case "Saturday": {
                    this.Saturday.push(this.data[item]);
                    this.is_sat = true;
                    break;
                }
                case "Sunday": {
                    this.Sunday.push(this.data[item]);
                    this.is_sun = true;
                    break;
                }
                default: {
                    alert("error during seperate data.");
                    break;
                }
            }
        }
    }
    onpageloaded() {
        this.userservice.FirstTimeLogin().then((result) => {
            if (result) {
                this.promt_profile_setup();
            }
        });
    }
    ngOnInit(): void {
        this.appcompo.sideDrawerEnable();
        this.appcompo.sideDrawerRefresh();
        this.is_mon = false;
        this.is_tues = false;
        this.is_wed = false;
        this.is_thurs = false;
        this.is_fri = false;
        this.is_sat = false;
        this.is_sun = false;
        this.userservice.FetchFirebase().then(() => {
            this.data = this.userservice.TimeTable();
        }).then(() => {
            this.Seperator();
        });
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }

    /**
     * Add and modify the table content 
     */
    addTable() {
        //modal view 
        this.routerextension.navigate(["/ModifyTable"]);
    }
    onItemSelected(args) {
        let list = args.object.bindingContext;
        let options = {
            context: {
                Course_ID: list.Course_ID,
                ID: list.Identity
            },
            fullscreen: true,
            viewContainerRef: this.vcRef
        };
        this.modal.showModal(ViewNoteComponent, options);
    }
    onLongPress(args) {
        dialogs.confirm({
            title: "Confirm to Delete ?",
            okButtonText: "Delete",
            cancelButtonText: "Cancel",
        }).then(result => {
            if (result) {
                let obj = args.object.bindingContext;
                this.userservice.RemoveClass(obj.Course_ID, obj.Identity);
                this.ngOnInit();
            }
        });
    }
    promt_profile_setup() {
        let options = {
            context: {},
            fullscreen: true,
            viewContainerRef: this.vcRef
        };
        this.modal.showModal(FirstTimeLoginComponent, options);
    }

}
