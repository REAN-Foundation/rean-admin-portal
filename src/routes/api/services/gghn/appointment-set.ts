import { GMU_URL } from '$env/static/private';
const gmuUrl = GMU_URL;

export async function handleDateSubmission(date: string) {
   let dateStr = date
   console.log("data...*...",date)
   let d = date.split('-')
   console.log("data1",d[0])
   console.log("data2",d[1])
   console.log("data3",d[2])
   if(d[0].startsWith('0') || d[2].startsWith('0')){
    let datefirst = parseInt(d[0], 10);
    let datelast = parseInt(d[2], 10);
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
