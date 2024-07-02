import { GMU_URL } from '$env/static/private';
const gmuUrl = GMU_URL;

export async function handleDateSubmission(date: string) {
    const url = new URL(`${gmuUrl}/appointment-schedules/gghn/set-reminders/date/${date}`);
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
