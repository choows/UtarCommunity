import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptUISideDrawerModule } from "nativescript-ui-sidedrawer/angular";
import { UserService } from "./service/Firebase.service";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./Login/Login.component";
import { MyStarJobComponent } from "./My_Star_Job/My_Star_Job.component";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { TableModifyComponent } from "./home/TableModify/TableModify.component";
import { NativeScriptUIListViewModule } from "nativescript-ui-listview/angular";
import { ModalDialogService } from "nativescript-angular/modal-dialog";
import { ViewNoteComponent } from "./home/ViewNote/ViewNote.component";
import { FirstTimeLoginComponent } from "./home/FirstTimeLogin/FirstTimeLogin.component";
import { ProfileComponent } from "./Profile/Profile.component";
import { ClassComponent } from "./Class/Class.component";
import {AddClassComponent} from "./Class/AddClass/AddClass.component";
import {ClassDetailComponent} from "./Class/ClassDetail/ClassDetail.component";

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        AppRoutingModule,
        NativeScriptModule,
        NativeScriptFormsModule,
        NativeScriptUISideDrawerModule,
        NativeScriptUIListViewModule,
    ],
    declarations: [
        AppComponent,
        LoginComponent,
        MyStarJobComponent,
        TableModifyComponent,
        ViewNoteComponent,
        FirstTimeLoginComponent,
        ProfileComponent,
        ClassComponent,
        AddClassComponent,
        ClassDetailComponent
    ],
    entryComponents: [
        ViewNoteComponent,
        FirstTimeLoginComponent,
        AddClassComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ],
    providers: [
        UserService,
        ModalDialogService
    ]
})
export class AppModule { }
