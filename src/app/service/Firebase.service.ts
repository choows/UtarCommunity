import { EventEmitter, Injectable } from "@angular/core";
import { Config } from "../shared/config";
import * as firebase from "nativescript-plugin-firebase";
import { User } from "../shared/user.module";
import * as appSettings from "tns-core-modules/application-settings";
import { knownFolders, Folder, File } from "tns-core-modules/file-system";
import { ResolveEnd } from "@angular/router";
import * as dialogs from "tns-core-modules/ui/dialogs";
import { firestore } from "nativescript-plugin-firebase";
import { knownCollections } from "tns-core-modules/ui/page/page";
import { ClassDetailComponent } from "../Class/ClassDetail/ClassDetail.component";
import { ClassDetailModule } from "../Class/ClassDetail/ClassDetail.module";
@Injectable()
export class UserService {

    private Temp;
    private temp_File = knownFolders.temp().getFile("Temp.json");
    /**
     * to initializa the firebase function
     */
    Initialization() {
        firebase.init({
            persist: true,
            showNotificationsWhenInForeground: true,
            onMessageReceivedCallback: (message) => {
                if (message.foreground) {
                    dialogs.alert({
                        //also a from section , does not know what it mean for. 
                        title: message.title,
                        message: message.body,
                        okButtonText: "OK"
                    });
                    //message.data
                } else {
                    //message.data
                }
            },
            onAuthStateChanged: function (data) {
                if (data.loggedIn) {
                    appSettings.setString("user_id", data.user.uid);
                    const path = "Users/" + data.user.uid;
                    firebase.keepInSync(path, true).then((res) => {
                        console.log("Firebase is now keep in sync....");
                    }).catch((err) => {
                        console.log("Firebase keep in sync error : " + err);
                    });
                }
            }
        }).then((result) => {
            console.log("Firebase init....");
        }).catch((err) => {
            console.log(err);
        });
    }

    /**
     * to login 
     */
    Login(user: User) {
        return new Promise((resolve, reject) => {
            firebase.login({ type: firebase.LoginType.PASSWORD, email: user.email, password: user.password }).then((res) => {
                resolve();
                appSettings.setString("user_id", res.uid);
            }).catch((err) => {
                reject(err);
            });
        });
    }

    /**
     * sign up new user.
     */
    SignUp(user) {
        return new Promise((resolve, reject) => {
            firebase.createUser({ email: user.email, password: user.password }).then((res) => {
                resolve();
            }).catch((err) => {
                reject(err);
            });
        });
    }

    /**
     * upload record to firebase 
     */
    NewClass(data) {
        const path = "Users/" + appSettings.getString("user_id") + "/" + data.Course_ID + "/" + data.Course_Type;
        firebase.setValue(path, data).then((result) => {
            //console.log(result);
        }).catch((err) => {
            console.log(err);
        });
        if (appSettings.getBoolean("Lecturer")) {
            const class_path = "Class/" + data["Course_ID"] + "/" + data["Course_Type"] + "/Detail";
            firebase.setValue(class_path, data).catch((err) => {
                console.log(err);
            });
        }
    }

    /**
     * fetch data from firebase 
     */
    FetchFirebase() {
        this.GetPushToken();
        const path = "Users/" + appSettings.getString("user_id");
        return new Promise((resolve, reject) => {
            firebase.getValue(path).then((result) => {
                this.Temp = result.value;
                this.OfflineSave(result.value);
                this.Identity();
                resolve();
            }).catch((err) => {
                reject();
                console.log(err);
            });
        });
    }
    /**
     * to enable offline mode , we save the data into a file. 
     * 
     * File Name : Temp.json
     */
    OfflineSave(Data_Fetched_From_Firebase) {
        this.temp_File.remove().then(() => {
            this.temp_File.writeText(JSON.stringify(Data_Fetched_From_Firebase));
        }).catch((err) => {
            console.log(err);
        });
    }

