function loginController(servicio){
    return {
showError:null,
showLoading:false,
correo:'',
clave:'',

async ingresar(){
    this.showLoading=true;
    this.showError=null;
    try{
        const usuario= await servicio.login(this.correo, this.clave);
        if(usuario.rol==='admin'){
            window.location.href='admin_usuarios.html';
        }else{
            window.location.href='invernadero.html';
        }
}catch(errorparametro){
    this.showError=errorparametro.message;
}{
    this.showLoading=false;
}


    },
}
}