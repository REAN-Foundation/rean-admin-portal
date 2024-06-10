import type { Session } from "$routes/api/sessions/session";

export const logLoadingError = (where: string, event: any, errorMessage?: string ) => {
    const msg = errorMessage ?? 'Unknown Error -> ';
    console.error(`Error - ${where} : ${msg}`);
    console.error(`Route: ${event.route}`);
    console.error(new Error(msg).stack);
}

export const logApiError = (sessionId: string, url: string, session: Session) => {
    const accessToken = session ? session.accessToken : null;
    console.error(`SessionId - ${sessionId}`);
    console.error(`Url: ${url}`);
    const message = `Error -> ${url}`
    console.error(new Error(message).stack);
}
