import { GMU_URL } from '$env/static/private';
import { GGHN_BOT_CLIENT_NAME } from '$env/static/private';
const client = GGHN_BOT_CLIENT_NAME;
const gmuUrl = GMU_URL;

export async function handleDateSubmission(date: string) {
    const url = new URL(`${gmuUrl}/appointment-schedules/${client}/set-reminders/date/${date}`);
    // url.searchParams.append('date', date);

  try {
    const response = await fetch(url.toString(), {
      method: 'POST'
    });
    console.log("Response **", await response.json());
    console.log('is response ok', response.ok);
    // if (!response.ok) {
    //   throw new Error('Network response was not ok');
    // }
    return (response)
    // const data = await response.json();
    console.log('in serverside page',date)
    // Do something with the data
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}
