import firebase from "firebase/app"
import router from '../router'
export default {
    actions: {
        async login(dispatch, { email, password }) {
            try {
                await firebase.auth().signInWithEmailAndPassword(email, password)
                router.push('/statistic')
            
            } catch (error) {
                console.log("Пароль не верный введите верный пароль")
            }
        }
    }
}