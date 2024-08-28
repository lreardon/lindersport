document.addEventListener("DOMContentLoaded", () => {
  const rememberedVariant = localStorage.getItem("rememberedVariant");
  console.log("rememberedVariant:", rememberedVariant);
  if (rememberedVariant) {
    const selector = `#variant-${rememberedVariant}.category__item`;

    const targetElement = document.querySelector(selector);
    console.log(`[TARGET] ${targetElement}`);

    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "auto" }); // or smooth
    }
  }
});
