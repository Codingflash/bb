import instance from "./http";
import {SUCCESS} from "../lib/base";

function categorySave() {

}
function categoryIndex() {
   return new Promise((resolve,reject)=>{
        instance('/admin/category/indexall').then(res=>{
            if (res.code===SUCCESS){
                resolve(res);
            }
        }).catch((error)=>{
            reject(error);
        })
    })

}
function categoryUpdate() {

}
function categoryRead() {

}
function categoryDelate() {

}

export {categorySave,categoryDelate,categoryUpdate,categoryIndex,categoryRead}