import instance from "./http";

function stayhomeRead(sid) {
   return new Promise((resolve,reject)=>{
        instance.get('/api/stayhome/'+sid).then(res=>{
            resolve(res);

        }).catch(error=>{
            reject(error)
        })
    })

}
function stayDelete() {

}
function stayhomeUpdate(sid) {
    return new Promise((resolve,reject)=>{
        instance.put('/api/stayhome/'+sid,{}).then(res=>{
            resolve(res);

        }).catch(error=>{
            reject(error)
        })
    })
}

export {stayDelete,stayhomeRead,stayhomeUpdate}