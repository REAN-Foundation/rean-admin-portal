import type { LoginModel } from '$lib/types/domain.models';
import { Helper } from '$lib/utils/helper';
import { API_CLIENT_INTERNAL_KEY, BACKEND_API_URL } from '$env/static/private';
import { del, get, post, put } from './common.reancare';
import { searchPersonRoleTypes } from './person-role-types';
////////////////////////////////////////////////////////////////

export const login = async (roleId: string, password: string, username?: string, email?: string, phone?: string) => {
    const model: LoginModel = getLoginModel(roleId, password, username, email, phone);
    console.log(JSON.stringify(model, null, 2));
    const headers = {};
    headers['Content-Type'] = 'application/json';
    headers['x-api-key'] = API_CLIENT_INTERNAL_KEY;
    const body = JSON.stringify(model);
    console.log('model', model);
    const url = BACKEND_API_URL + (model.Password ? '/users/login-with-password' : '/users/login-otp');
    const res = await fetch(url, {
        method: 'POST',
        body,
        headers
    });
    const response = await res.json();
    console.log('response', response);
    return response;
};

const getLoginModel = (roleId:string, password: string, username?: string, email?: string, phone?: string): LoginModel => {
    const loginModel: LoginModel = {
        Password: password,
		LoginRoleId:roleId
    };

    if (username){
        loginModel.UserName = username
    }
    if (phone){
        loginModel.Phone = phone
    }
    if (email){
        loginModel.Email = email
    }
	return loginModel;
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const logout = async (sessionId: string) => {
    const url = BACKEND_API_URL + `/users/logout`;
    return await post(sessionId, url, {}, true, API_CLIENT_INTERNAL_KEY);
};

////////////////////////////////////////////////////////////////////////////////////

export const changePassword = async (
    sessionId: string,
    oldPassword: string,
    newPassword: string,
    email?: string,
    username?: string,
    roleId?: string
) => {
    const body = {
        Email: email,
        OldPassword: oldPassword,
        NewPassword: newPassword,
        Username: username,
        RoleId: roleId
    };
    const url = BACKEND_API_URL + `/users/change-password`;
    return await post(sessionId, url, body, true, API_CLIENT_INTERNAL_KEY);
};

export const SendPasswordResetCode = async (email: string) => {
    const model = {
        Email: email
    };
    const headers = {};
    headers['Content-Type'] = 'application/json';
    headers['x-api-key'] = API_CLIENT_INTERNAL_KEY;
    const body = JSON.stringify(model);
    console.log('model', model);
    const url = BACKEND_API_URL + `/users/send-password-reset-code`;
    const res = await fetch(url, {
        method: 'POST',
        body,
        headers
    });
    const response = await res.json();
    console.log('response', response);
    return response;
};

export const resetPassword = async (email: string, resetCode: string, newPassword: string) => {
    const model = {
        Email: email,
        NewPassword: newPassword,
        ResetCode: resetCode
    };

    const body = JSON.stringify(model);
    const headers = {};
    headers['Content-Type'] = 'application/json';
    headers['x-api-key'] = API_CLIENT_INTERNAL_KEY;
    const url = BACKEND_API_URL + `/users/reset-password`;
    const res = await fetch(url, {
        method: 'POST',
        body,
        headers
    });
    const response = await res.json();
    console.log('response', response);
    return response;
};

///////////////////////////////////////////////////////////////////////

// User curd end points

export const createUser = async (
	sessionId: string,
    tenantId: string,
	firstName: string,
	lastName: string,
    phone: string,
	email: string,
	role: string,
    roleId: string,
	password: string,
) => {
	const body = {
    TenantId: tenantId,
	FirstName: firstName,
	LastName: lastName,
    Role: role,
    RoleId: roleId,
	Phone: phone ? phone : null,
    Email: email ? email : null,
	Password: password,
	};

    if (Helper.isPhone(phone)) {
        body.Phone = Helper.sanitizePhone(phone);
    }
    const url = BACKEND_API_URL + '/users';
    return await post(sessionId, url, body, true, API_CLIENT_INTERNAL_KEY);
};

export const getUserById = async (sessionId: string, userId: string) => {
    const url = BACKEND_API_URL + `/users/${userId}`;
    return await get(sessionId, url, true, API_CLIENT_INTERNAL_KEY);
};

export const searchUsers = async (sessionId: string, searchParams?: any) => {
    let searchString = '';
    if (searchParams) {
        const keys = Object.keys(searchParams);
        if (keys.length > 0) {
            searchString = '?';
            const params = [];
            for (const key of keys) {
                if (searchParams[key]) {
                    const param = `${key}=${searchParams[key]}`;
                    params.push(param);
                }
            }
            searchString += params.join('&');
        }
        console.log('searchString', searchString);
    }
    const url = BACKEND_API_URL + `/users/search${searchString}`;
    return await get(sessionId, url, true, API_CLIENT_INTERNAL_KEY);
};

export const updateUser = async (
	sessionId: string,
	userId: string,
	firstName: string,
	lastName: string,
	phone: string,
	email: string,
	roleId: string,
	defaultTimeZone: string,
	currentTimeZone: string
) => {
	const body = {
			FirstName: firstName,
			LastName: lastName,
			RoleId: roleId,
			Phone: phone ? phone : null,
			Email: email ? email : null,
			DefaultTimeZone: defaultTimeZone ? defaultTimeZone : null,
			CurrentTimeZone: currentTimeZone ? currentTimeZone : null

	};
	if (Helper.isPhone(phone)) {
			body.Phone = Helper.sanitizePhone(phone);
	};
	console.log("body.....",body)
	const url = BACKEND_API_URL + `/users/${userId}`;
	return await put(sessionId, url, body, true, API_CLIENT_INTERNAL_KEY);
};

export const deleteUser = async (sessionId: string, usreId: string) => {
    const url = BACKEND_API_URL + `/users/${usreId}`;
    return await del(sessionId, url, true, API_CLIENT_INTERNAL_KEY);
};

export const getUserRoleList = async (userRole: string) => {
  if (userRole === "System admin") {
    return [
      {
        Title : 'System User',
        Value : 'System user'
      },
      {
        Title : 'Tenant User',
        Value : 'Tenant user'
      },
      {
        Title : 'Tenant Admin',
        Value : 'Tenant admin'
      }
    ]
  }
  if (userRole === 'Tenant admin') {
    return [
      {
        Title : 'Tenant User',
        Value : 'Tenant user'
      },
    ];
  }

  return [];
}

export const addPermissionMatrix = async (sessionId: string, userRoleList: any[], userRole?: string, userId?: string, tenantId?: string, roleId?: string) => {
  const permissionMatrix: any[] = [];
  
  const response = await searchPersonRoleTypes(sessionId)
  let selectedUserRoleId;
  const personRoleTypes = response.Data.PersonRoleTypes
	const selectedRole = personRoleTypes?.find((x) => x.RoleName === 'Tenant user');
  if (selectedRole) {
    selectedUserRoleId = selectedRole.id;
  }

  if (userRole === 'System admin') {
    userRoleList.forEach((userRole) => {
      permissionMatrix.push({...userRole, IsPermitted: 1});
    })
  }

  if (userRole === 'Tenant admin') {
      userRoleList.forEach((userRole) => {
      if ((userRole.RoleId === roleId && 
        userRole.TenantId === tenantId && 
        userRole.id === userId) ||
      (userRole.TenantId === tenantId && 
        userRole.RoleId === selectedUserRoleId)) {
        permissionMatrix.push({...userRole, IsPermitted: 1});
      } else {
        permissionMatrix.push({...userRole, IsPermitted: 0});
      }
    })
  }
  return permissionMatrix.length > 0  ? permissionMatrix : userRoleList;
}
