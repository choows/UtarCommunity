import { Component, OnInit } from "@angular/core";
import { ModalDialogParams } from "nativescript-angular/directives/dialogs";
import { UserService } from "../../service/Firebase.service";
import * as appSettings from "tns-core-modules/application-settings";
import { Switch } from "tns-core-modules/ui/switch";
import { AppComponent } from "../../app.component";
import * as imagepicker from "nativescript-imagepicker";
import * as dialogs from "tns-core-modules/ui/dialogs";
import { ImageSource } from "tns-core-modules/image-source/image-source";
import { knownFolders } from "tns-core-modules/file-system/file-system";
import * as camera from "nativescript-camera";
import { Image } from "tns-core-modules/ui/image";
import { ImageAsset } from "tns-core-modules/image-asset/image-asset";
/* ***********************************************************
* Before you can navigate to this page from your app, you need to reference this page's module in the
* global app router module. Add the following object to the global array of routes:
* { path: "FirstTimeLogin", loadChildren: "./FirstTimeLogin/FirstTimeLogin.module#FirstTimeLoginModule" }
* Note that this simply points the path to the page module file. If you move the page, you need to update the route too.
*************************************************************/

@Component({
    selector: "FirstTimeLogin",
    moduleId: module.id,
    templateUrl: "./FirstTimeLogin.component.html"
})
export class FirstTimeLoginComponent implements OnInit {
    constructor(private params: ModalDialogParams, private userservice: UserService, private appcompo: AppComponent) {
        this.checked = false;
        this.UserName = "User Name";
        this.Position = "Student";
        this.Profile_picture = "https://firebasestorage.googleapis.com/v0/b/utar-community.appspot.com/o/shared%2Fno_image.jpg?alt=media&token=f5039b6f-b1e2-4ac2-bd00-2447289b7276";

    }
    Profile_picture: string;
    UserName: string;
    EmailAddress: string;
    Phone_num: string;
    Position: string;
    checked: boolean;
    About: string;
    Photo_changed : boolean = false;
    ngOnInit(): void {
        let profile = this.userservice.Fetch_User_Detail();
        this.UserName = profile["UserName"];
        this.Profile_picture = profile["Profile_picture"];
        this.About = profile["About"];
        this.Phone_num = profile["Phone_num"]
        if (profile["Position"] == "Student") {
            this.checked = false;
        } else {
            this.checked = true;
        }
        this.Position = profile["Position"];
        if (camera.isAvailable) {
            camera.requestPermissions().catch((err) => {
                console.log(err);
            });
        }
    }
    onChecked(args) {
        let firstSwitch = <Switch>args.object;
        if (firstSwitch.checked) {
            this.Position = "Lecturer";
        } else {
            this.Position = "Student";
        }
    }
    SaveContent() {
        const Profile = {
            Profile_picture: this.Profile_picture,
            UserName: this.UserName,
            Email: this.EmailAddress,
            Position: this.Position,
            About: this.About,
            Phone_num: this.Phone_num
        };
        this.userservice.UpdateProfile(this.UserName, this.Profile_picture, this.EmailAddress , this.Position , this.About , this.Phone_num , this.Photo_changed).then(() => {
            //at here refresh the side drawer. 
            this.appcompo.sideDrawerRefresh();
        }).then(() => {
            //at here close this layout.
            this.params.closeCallback();
        });
    }

    Change_Photo() {
        dialogs.action({
            actions: ["Take Photo", "Pick From Gallery"],
            cancelButtonText: "Cancel"
        }).then((result) => {
            if (result == "Take Photo") {
                this.TakePhoto();
            }
            if (result == "Pick From Gallery") {
                this.Choose_From_Gallery();
            }
        }).catch((err) => {
            console.log(err);
        });
    }

    TakePhoto() {
        camera.takePicture().then((imageAsset) => {
            let file = knownFolders.temp().getFile("PhotoImage.png");
            let image_source = new ImageSource();
            image_source.fromAsset(imageAsset).then((res) => {
                res.saveToFile(file.path, "png");
            }).then(() => {
                this.Profile_picture = file.path;
                this.Photo_changed = true;
            });
        }).catch((err) => {
            console.log(err);
        });
    }

    Choose_From_Gallery() {
        let context = imagepicker.create({
            mode: "single"
        });
        let file = knownFolders.temp().getFile("PhotoImage.png");

        context
            .authorize()
            .then(function () {
                return context.present();
            })
            .then(function (selection) {
                selection.forEach(function (selected) {
                    let image_source = new ImageSource();
                    image_source.fromAsset(selected).then((result) => {
                        result.saveToFile(file.path, "png");
                    }).catch((err) => {
                        console.log(err);
                    });
                });
            }).then(() => {
                this.Profile_picture = file.path;
                this.Photo_changed = true;
            }).catch(function (e) {
                console.log(e);
            });
    }
}
