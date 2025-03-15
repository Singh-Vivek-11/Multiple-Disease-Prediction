const diseaseFields = {
    "diabetes": ["Pregnancies", "Glucose", "Blood Pressure", "Skin Thickness", "Insulin", "BMI", "Diabetes Pedigree Function", "Age"],
    "heart_disease": ["Age", "Sex (0=Female, 1=Male)", "Chest Pain Type", "Resting Blood Pressure", "Serum Cholesterol", "Fasting Blood Sugar", "Resting ECG", "Max Heart Rate", "Exercise Induced Angina", "ST Depression", "Slope", "Major Vessels", "Thalassemia"],
    "parkinsons": ["MDVP:Fo(Hz)", "MDVP:Fhi(Hz)", "MDVP:Flo(Hz)", "Jitter(%)", "Jitter(Abs)", "RAP", "PPQ", "DDP", "Shimmer", "Shimmer(dB)", "APQ3", "APQ5", "MDVP:APQ", "Shimmer:DDA", "NHR", "HNR", "RPDE", "DFA", "Spread1", "Spread2", "D2", "PPE"],
    "breast_cancer": ["Mean Radius", "Mean Texture", "Mean Perimeter", "Mean Area", "Mean Smoothness", "Mean Compactness", "Mean Concavity", "Mean Concave Points", "Mean Symmetry", "Mean Fractal Dimension"]
};

document.getElementById("diseaseSelect").addEventListener("change", function() {
    generateFields(this.value);
});

function generateFields(disease) {
    let fields = diseaseFields[disease];
    let inputFieldsDiv = document.getElementById("inputFields");
    inputFieldsDiv.innerHTML = "";

    fields.forEach(field => {
        let div = document.createElement("div");
        div.classList.add("mb-3");
        div.innerHTML = `
            <label>${field}:</label>
            <input type="number" class="form-control" name="feature" placeholder="Enter ${field}">
        `;
        inputFieldsDiv.appendChild(div);
    });
}

function predictDisease() {
    let disease = document.getElementById("diseaseSelect").value;
    let inputs = document.querySelectorAll("#inputFields input");
    let features = Array.from(inputs).map(input => parseFloat(input.value) || 0);

    fetch("/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ disease_type: disease, features: features })
    })
    .then(response => response.json())
    .then(data => {
        let resultBox = document.getElementById("resultBox");
        document.getElementById("predictionResult").innerText = `🩺 Prediction: ${data.prediction}`;
        resultBox.classList.add("show", "animate__animated", "animate__fadeIn");
    })
    .catch(error => console.error("Error:", error));
}

// Initialize fields on page load
generateFields(document.getElementById("diseaseSelect").value);