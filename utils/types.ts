export type Ingrediente = {
  nome: string;
  medida: string;
};

export type Receita = {
  id: string;
  nome: string;
  categoria: string;
  area: string;
  instrucoes: string;
  ingredientes: string[];
  imagem: string;
};

