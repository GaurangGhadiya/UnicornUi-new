import { AppSettings, STORAGEKEY } from '../config/APP/app.config';

class Auth {
  /**
   * Authenticate a user. Save a token string in Local Storage
   *
   * @param {string} token
   */
  static setAuthToken(token: string) {
    localStorage.setItem(STORAGEKEY.token, token);
  }

  /**
   * Check if a user is authenticated - check if a token is saved in Local Storage
   *
   * @returns {boolean}
   */
  static isUserAuthenticated(): boolean {
    return localStorage.getItem(STORAGEKEY.token) !== null;
  }

  /**
   * Deauthenticate a user. Remove a token from Local Storage.
   *
   */
  static deauthenticateUser() {
    localStorage.removeItem(STORAGEKEY.token);
    localStorage.removeItem(STORAGEKEY.authData);
    localStorage.removeItem(STORAGEKEY.userData);
    localStorage.removeItem(STORAGEKEY.layoutData);
  }

  /**
   * Get a token value.
   *
   * @returns {string}
   */
  static getToken() {
    return localStorage.getItem(STORAGEKEY.token);
  }

  /*
   * Sets userData to localStorage
   * */
  static setAuthData(data: any) {
    localStorage.setItem(STORAGEKEY.authData, JSON.stringify(data));
  }

  /*
   * Get userData
   *
   * */
  static getAuthData(localStorage?: any) {
    try {
      return JSON.parse(localStorage.getItem(STORAGEKEY.authData));
    } catch (e) {
      return {};
    }
  }

  /*
   * Sets userData to localStorage
   * */
  static setUserData(data: any) {
    localStorage.setItem(STORAGEKEY.userData, JSON.stringify(data));
  }

  /*
   * Get userData
   * */
  static getUserData(localStorage?: any) {
    try {
      return JSON.parse(localStorage.getItem(STORAGEKEY.userData));
    } catch (e) {
      return {};
    }
  }

  /**
   * Get the full username
   *
   * @returns {string}
   */
  static getUsername() {
    const userData = this.getUserData();
    if (userData) {
      const firstname = userData.firstname || '';
      const lastname = userData.lastname || '';
      return firstname.trim() + ' ' + lastname.trim();
    } else {
      return '';
    }
  }

  /**
   * Get the email of logged in user
   *
   * @returns {string}
   */
  static getEmail() {
    const email = this.getUserData().email || '';
    return email;
  }

  /**
   * Get user role
   *
   * @returns {string}
   */
  static getUserRole() {
    /* @TODO No role attrib. Double check with api */
    const userdata = this.getUserData();
    let role = 'Administrator';
    if (userdata) {
      role = userdata.role;
    }
    return role;
  }

  /**
   * Get user companyId
   *
   * @returns {string}
   */
  static getUserCompanyId() {
    const company = this.getUserCompany();
    let companyId = null;
    if (company) {
      if (company.hasOwnProperty('id')) {
        companyId = company.id;
      }
    }
    return companyId;
  }

  /*
   * Get All Companies
   * */
  static getUserCompanies() {
    const userData = this.getUserData();
    let companies = [];
    if (
      userData &&
      userData.hasOwnProperty('companies') &&
      userData.companies &&
      userData.companies.length
    ) {
      companies = userData.companies;
    }
    return companies;
  }

  /**
   * Get user company
   */
  static getUserCompany() {
    const companies = this.getUserCompanies();
    if (companies && companies.length) {
      return companies[0];
    } else {
      return null;
    }
  }

  /**
   * Get user company
   */
  static getUserCompanyName() {
    const company = this.getUserCompany();
    if (company) {
      return company.name;
    } else {
      return null;
    }
  }

  /*
   * get User Roles
   * */
  static getUserRoles() {
    const userData = this.getUserData();
    if (
      userData &&
      userData.hasOwnProperty('roles') &&
      userData.roles &&
      userData.roles.length
    ) {
      return userData.roles;
    } else {
      return [];
    }
  }

  /*
   * get navigation menus Role wise
   * */
  static getUserNavigation() {
    const userData = this.getUserData();
    if (
      userData &&
      userData.hasOwnProperty('navigations') &&
      userData.navigations &&
      userData.navigations.length
    ) {
      return userData.navigations;
    } else {
      return [];
    }
  }

  /*
   * get default navigation route
   * */
  static getDefaultNavigationRoute() {
    const navigations = this.getUserNavigation();
    let defaultNavigation = AppSettings.defaultNavigation;
    if (navigations && navigations.length) {
      for (let i = 0; i < navigations.length; i++) {
        if (
          navigations[i].hasOwnProperty('defaultNavigation') &&
          navigations[i].defaultNavigation
        ) {
          defaultNavigation = navigations[i].defaultNavigation;
        }
      }
    }
    return defaultNavigation;
  }
}

export default Auth;
