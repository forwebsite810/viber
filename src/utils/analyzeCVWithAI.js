export async function analyzeCVFile(file) {
  const formData = new FormData();
  formData.append("cv", file);

  const res = await fetch("http://localhost:5000/api/analyze-cv", {
    method: "POST",
    body: formData,
  });

  if (!res.ok) throw new Error(`Server returned ${res.status}`);
  return res.json(); // { parsed, excerpt }
}
