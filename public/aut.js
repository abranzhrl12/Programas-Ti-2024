

const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
auth.languageCode = "es";

async function login() {
  try {
    const response = await auth.signInWithPopup(provider);
    console.log(response);
    return response.user; // Accede al objeto de usuario desde response
  } catch (error) {
    throw new Error(error.message); // Lanza un error con el mensaje de error
  }
}

function logout() {
  auth.signOut();
}

// let currentUser;

// firebase.auth().onAuthStateChanged((user) => {
//   if (user) {
//     currentUser = user;
//     console.log("Usuario logueado:", currentUser.displayName);
//   } else {
//     currentUser = null;
//     console.log("No hay usuario logueado");
//   }
// });

const btnLogin = document.querySelector(".btn");
btnLogin.addEventListener('click', async (e) => {
  try {
    // currentUser =
    await login();
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
  }
});
