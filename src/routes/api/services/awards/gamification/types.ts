import { AWARDS_BACKEND_API_URL } from '$env/static/private';
import { get } from '../common.awards';

/////////////////////////////////////////////////////////////////////////////

export const getEventTypes = async (sessionId: string) => {
	const url = AWARDS_BACKEND_API_URL + `/types/event-types`;
	return await get(sessionId, url, false);
};

export const getEventActionTypes = async (sessionId: string) => {
	const url = AWARDS_BACKEND_API_URL + `/types/event-action-types`;
	return await get(sessionId, url, false);
};

export const getContextTypes = async (sessionId: string) => {
	const url = AWARDS_BACKEND_API_URL + `/types/context-types`;
	return await get(sessionId, url, false);
};

export const getConditionOperatorTypes = async (sessionId: string) => {
	const url = AWARDS_BACKEND_API_URL + `/types/condition-operator-types`;
	return await get(sessionId, url, false);
};

export const getLogicalOperatorTypes = async (sessionId: string) => {
	const url = AWARDS_BACKEND_API_URL + `/types/logical-operator-types`;
	return await get(sessionId, url, false);
};

export const getCompositeOperatorTypes = async (sessionId: string) => {
	const url = AWARDS_BACKEND_API_URL + `/types/composite-operator-types`;
	return await get(sessionId, url, false);
};

export const getMathematicalOperatorTypes = async (sessionId: string) => {
	const url = AWARDS_BACKEND_API_URL + `/types/mathematical-operator-types`;
	return await get(sessionId, url, false);
};

export const getExecutionStatusTypes = async (sessionId: string) => {
	const url = AWARDS_BACKEND_API_URL + `/types/execution-status-types`;
	return await get(sessionId, url, false);
};

export const getDataActionTypes = async (sessionId: string) => {
	const url = AWARDS_BACKEND_API_URL + `/types/data-action-types`;
	return await get(sessionId, url, false);
};

export const getOperandDataTypes = async (sessionId: string) => {
	const url = AWARDS_BACKEND_API_URL + `/types/operand-data-types`;
	return await get(sessionId, url, false);
};

export const getInputSourceTypes = async (sessionId: string) => {
	const url = AWARDS_BACKEND_API_URL + `/types/input-source-types`;
	return await get(sessionId, url, false);
};

export const getOutputSourceTypes = async (sessionId: string) => {
	const url = AWARDS_BACKEND_API_URL + `/types/output-source-types`;
	return await get(sessionId, url, false);
};
