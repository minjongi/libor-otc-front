import axiosInstance from '@/libs/axiosInstance'

const excludeUnauthenticated = ['/', '/login', '/register', '/notice', '/faq', '/faq', '/contact'];
const excludeAuthenticated = ['/login', '/register'];

export const chkAuthStatus = () => {
  if (typeof window === 'undefined') {
    return false;
  }

  const localStorageUser = localStorage.getItem('user');

  if (!localStorageUser) {
    return false;
  }

  const user = JSON.parse(localStorageUser)

  return !!user.id;
}

export const getUser = () => {
  if (typeof window === 'undefined') {
    return false;
  }

  const localStorageUser = localStorage.getItem('user');

  if (!localStorageUser) {
    return {};
  }

  const user = JSON.parse(localStorageUser)

  return user.id ? user : {};
}

export const updateUserInformation = async (payload: any) => {
    if (typeof window === 'undefined') {
        return false;
    }

    const response = await axiosInstance.post('/support/user/update', payload, {
        headers: { 'Content-Type': 'application/json' },
    })

    return response.data
}

export const checkAccessPageStatus = (pathname: string) => {
  const authStatus = chkAuthStatus()

  return !(authStatus && excludeAuthenticated.includes(pathname) ||
    !authStatus && !excludeUnauthenticated.includes(pathname));
}

export const checkAccessPage = (pathname: string) => {
  const authStatus = chkAuthStatus()

  if (authStatus && excludeAuthenticated.includes(pathname)) {
    location.replace('/')
  }

  return true;
}

export const authMe = (pathname: string) => {
  if (typeof window === 'undefined') {
    return false;
  }

  axiosInstance
    .get('/auth/me')
    .then(response => {
      window.localStorage.setItem('user', JSON.stringify(response.data))

      const authStatus = chkAuthStatus();
      if (!authStatus) {
        location.reload()
      }
    })
    .catch(() => {
      const user = localStorage.getItem('user')
      localStorage.removeItem('user')
      if (!excludeUnauthenticated.includes(pathname)) {
        alert('로그인 후 이용해 주세요')
        location.replace('/')
      } else if (user) {
        location.reload()
      }
    })
    .finally(() => {
      checkAccessPage(pathname)
    })
}

export const signIn = (loginId: string, password: string) => {
  if (typeof window === 'undefined') {
    return false;
  }

  axiosInstance
      .post('/auth/login', {
        loginId: loginId,
        password: password
      })
      .then(response => {
        localStorage.setItem('user', JSON.stringify(response.data))
        location.replace('/')

      })
      .catch(e => {
        localStorage.removeItem('user')
        alert(e.response.data.message);
      })
}

export const signOut = () => {
  if (typeof window === 'undefined') {
    return false;
  }

  axiosInstance
      .get('/auth/logout')
      .finally(() => {
        localStorage.removeItem('user')
        location.replace('/')
      })
}

export const signUp = (signUp: {
  loginId: string;
  nation: string;
  phone_number: string;
  email: string;
  password: string;
  termsAgreement: boolean;
  marketingAgreement: boolean;
}) => {
  if (typeof window === 'undefined') {
    return false;
  }

  return axiosInstance
    .post('/member', {
      loginId: signUp.loginId || '',
      name: signUp.loginId || '',
      nation: signUp.nation || '',
      phone_number: signUp.phone_number || '',
      email: signUp.email || '',
      password: signUp.password || '',
      termsAgreement: signUp.termsAgreement || '',
      marketingAgreement: signUp.marketingAgreement || ''
    })
}

export const update = (data: {
  phone_number: string;
  email: string;
  name: string;
  bank_name: string;
  bank_account: string;
  bank_account_name: string;
}) => {
  if (typeof window === 'undefined') {
    return false;
  }

  return axiosInstance
    .post('/member/update', {
      phone_number: data.phone_number || '',
      email: data.email || '',
      name: data.name || '',
      bank_name: data.bank_name || '',
      bank_account: data.bank_account || '',
      bank_account_name: data.bank_account_name || '',
    })
}
