import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import {ref, uploadBytes, getDownloadURL } from "firebase/storage";

/* Your Config */
const firebaseConfig = {
  apiKey: "AIzaSyC4G6wD2HQ34sP2rHOilbQ2gCEuMYG0FPs",
  authDomain: "typescript-4439a.firebaseapp.com",
  projectId: "typescript-4439a",
  storageBucket: "typescript-4439a.appspot.com",
  messagingSenderId: "1032365003250",
  appId: "1:1032365003250:web:e955495eddea7f574b5b6b",
  measurementId: "G-5JFZKYLMK9"
};
/* End Config */

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);


export async function uploadFileToStorage(file: any, folderName: any, bufferData: any) {
  // nếu file là null thì không làm gì hết
  if (!file) {
    return false
  }

  let fileRef;
  let metadata;
  if (!bufferData) {
    // tên file trên file base
    fileRef = ref(storage, `${folderName}/` + file.name);
  } else {
    // tên file trên file base
    fileRef = ref(storage, `${folderName}/` + (file as any).filename);
    metadata = {
      contentType: (file as any).mimetype,
    };
  }
  let url;
  if (bufferData) {
    // upload file lên fire storage
    url = await uploadBytes(fileRef, bufferData, metadata).then(async res => {
      // khi up thành công thì tìm URL
      return await getDownloadURL(res.ref)
        .then(url => url)
        .catch(er => false)
    })
  } else {
    // upload file lên fire storage
    url = await uploadBytes(fileRef, file).then(async res => {
      // khi up thành công thì tìm URL
      return await getDownloadURL(res.ref)
        .then(url => url)
        .catch(er => false)
    })
  }


  return url
}

