let reviews = [
    { client: "John Doe", rating: 5, review: "Great service!", status: "Pending" },
    { client: "Jane Smith", rating: 4, review: "Nice haircut, but wait time was long.", status: "Pending" }
];

function loadReviews() {
    const tableBody = document.getElementById("reviewTableBody");
    tableBody.innerHTML = "";

    reviews.forEach((r, index) => {
        let row = `
            <tr>
                <td>${r.client}</td>
                <td>${"⭐".repeat(r.rating)}</td>
                <td>${r.review}</td>
                <td class="review-status-${r.status.toLowerCase()}">${r.status}</td>
                <td>
                    ${r.status === "Pending" ? `<button class="btn-approve" onclick="updateReviewStatus(${index}, 'Approved')">Approve</button>` : ""}
                    ${r.status !== "Hidden" ? `<button class="btn-hide" onclick="updateReviewStatus(${index}, 'Hidden')">Hide</button>` : ""}
                    <button class="btn-delete" onclick="deleteReview(${index})">Delete</button>
                </td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
}

function updateReviewStatus(index, status) {
    reviews[index].status = status;
    loadReviews();
}

function deleteReview(index) {
    if (confirm("Are you sure you want to delete this review?")) {
        reviews.splice(index, 1);
        loadReviews();
    }
}

// Load reviews on page load
loadReviews();
