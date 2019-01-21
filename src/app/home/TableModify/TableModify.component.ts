import { Component, OnInit, ViewContainerRef } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { ModalDialogService } from "nativescript-angular/directives/dialogs";
import { ListPicker } from "tns-core-modules/ui/list-picker";
import { TimePicker } from "tns-core-modules/ui/time-picker";
import * as dialogs from "tns-core-modules/ui/dialogs";
import * as appSettings from "tns-core-modules/application-settings";

import { UserService } from "../../service/Firebase.service";
/* ***********************************************************
* Before you can navigate to this page from your app, you need to reference this page's module in the
* global app router module. Add the following object to the global array of routes:
* { path: "TableModify", loadChildren: "./TableModify/TableModify.module#TableModifyModule" }
* Note that this simply points the path to the page module file. If you move the page, you need to update the route too.
*************************************************************/

@Component({
    selector: "TableModify",
    moduleId: module.id,
    templateUrl: "./TableModify.component.html"
})
export class TableModifyComponent implements OnInit {
    constructor(private routerextension: RouterExtensions, private userservice: UserService) {
        /* ***********************************************************
        * Use the constructor to inject app services that you need in this component.
        *************************************************************/
        this.Time = new Date(Date.now());
    }
    /**
     * data for class 
     */
    Class_type = ["L", "P", "T"];
    Class_num = [1, 2, 3, 4, 5, 6, 7, 8];
    Class_day = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    selected_day;
    class_picked = [];
    selected_type;
    selected_num;
    Venue: string;
    Course_ID: string;
    Course_desc: string;
    Time: Date;
    Time_str: string;
    Lecturer: boolean;
    ngOnInit(): void {
        /* ***********************************************************
        * Use the "ngOnInit" handler to initialize data for this component.
        *************************************************************/
        this.class_picked.push({
            Course_ID: "Course ID",
            Course_Name: "Course Name",
            Day: "Day",
            Start_Time: "Start Time",
            Room: "Room"
        });
        this.Lecturer = appSettings.getBoolean("Lecturer");
    }
    onNavBack() {
        this.routerextension.back();
    }
    AddClass() {
        if (this.Time.getMinutes().toString().length < 2) {
            this.Time_str = this.Time.getHours().toString() + "0" + this.Time.getMinutes().toString();
        } else {
            this.Time_str = this.Time.getHours().toString() + this.Time.getMinutes().toString();
        }
        if (this.Lecturer) {
            this.class_picked.push({
                Course_ID: this.Course_ID,
                Course_Name: this.Course_desc,
                Course_Type : this.selected_type + this.selected_num ,
                Day: this.selected_day,
                Start_Time: this.Time_str,
                Room: this.Venue
            });
        } else {
            this.class_picked.push({
                Course_ID: this.Course_ID,
                Course_Type : this.selected_type + this.selected_num ,
                Course_Name: this.Course_desc,
                Day: this.selected_day,
                Start_Time: this.Time_str,
                Room: this.Venue
            });
        }
    }
    selectedClassType(args) {
        let picker = <ListPicker>args.object;
        this.selected_type = this.Class_type[picker.selectedIndex].toString();
    }
    selectedClass_Num(args) {
        let picker = <ListPicker>args.object;
        this.selected_num = this.Class_num[picker.selectedIndex].toString();
    }
    selectedClass_Day(args) {
        let picker = <ListPicker>args.object;
        this.selected_day = this.Class_day[picker.selectedIndex].toString();
    }
    onPickerLoaded(args) {
        let timePicker = <TimePicker>args.object;
        timePicker.hour = this.Time.getHours();
        timePicker.minute = this.Time.getMinutes();
    }
    onTimeChanged(args) {
        let timePicker = <TimePicker>args.object;
        this.Time.setHours(timePicker.hour);
        this.Time.setMinutes(timePicker.minute);
    }
    onItemTap(args) {
        if (args.index > 0) {
            dialogs.confirm({
                title: "Comfirm to Remove Slot ?",
                okButtonText: "Sure",
                cancelButtonText: "Cancel",
            }).then(result => {
                if (result) {
                    this.class_picked.splice(this.class_picked.indexOf(args), 1);
                }
            });
        }
    }
    uploadRecord() {
        while (this.class_picked.length > 1) {
            let item = this.class_picked.pop();
            this.userservice.NewClass(item);
        }
        if (this.class_picked.length == 1) {
            this.routerextension.navigate(["/home"]);
        }
    }
}
