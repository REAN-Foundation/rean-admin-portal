// import type { RequestEvent } from "@sveltejs/kit"
import { GMU_URL } from '$env/static/private';
import { GMU_BOT_CLIENT_NAME} from '$env/static/private';
const gmuUrl = GMU_URL;
const clientName = GMU_BOT_CLIENT_NAME

export const GET = async () =>{
  try{
    console.log('get endoint called');
    return await fetch(`${gmuUrl}/appointment-schedules/${clientName}/recent-status-report/recent-file`)
  }   
 catch(error)
 {
  console.log("error in connection",error.message)
 }
}