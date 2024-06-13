import { GithubAuthProvider, GoogleAuthProvider, signInWithRedirect } from 'firebase/auth'
import { auth } from "../config/firebase.config"

const googleProvider = new GoogleAuthProvider()
const githubProvider = new GithubAuthProvider()

export const signInWithGoogle = async () => {
    try {
        await signInWithRedirect(auth, googleProvider).then(userCred => {
            window.location.reload()
        })
    } catch (error) {
        console.error('Error during Google sign-in:', error);
    }

}

export const signInWithGitHub = async () => {
    try {
        await signInWithRedirect(auth, githubProvider).then(userCred => {
            window.location.reload()
        })
    } catch (error) {
        console.error('Error during GitHub sign-in:', error);
    }
}