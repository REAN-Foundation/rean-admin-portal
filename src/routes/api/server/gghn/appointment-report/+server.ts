// import type { RequestEvent } from "@sveltejs/kit"
import { GMU_URL } from '$env/static/private';
const gmuUrl = GMU_URL;
import { GGHN_BOT_CLIENT_NAME } from '$env/static/private';
const client = GGHN_BOT_CLIENT_NAME;

export const GET = async () =>{
  try{
    console.log('get endpoint called');
    return await fetch(`${gmuUrl}/appointment-schedules/${client}/recent-status-report/recent-file`)
  }   
 catch(error)
 {
  console.log("error in connection",error.message)
 }
}