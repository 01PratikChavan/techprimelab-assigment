export const validateForm=(formData)=>{
    let formErros={};
    if(!formData.email.trim()){
          formErros.email=true;
    }
    if(!formData.password.trim()){
        formErros.password=true;
    }
    return formErros;
  }
