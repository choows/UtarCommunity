import { Component, OnInit, AfterContentInit , ViewChild , ElementRef } from "@angular/core";
import { ActivatedRoute, ActivationEnd } from "@angular/router";
import { RouterExtensions } from "nativescript-angular/router";
import { UserService } from "../../service/Firebase.service";
import * as firebase from "nativescript-plugin-firebase";
import { ItemEventData, ListView } from "tns-core-modules/ui/list-view";
import { View } from "tns-core-modules/ui/page/page";

/* ***********************************************************
* Before you can navigate to this page from your app, you need to reference this page's module in the
* global app router module. Add the following object to the global array of routes:
* { path: "ClassDetail", loadChildren: "./ClassDetail/ClassDetail.module#ClassDetailModule" }
* Note that this simply points the path to the page module file. If you move the page, you need to update the route too.
*************************************************************/

@Component({
    selector: "ClassDetail",
    moduleId: module.id,
    templateUrl: "./ClassDetail.component.html"
})
export class ClassDetailComponent implements OnInit {
    Course_ID: string;
    Course_Name: string;
    Course_Type: string;
    Day: string;
    Room: string;
    Start_Time: string;
    message: string;
    User_Name: string;
    User_Id: string;
    Profile_Image: string;
    Chats = [] ; // store the chat list . 
    constructor(private activeted_route?: ActivatedRoute, private routerextension?: RouterExtensions, private userservice?: UserService) {
        /* ***********************************************************
        * Use the constructor to inject app services that you need in this component.
        *************************************************************/
        this.activeted_route.queryParams.subscribe(params => {
            this.Course_ID = params["Course_ID"];
            this.Course_Name = params["Course_Name"];
            this.Course_Type = params["Course_Type"];
            this.Day = params["Day"];
            this.Room = params["Room"];
            this.Start_Time = params["Start_Time"];
        });
        this.userservice.User_Profile().then((result) => {
            this.User_Name = result["name"];
            this.User_Id = result["uid"];
            this.Profile_Image = result["profileImageURL"];
        });
    }
    onNavBack() {
        this.routerextension.back();
    }
    ngOnInit(): void {
        const Collection_name = this.Course_ID + " " + this.Course_Type;
        this.userservice.Chats(Collection_name).then((result : []) => {
            this.Chats = result;
        }).then(()=>{
            this.Chats.reverse();
        })
        .then(()=>{
             this.NewMessage(Collection_name);
        });
    }

    /**
     * to send message.
     * 
     * @param message is binding to the ngmodel from the textview. 
     */
    sendMessage() {
        const timestamp = new Date(Date.now()).getTime().toString()
        let data = {
            UserName: this.User_Name,
            UID: this.User_Id,
            ProfileImage: this.Profile_Image,
            Message: this.message,
            TimeStamp: timestamp
        }
        const Collection_name = this.Course_ID + " " + this.Course_Type;
        this.userservice.SendMessage(data , Collection_name);
        this.message = null;
    }

    /**
     * To check for new Message
     * #ListView
     * notify Data changed. 
     */
    @ViewChild("ListView") listview: ElementRef;
    NewMessage(Collection_name) {
        const Listview : ListView = this.listview.nativeElement;
        let a = [] ; 
        const store = firebase.firestore.collection(Collection_name);
        const query = store
            .orderBy("TimeStamp", "desc")
            .limit(1);
        query.onSnapshot((snapshot) => {
            snapshot.forEach((snap) => {
                if(this.Chats[this.Chats.length -1 ]["TimeStamp"] != snap.data()["TimeStamp"]){
                   const result = snap.data();
                   this.Chats.push({
                    UserName: result["UserName"],
                    UID: result["UID"],
                    ProfileImage: result["ProfileImage"],
                    Message: result["Message"],
                    TimeStamp: result["TimeStamp"]
                });  
                
                Listview.refresh();
                }else{
                    console.log("Same result from collection..");
                }
                Listview.scrollToIndex(this.Chats.length -1);
            });
        });
    }

    /**
     * 
     * @param user_id 
     */

    /**
     * 
     * to check whether is self message or not 
     * *ngIf="!is_self(item.UID)"
     */
    is_self(user_id : string ) : boolean{
        if(user_id == this.User_Id){
            return true;
        }else{
            return false;
        }
    }
}
