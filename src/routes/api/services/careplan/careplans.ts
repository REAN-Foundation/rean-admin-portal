import { API_CLIENT_INTERNAL_KEY,CAREPLAN_BACKEND_API_URL, CAREPLAN_SERVICE_API_KEY } from "$env/static/private";
import axios from "axios";
import * as fs from 'fs';
import FormData from 'form-data';
import {del, get, post, put} from "./common.careplan";
import { ServerHelper } from "$lib/server/server.helper";
import { SessionManager } from "$routes/api/sessions/session.manager";
import chalk from "chalk";
import { error } from "@sveltejs/kit";

// ////////////////////////////////////////////////////////////////

export const createCareplan = async (
  sessionId: string,
  code: string,
  categoryId:string,
  name: string,
  description: string,
  tags: string[],
  version: string
      ) => {
    const url = CAREPLAN_BACKEND_API_URL + '/careplans';
    const body = {
        Code: code,
        CategoryId:categoryId,
        Name: name,
        Description: description ? description : null,
        Tags: tags,
        Version: !version || version?.length === 0 ? 'V 1.0' : version,
    };
    return await post(sessionId, url, body, true);
};

export const getCareplanById = async (sessionId: string, careplanId: string) => {
    const url = CAREPLAN_BACKEND_API_URL + `/careplans/${careplanId}`;
    return await get(sessionId, url,true, CAREPLAN_SERVICE_API_KEY);
};

export const searchCareplans = async (sessionId: string,
    searchParams? : any, 
    ) => {
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
    }
    const url = CAREPLAN_BACKEND_API_URL + `/careplans/search${searchString}`;
    console.log('Timestamp ', new Date().toTimeString());
    return await get(sessionId, url, true, CAREPLAN_SERVICE_API_KEY);
};

export const updateCareplan = async (
    sessionId: string,
    careplanId:string,
    code: string,
    categoryId:string,
    name: string,
    description: string,
    tags: string[],
    version: string) => {
    const url = CAREPLAN_BACKEND_API_URL + (`/careplans/${careplanId}`);
  const body = {
    Code: code,
        CategoryId:categoryId,
        Name: name,
        Description: description ? description : null,
        Tags: tags,
        Version: !version || version?.length === 0 ? 'V 1.0' : version,
  };
  return await put(sessionId, url, body, true);
};

export const deleteCareplan = async (sessionId: string, careplanId: string) => {
    const url = CAREPLAN_BACKEND_API_URL + `/careplans/${careplanId}`;
    return await del(sessionId, url, true);
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////

export const searchCareplanCategories = async (sessionId: string) => {
    const url = CAREPLAN_BACKEND_API_URL + `/careplan-categories/search`;
    return await get(sessionId, url, true);
};

export const importCareplan = async (
	sessionId: string,
	fileName:string,
	filePath:string,
	isPublic?:true
) => {
	const url = CAREPLAN_BACKEND_API_URL + '/careplans/import-file';
	const session = await SessionManager.getSession(sessionId);
	const accessToken = session.accessToken;
	const mimeType = ServerHelper.getMimeTypeFromFileName(fileName);
	console.log(`mimeType = ${mimeType}`);
	const form = new FormData();
    form.append("file", fs.createReadStream(filePath));
	form.append("IsPublicResource", isPublic ? "true" : "false");

	const headers = {
        'Content-Type' : 'multipart/form-data',
        'x-api-key' : CAREPLAN_SERVICE_API_KEY,
        'Authorization' : `Bearer ${accessToken}`,
    };

  	// try{
		const res = await axios.post(url, form, { headers });
		//only for 201 status code
		const response = res.data;
        console.log('careplan response',response);
        if (response.Status === 'failure' || (response.HttpCode !== 201 && response.HttpCode !== 200)) {
            console.log(chalk.red(`post_ response message: ${response.Message}`));
            throw error(response.HttpCode, response.Message);
        }
        console.log(chalk.green(`post_ response message: ${response.Message}`));
        return response;
	// 	return response;
	// }catch(error){
	// 	//other than 201 status code
	// 	return error.response.data;
	// }
    
};

export const exportCareplanById = async (sessionId: string, careplanId: string) => {
    const url = CAREPLAN_BACKEND_API_URL + `/careplans/${careplanId}/export`;
    const session = await SessionManager.getSession(sessionId);
	const accessToken = session.accessToken;
	const headers = {};
	headers['Content-Type'] = 'application/json';
    headers['x-api-key'] = CAREPLAN_SERVICE_API_KEY;
    headers['Authorization'] = `Bearer ${accessToken}`;
	const res = await fetch(url, {
		method: 'GET',
		headers
	});
    if (!res.ok) {
        throw new Error(`Failed to export care plan: ${res.statusText}`);
    }
    const blob = await res.blob();
	return blob;
};
