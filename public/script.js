const btnins = document.querySelector('.install');

const publicVapidKey = 'BJ0uxv6HXwC0rKeLfOsXrJ5_3_D_exLJHYO_FzU9KR_y-KIzEbLSohQTxDG4FQ_DBTa3WjJMixxsN27pskrYp4g';

if('serviceWorker' in navigator) {
   window.addEventListener('load',()=>{
      navigator.serviceWorker.register('./sw.js')
         .then( () => console.log("SW Activated"))
         .catch(err => console.error(err))
   })
}

let insPrompt;
window.addEventListener('beforeinstallprompt',event =>{
   event.preventDefault();
   insPrompt =event;
   btnins.style.display = 'block' ;
})

btnins.addEventListener('click', event => {
   insPrompt.prompt();
   insPrompt.userChoice.then(choice =>{
      if(choice.outcome === 'accepted'){
         console.log('accepted');
      }
      insPrompt=null;
   })
})

window.addEventListener('appinstalled', app => {
   app.logEvent('a2hs','installed')
   btnins.style.display = 'none';
})

navigator.serviceWorker.getRegistration().then( reg =>{
   reg.pushManager.subscribe({
      userVisibleOnly : true ,
      applicationServerKey : urlBase64ToUint8Array(publicVapidKey)
   }).then( sub => {
      console.dir(sub);
      fetch('/subscribe',{
         method : "POST",
         body : JSON.stringify(sub),
         headers: {
            "Content-Type" : "application/json"
         }
      })
   }).catch(err => {
      console.error(err);
   })
})







function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, "+")
    .replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}
