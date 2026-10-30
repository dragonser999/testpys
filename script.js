document.addEventListener('DOMContentLoaded', function() {
 const inputImage = document.getElementById('inputImage');
 const inputNewImage = document.getElementById('inputNewImage');
 const previewImage = document.getElementById('previewImage');
 const previewNewImage = document.getElementById('previewNewImage');
 const processBtn = document.getElementById('processBtn');
 const finalImage = document.getElementById('finalImage');
 const resultArea = document.getElementById('resultArea');

 // ചിത്രം അപ്‌ലോഡ് ചെയ്യുമ്പോൾ പ്രീവ്യൂ കാണിക്കുക
 inputImage.addEventListener('change', function(e) {
 const file = e.target.files[0];
 if (file) {
 const reader = new FileReader();
 reader.onload = function(evt) {
 previewImage.innerHTML = `<img src="${evt.target.result}" alt="Preview">`;
 };
 reader.readAsDataURL(file);
 }
 });

 inputNewImage.addEventListener('change', function(e) {
 const file = e.target.files[0];
 if (file) {
 const reader = new FileReader();
 reader.onload = function(evt) {
 previewNewImage.innerHTML = `<img src="${evt.target.result}" alt="New Image Preview">`;
 };
 reader.readAsDataURL(file);
 }
 });

 processBtn.addEventListener('click', function() {
 if (!previewImage.innerHTML || !previewNewImage.innerHTML) {
 alert('ദയവായി രണ്ട് ചിത്രങ്ങളും തിരഞ്ഞെടുക്കുക.');
 return;
 }

 // ഇമേജുകൾ ബാക്ക്‌എൻഡിലേക്ക് അയയ്‌ക്കുക
 const formData = new FormData();
 formData.append('original_image', inputImage.files[0]);
 formData.append('new_image', inputNewImage.files[0]);

 fetch('http://localhost:5000/process', {
 method: 'POST',
 body: formData
 })
.then(response => response.json())
.then(data => {
 finalImage.src = data.result_url;
 resultArea.style.display = 'block';
 })
.catch(error => {
 console.error('Error:', error);
 alert('പ്രോസസ്സിംഗ് സമയത്ത് പിശക് സംഭവിച്ചു.');
 });
 });
});
