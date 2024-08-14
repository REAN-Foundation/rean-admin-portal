// import type { RequestEvent } from "@sveltejs/kit"
import { FOLLOW_UP_URL } from '$env/static/private';
const followUpUrl = FOLLOW_UP_URL;

export const GET = async () =>{
  try{
    console.log('get endpoint called');
    return await fetch(`${followUpUrl}/appointment-schedules/gghn/recent-status-report/recent-file`)
  }   
 catch(error)
 {
  console.log("error in connection",error.message)
 }
}