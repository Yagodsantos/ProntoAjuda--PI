export function traduzirTexto(texto: string) {

  return texto
    .replace(/\bchicken\b/gi, "frango")
    .replace(/\bbeef\b/gi, "carne bovina")
    .replace(/\bpork\b/gi, "porco")
    .replace(/\bsalt\b/gi, "sal")
    .replace(/\bpepper\b/gi, "pimenta")
    .replace(/\bonion\b/gi, "cebola")
    .replace(/\bgarlic\b/gi, "alho");
}

export function extrairIngredientes(meal: any) {
  const ingredientes: string[] = [];
  for (let i = 1; i <= 20; i++) {
    const nome = meal[`strIngredient${i}`];
    const medida = meal[`strMeasure${i}`];
    if (nome && nome.trim() !== "") {
      ingredientes.push(`${traduzirTexto(nome)} - ${medida}`);
    }
  }
  return ingredientes;
}

export function traduzirReceita(meal: any) {
  return {
    id: meal.idMeal,
    nome: meal.strMeal,
    categoria: traduzirTexto(meal.strCategory),
    area: traduzirTexto(meal.strArea),
    instrucoes: traduzirTexto(meal.strInstructions),
    ingredientes: extrairIngredientes(meal),
    imagem: meal.strMealThumb,
  };
}
