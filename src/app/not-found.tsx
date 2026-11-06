import Link from "next/link";

export default function NotFound() {
  return (
    <main className="container not-found">
      <h1>Página não encontrada</h1>
      <p>Conheça os apartamentos disponíveis nesta seleção.</p>
      <Link className="button button-blue" href="/">Voltar ao início <span aria-hidden="true">↗</span></Link>
    </main>
  );
}
