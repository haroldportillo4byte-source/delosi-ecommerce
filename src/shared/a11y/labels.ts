export function formatProductRatingLabel(rate: number, count: number): string {
  return `Calificación ${rate.toFixed(1)} de 5, basada en ${count} reseñas`;
}

export function formatCartQuantityControlLabel(action: "add" | "remove", productTitle: string): string {
  return action === "add" ? `Agregar uno de ${productTitle}` : `Quitar uno de ${productTitle}`;
}
