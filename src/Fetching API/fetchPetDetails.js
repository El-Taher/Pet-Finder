export default async function fetchPetDetails({ queryKey }) {
  const id = queryKey[1];
  const res = await fetch(`https://pets-v2.dev-apis.com/pets?id=${id}`);

  if (!res.ok) {
    throw new Error(`details/${id} fetch not ok`);
  }

  const json = await res.json();
  return json;
}