    /**
     * Offline read
     */
    OfflineFetch() {
        this.temp_File.readText().then((result) => {
            this.Temp = JSON.parse(result);
        }).catch((err) => {
            console.log(err);
        });
    }

    /**
     * return the time table data 
     */
    TimeTable() {
        let timetablearr = [];
        for (var item in this.Temp) {
            let items = this.Temp[item];
            for (var i in items) {
                if (typeof items[i]["Course_ID"] !== "undefined") {
                    timetablearr.push({
                        Course_ID: items[i]["Course_ID"],
                        Course_Name: items[i]["Course_Name"],
                        Day: items[i]["Day"],
                        Start_Time: items[i]["Start_Time"],
                        Room: items[i]["Room"],
                        Identity: i
                    });
                }
            }
        }
        return timetablearr;
    }

    /**
     * to add new Note 
     */
    AddNote(Course_ID: string, Identity: string, value) {
        const path = "Users/" + appSettings.getString("user_id") + "/" + Course_ID + "/" + Identity + "/Notes";
        firebase.push(path, value).then(() => {
            this.FetchFirebase();
        })
            .catch((err) => {
                console.log(err);
            });
    }

    /**
     * retreive note from firebase 
     */
    FetchNote(Course_ID: string, Identity: string) {
        const notes = this.Temp[Course_ID][Identity]["Notes"];
        let note_arry = [];
        for (var note in notes) {
            note_arry.push(notes[note]);
        }
        return note_arry;
    }

    /**
     * To remove class
     */
    RemoveClass(Course_ID: string, ID: string) {
        const path = "Users/" + appSettings.getString("user_id") + "/" + Course_ID + "/" + ID;
        firebase.remove(path).then((res) => {
            this.FetchFirebase();
        })
            .catch((err) => {
                console.log(err);
            });
    }

    /**
     * get the user current push token for FCM
     */
    GetPushToken() {
        firebase.getCurrentPushToken().then((result) => {
            firebase.setValue("Users/" + appSettings.getString("user_id") + "/Token", result);
        }).catch((err) => {
            console.log(err);
        });
    }
    /**a
     * Setting the username and the profile picture in the setting.
     * 
     *  promt out the user interface to setting
     * 
     */
    FirstTimeLogin() {
        return new Promise((resolve, reject) => {
            firebase.getCurrentUser().then((user_detail) => {
                if (!user_detail.name && !user_detail.profileImageURL) {
                    appSettings.setBoolean("First_Time_Login", true);
                    resolve(true);
                } else {
                    appSettings.setBoolean("First_Time_Login", false);
                }
            }).catch((err) => {
                console.log(err);
                reject(err);
            });
        });

    }

    /**
     * Log out current user
     */
    Logout() {
        return new Promise((resolve, reject) => {
            firebase.logout().then(() => {
                appSettings.clear();
                resolve();
            }).catch((err) => {
                reject();
                console.log(err);
                alert("Unable to Logout.");
            });
        });
    }

    /**
     * get the user detail 
     */
    User_Profile() {
        return new Promise((resolve, reject) => {
            firebase.getCurrentUser().then((result) => {
                resolve(result);
            }).catch((err) => {
                console.log(err);
            });
        });
    }
    /**
     * update the user profile 
     * this.UserName, this.Profile_picture, this.EmailAddress , this.Position , this.About , this.Phone_num , this.Photo_changed
     */
    UpdateProfile(Username: string, photourl: string, Email: string, Positions: string, About: string, Phone_num: string, changed: boolean) {
        return new Promise((resolve, reject) => {
            let Profile = {
                Profile_picture: photourl,
                Photopath: "",
                UserName: Username,
                Email: Email,
                Position: Positions,
                About: About,
                Phone_num: Phone_num
            };
            if (changed) {
                this.UploadPhoto(photourl).then((result) => {
                    Profile.Profile_picture = result["remote_url"];
                    Profile.Photopath = result["remote_path"];
                }).then(() => {
                    this.Update2(Username, photourl, Profile).then(() => {
                        resolve();
                    })
                }).catch((err) => {
                    console.log(err);
                    reject();
                });
            } else {
                this.Update2(Username, photourl, Profile).then(() => {
                    resolve();
                }).catch((err) => {
                    reject();
                })
            }
        });
    }

