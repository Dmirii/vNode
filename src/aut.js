export function getAuthForm(){

    return `
    <form class="mui-form" id="auth-form">           
    <div class="mui-textfield mui-textfield--float-label">
      <input required type="email" id="email">
      <label for="email">Email</label>
    </div>    
    <div class="mui-textfield mui-textfield--float-label">
      <input required type="password" id="password">
      <label for="email">Пароль</label>
    </div>         
    <button type="submit" class="mui-btn mui-btn--raised mui-btn--primary" >
    Отправить</button>
  </form>
    `;
};

export function authWithEmailAndPassword(email,password){
    console.log(email,password);
    const apiKey = 'AIzaSyDP44fmnnhL45LswJRs5LKkl_FYJMxeTZA';
    return fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}  `,{
        method: 'POST',
        body: JSON.stringify({
            email,
            password,
            returnSecureToken : true
        }),
        headers:{
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => data.idToken)

}