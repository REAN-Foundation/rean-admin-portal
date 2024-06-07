// import type { RequestEvent } from "@sveltejs/kit"
import { GMU_URL } from '$env/static/private';
const gmuUrl = GMU_URL;

export const GET = async () =>{
  try{
    console.log('get endpoint called');
    return await fetch(`${gmuUrl}/appointment-schedules/gghn/recent-status-report/recent-file`)
  }   
 catch(error)
 {
  console.log("error in connection",error.message)
 }
}