    Update2(Username: string, photourl: string, Profile) {
        return new Promise((resolve, reject) => {
            firebase.updateProfile({
                photoURL: Profile["Profile_picture"],
                displayName: Username,
            }).then(() => {
                let path = "Users/" + appSettings.getString("user_id") + "/Profile";
                firebase.setValue(path, Profile);
            })
                .then(() => {
                    this.FetchFirebase();
                    resolve();
                }).catch((err) => {
                    console.log(err);
                    reject();
                });
        });

    }

    UploadPhoto(path) {
        return new Promise((resolve, reject) => {
            const firestore_path = "Users/" + appSettings.getString("user_id");
            firebase.storage.uploadFile({
                localFullPath: path,
                remoteFullPath: firestore_path,
                onProgress: null
            }).then(() => {
                firebase.storage.getDownloadUrl({
                    remoteFullPath: firestore_path
                }).then((url_path) => {
                    resolve({
                        remote_path: firestore_path,
                        remote_url: url_path
                    });
                });
            }).catch((err) => {
                reject({
                    remote_path: "",
                    remote_url: path
                });
                console.log(err);
            });
        });
    }

    /**
     * return all the detail of user. 
     */
    Fetch_User_Detail() {
        return this.Temp["Profile"];
    }

    /**
     * To identify the user is student or lecturer
     * 
     * by default is student 
     */
    Identity() {
        if (typeof this.Temp["Profile"]["Position"] !== "undefined") {
            if (this.Temp["Profile"]["Position"] == "Lecturer") {
                appSettings.setBoolean("Lecturer", true);
            } else {
                appSettings.setBoolean("Lecturer", false);
            }
        } else {
            appSettings.setBoolean("Lecturer", false);
        }
    }

    /**
     * fetch the class list from firebase
     */
    FetchClassList(Course_ID: string) {
        const path = "Class_List/" + Course_ID;
        return new Promise((resolve, reject) => {
            firebase.getValue(path).then((result) => {
                resolve(result.value);
            }).catch((err) => {
                console.log(err);
                reject();
            });
        });
    }

    /**
     * fetch the class which metch the result from user 
     */
    async FetchClass() {
        let List = [];
        for (var Class in this.Temp) {
            if (Class != "Profile" && Class != "Token") {
                for (var Venue in this.Temp[Class]) {
                    const path = "Class/" + Class + "/" + Venue + "/Detail";
                    firebase.getValue(path).then((result) => {
                        if (result.value != null) {
                            List.push(result.value);
                        }
                    }).catch((err) => {
                        console.log(err);
                    });
                }
            }
        }
        return List;
    }

    /**
     * 
     * get the chats history from firestore.
     * @param Collection_name Collection name for the directory
     * 
     */
    Chats(Collection_name: string) {
        return new Promise((resolve, reject) => {
            const store = firebase.firestore.collection(Collection_name);
            let Chats = [];

            const query = store
                .orderBy("TimeStamp", "desc")
                .limit(30);

            query.get().then((snapshot) => {
                snapshot.forEach((snap) => {
                    const result = snap.data();
                    Chats.push({
                        UserName: result["UserName"],
                        UID: result["UID"],
                        ProfileImage: result["ProfileImage"],
                        Message: result["Message"],
                        TimeStamp: result["TimeStamp"]
                    });
                });
            }).then(() => {
                resolve(Chats);
            }).catch((err) => {
                console.log(err);
                reject();
            });

        });
    }

    /**
     * Send Message
     */
    SendMessage(data, Collection_name) {
        const store = firebase.firestore.collection(Collection_name);
        store.doc(data[" TimeStamp"]).set(data);
    }
}