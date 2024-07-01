import { GMU_URL } from '$env/static/private';
const gmuUrl = GMU_URL;

export async function handleDateSubmission(date: string) {
    const url = new URL(`${gmuUrl}/appointment-schedules/gghn/set-reminders/date/${date}`);
    // url.searchParams.append('date', date);

  try {
    const response = await fetch(url.toString(), {
      method: 'POST'
    });

    // if (response.headers.get('Content-Type') != 'application/json'){
    //     throw new Error ("Received non-JSON response")
    // }

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return (response)
    // const data = await response.json();
    console.log('in serverside page',date)
    // Do something with the data
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}
