import { Component, OnInit } from "@angular/core";
import { ModalDialogParams } from "nativescript-angular/directives/dialogs";
import { registerElement } from "nativescript-angular/element-registry";
import { CardView } from "nativescript-cardview";
import { UserService } from "../../service/Firebase.service";
/* ***********************************************************
* Before you can navigate to this page from your app, you need to reference this page's module in the
* global app router module. Add the following object to the global array of routes:
* { path: "ViewNote", loadChildren: "./ViewNote/ViewNote.module#ViewNoteModule" }
* Note that this simply points the path to the page module file. If you move the page, you need to update the route too.
*************************************************************/
registerElement("CardView", () => CardView);
@Component({
    selector: "ViewNote",
    moduleId: module.id,
    templateUrl: "./ViewNote.component.html"
})
export class ViewNoteComponent implements OnInit {
    Course_Id: string;
    Id: string;
    Adding: boolean
    AddButtonText: string = "New Note";
    Heading: string;
    Body: string;
    Notes = [];
    constructor(private params: ModalDialogParams , private userservice : UserService) {
        this.Course_Id = params.context["Course_ID"];
        this.Id = params.context["ID"];
        this.Adding = false;
    }

    ngOnInit(): void {
        this.Notes = this.userservice.FetchNote(this.Course_Id , this.Id);
    }
    closeView() {
        this.params.closeCallback();
    }
    addNote() {
        if (!this.Adding) {
            this.Adding = true;
            this.AddButtonText = "Done";
        } else {
            this.Adding = false;
            this.AddButtonText = "New Note";
            const pushed = {
                 Heading: this.Heading,
                Body: this.Body
            }
            this.Notes.push(pushed);
            this.Heading = null;
            this.Body = null;
            this.userservice.AddNote(this.Course_Id, this.Id , pushed);
        }
    }
}
