import firebase from "firebase";
export async function saveStorage(file, path, id) {
  try {
    const ref = firebase
      .storage()
      .ref(`/${path}/${id}/${Date.now()}${file.name}`);
    const snapshot = await ref.put(file);
    const downloadUrl = await snapshot.ref.getDownloadURL();
    return downloadUrl;
  } catch (e) {
    console.log(e);
  }
}
export async function deleteStorage(imgUrl) {
  try {
    await firebase
      .storage()
      .refFromURL(imgUrl)
      .delete();
  } catch (e) {
    console.log(e);
  }
}

export async function saveDb(path, payload) {
  try {
    await firebase
      .database()
      .ref(`/${path}/`)
      .set(payload);
  } catch (e) {
    console.log(e);
  }
}

export async function getData(path) {
  const snapshot = await firebase
    .database()
    .ref(`/${path}/`)
    .once("value");
  console.log(snapshot.val());
  return snapshot.val();
}
