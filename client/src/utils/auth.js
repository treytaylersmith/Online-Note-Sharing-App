import decode from 'jwt-decode';

class AuthService {
  getProfile() {
    const token = this.getToken();
    
    if (token) {
      const decoded = decode(token); // assuming jwtDecode is the library you're using
      console.log('Decoded token:', decoded);  // Log the decoded token to see its structure
      return decoded;  // Ensure the profile includes the '_id' field
    } else {
      console.error('No token found!');
    }
    
  }
  

  loggedIn() {
    // Checks if there is a saved token and it's still valid
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  isTokenExpired(token) {
    try {
      
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) {
        return true;
      } else return false;
    } catch (err) {
      return false;
    }
  }

  getToken() {
    // Retrieves the user token from localStorage
    return localStorage.getItem('id_token');
  }

  login(idToken) {
    // Saves user token to localStorage
    localStorage.setItem('id_token', idToken);

    window.location.assign('/');
  }

  logout() {
    // Clear user token and profile data from localStorage
    localStorage.removeItem('id_token');
    // this will reload the page and reset the state of the application
    window.location.assign('/');
  }
}

export default new AuthService();
