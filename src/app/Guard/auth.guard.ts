import { CanActivateChildFn } from '@angular/router';

export const authGuard: CanActivateChildFn = (childRoute, state) => {
    // Check if the user is authenticated based on session storage
    const isAuthenticated = sessionStorage.getItem('authenticated') === 'true';

    if (!isAuthenticated) {
   
      sessionStorage.setItem('redirectUrl', state.url);
  
  
      window.location.href = '/login'; 
      return false; 
    }
  
 
    return true;

};
