import { API_CLIENT_INTERNAL_KEY, BACKEND_API_URL, GMU_URL } from '$env/static/private';
import { get } from 'http';
import { post } from '../reancare/common.reancare';
import { get_ } from '../common';
// import { split } from 'postcss/lib/list';
// import { del, get, post, put } from ''./common.reancare';
const gmuUrl = GMU_URL;
const baseUrl = BACKEND_API_URL;

export async function handleDateSubmission(date: string) {
   let dateStr = date
   console.log("data...*...",date)
   const d = date.split('-')
   console.log("data1",d[0])
   console.log("data2",d[1])
   console.log("data3",d[2])
   if(d[0].startsWith('0') || d[2].startsWith('0')){
    const datefirst = parseInt(d[0], 10);
    const datelast = parseInt(d[2], 10);
    dateStr = (`${datefirst}-${d[1]}-${datelast}`)
    console.log("dateStr....",dateStr)
   }
   else{
    dateStr = date
    console.log("dateStr....",dateStr)
   }
    // const dateString = dateStr
    const url = new URL(`${gmuUrl}/appointment-schedules/gghn/set-reminders/date/${dateStr}`);
    // url.searchParams.append('date', date);

  try {
    const response = await fetch(url.toString(), {
      method: 'POST'
    });
      console.log("response*..",response)
      if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return (response)
   
  } catch (error) {
    throw new Error('Error in setting appointment:',error);
      }
}
export async function addCancellationDateSubmission(dates: Date, sessionId: string,tenantId: string,tenantName: string = null) {
    const url = BACKEND_API_URL+'/follow-up/cancellations/';
    console.log("..",dates,sessionId,tenantId,tenantName, API_CLIENT_INTERNAL_KEY)
    try {
    
    const body = {
       TenantId : tenantId,
       TenantName:tenantName,
       CancelDate: dates
    };
    const response = await post(sessionId, url, body, true, API_CLIENT_INTERNAL_KEY);
      console.log("response*..",response)
      return (response)
   
  } catch (error) {
    console.log('**', JSON.stringify(error, null, 2)); 
    return {
      Status : "failure",
      Message: error.body.message ? error.body.message : "Error in setting appointment cancellation"
    }
    }
  }
  export async function viewCancelDates(startdate: Date,enddate: Date, sessionId: string,tenantId: string,tenantName: string = null) {
    let respdata = [];
    let canceldates=[];
    const url = BACKEND_API_URL+`/follow-up/cancellations/search?dateFrom=${startdate}&dateTo=${enddate}`;
    const response = await get_(sessionId, url, true, API_CLIENT_INTERNAL_KEY);
    console.log("response of view",response);
    respdata = response.Data.FollowUpCancellation.Items;
    
    for (var item in respdata){
      console.log("canceldate...",respdata[item].CancelDate)
      canceldates.push((respdata[item].CancelDate));
    }
    // let arrayofdates = JSON.stringify(canceldates)
    console.log("canceldate Array",canceldates)
    return canceldates;
  }