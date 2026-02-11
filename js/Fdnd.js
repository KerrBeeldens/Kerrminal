/*
Modified from: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
*/

export async function getStudentData(id) {
  const url = "https://fdnd.directus.app/items/person/" + id;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();
    return result.data;
  } catch (error) {
    throw new Error(`Could not fetch data: ${error.message}`);
  }
}
