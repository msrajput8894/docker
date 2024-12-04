// Fetch the default user profile
fetch("/users")
  .then((response) => response.json())
  .then((data) => {
    document.getElementById("name").value = data.name;
    document.getElementById("interests").value = data.interests;
    document.getElementById("role").value = data.role;
  })
  .catch((error) => console.error("Error:", error));

// Enable editing
document.getElementById("editButton").addEventListener("click", () => {
  document.getElementById("name").disabled = false;
  document.getElementById("interests").disabled = false;
  document.getElementById("role").disabled = false;

  document.getElementById("editButton").style.display = "none";
  document.getElementById("saveButton").style.display = "inline";
});

// Save changes
document.getElementById("profileForm").addEventListener("submit", (event) => {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const interests = document.getElementById("interests").value;
  const role = document.getElementById("role").value;

  fetch("/users", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, interests, role }),
  })
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("name").disabled = true;
      document.getElementById("interests").disabled = true;
      document.getElementById("role").disabled = true;

      document.getElementById("editButton").style.display = "inline";
      document.getElementById("saveButton").style.display = "none";
      alert("Profile updated successfully!");
    })
    .catch((error) => console.error("Error:", error));
});
