import { Component, OnInit } from "@angular/core";
import { UserService } from "../../service/Firebase.service";
import * as dialogs from "tns-core-modules/ui/dialogs";

/* ***********************************************************
* Before you can navigate to this page from your app, you need to reference this page's module in the
* global app router module. Add the following object to the global array of routes:
* { path: "AddClass", loadChildren: "./AddClass/AddClass.module#AddClassModule" }
* Note that this simply points the path to the page module file. If you move the page, you need to update the route too.
*************************************************************/

@Component({
    selector: "AddClass",
    moduleId: module.id,
    templateUrl: "./AddClass.component.html"
})
export class AddClassComponent implements OnInit {
    private List = [];
    constructor(private userservice: UserService) {
        /* ***********************************************************
        * Use the constructor to inject app services that you need in this component.
        *************************************************************/
    }

    ngOnInit(): void {
        /* ***********************************************************
        * Use the "ngOnInit" handler to initialize data for this component.
        *************************************************************/
    }
    onTextChanged(args) {
        this.List = [];
    }
    /**
     * 
     * search bar doesn't require no param checker.
     * if the data is undefined , it wont work. 
     */
    onSubmit(args) {
        let Course_ID: string = args.object.text;
        const Capital_Course_ID = Course_ID.toLocaleUpperCase();
        this.userservice.FetchClassList(Capital_Course_ID).then((result) => {
            if (result == null) {
                alert("No Result Found");
            } else {
                for (var Class in result) {
                    this.List.push({
                        Course_ID: Capital_Course_ID,
                        Course_Name: result[Class]["Course_Name"],
                        Course_Type: Class,
                        Day: result[Class]["Day"],
                        Room: result[Class]["Room"],
                        Start_Time: result[Class]["Start_Time"],
                    })
                }
            }
        });
    }
    onItemTap(args) {
        dialogs.confirm({
            title: this.List[args.index].Course_id,
            message: this.List[args.index].Course_Type,
            okButtonText: "Add",
            cancelButtonText: "Cancel"
        }).then(result => {
            if(result){
                 this.userservice.NewClass(this.List[args.index]);
                 alert("Done Add Class.");
            }
        });
    }
}