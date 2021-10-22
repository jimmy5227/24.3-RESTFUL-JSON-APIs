async function getCupcakes() {
  const response = await axios.get("/api/cupcakes");

  for (let i = 0; i < response.data.cupcakes.length; i++) {
    let newCupcake = $(generateCupcakeHTML(response.data.cupcakes[i]));
    $("ul").append(newCupcake);
  }
}

function generateCupcakeHTML(cupcake) {
  return `
      <div data-cupcake-id=${cupcake.id}>
        <li>
          ${cupcake.flavor} / ${cupcake.size} / ${cupcake.rating}
          <button class="delete-button">X</button>
        </li>
        <img class="Cupcake-img"
              src="${cupcake.image}"
              alt="(no image provided)">
      </div>
    `;
}

$("form").on("submit", async function (event) {
  event.preventDefault();

  let flavor = $("#flavor").val();
  let rating = $("#rating").val();
  let size = $("#size").val();
  let image = $("#image").val();

  const response = await axios.post("/api/cupcakes", {
    flavor,
    rating,
    size,
    image,
  });

  let newCupcake = $(generateCupcakeHTML(response.data.cupcake));
  $("ul").append(newCupcake);
  $("form").trigger("reset");
});

$("ul").on("click", ".delete-button", async function (event) {
  event.preventDefault();

  let $cupcake = $(event.target).closest("div");
  let cupcakeId = $cupcake.attr("data-cupcake-id");

  await axios.delete(`/api/cupcakes/${cupcakeId}`);
  $cupcake.remove();
});

getCupcakes();
