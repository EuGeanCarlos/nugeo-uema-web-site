import nugeoLogo from "../../../assets/brand/nugeo-logo.svg";

import { useEffect, useState } from "react";
import {
  ArrowRight,
  ChevronDown,
  ExternalLink,
  Menu,
  Search,
  X,
} from "lucide-react";

import {
  laboratoryNavigation,
  mainNavigation,
} from "../../../data/navigation";

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileLabsOpen, setIsMobileLabsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  function closeMobileMenu() {
    setIsMobileMenuOpen(false);
    setIsMobileLabsOpen(false);
  }

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsMobileMenuOpen(false);
        setIsMobileLabsOpen(false);
        setIsSearchOpen(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <a
        href="#conteudo-principal"
        className="fixed left-4 top-4 z-[100] -translate-y-24 rounded-lg bg-white px-4 py-3 text-sm font-semibold text-slate-950 shadow-lg transition-transform focus:translate-y-0"
      >
        Ir para o conteúdo principal
      </a>

      <header className="sticky top-0 z-50 w-full">
        {/* Barra institucional */}
        <div className="border-b border-white/10 bg-nugeo-navy-950 text-white">
          <div className="mx-auto flex min-h-9 w-full max-w-[1360px] items-center justify-between px-6 sm:px-8 lg:px-16">
            <p className="text-[0.68rem] font-medium tracking-[0.06em] text-white/70 sm:text-xs">
              Universidade Estadual do Maranhão
            </p>

            <nav
              aria-label="Links institucionais"
              className="hidden items-center gap-6 sm:flex"
            >
              <a
                href="https://www.uema.br"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-[0.7rem] font-medium text-white/70 transition-colors hover:text-white"
              >
                Portal UEMA
                <ExternalLink aria-hidden="true" className="h-3 w-3" />
              </a>

              <a
                href="#contato"
                className="text-[0.7rem] font-medium text-white/70 transition-colors hover:text-white"
              >
                Contato
              </a>

              <a
                href="#acessibilidade"
                className="text-[0.7rem] font-medium text-white/70 transition-colors hover:text-white"
              >
                Acessibilidade
              </a>
            </nav>
          </div>
        </div>

        {/* Navegação principal */}
        <div className="border-b border-slate-200/90 bg-white/95 shadow-[0_4px_24px_rgba(15,35,65,0.05)] backdrop-blur-xl">
          <div className="mx-auto flex min-h-[76px] w-full max-w-[1360px] items-center justify-between gap-8 px-6 sm:px-8 lg:px-16">
            {/* Marca */}
            <img
                    src={nugeoLogo}
                    alt="NUGEO — Núcleo Geoambiental da UEMA"
                    className="h-11 w-auto max-w-[190px] object-contain sm:h-12 sm:max-w-[220px] lg:h-[90px]"
                    />

            {/* Navegação desktop */}
            <nav
              aria-label="Navegação principal"
              className="hidden flex-1 items-center justify-center xl:flex"
            >
              <ul className="flex items-center gap-1">
                {mainNavigation.slice(0, 2).map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className="inline-flex min-h-11 items-center rounded-lg px-3.5 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-50 hover:text-nugeo-blue-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-nugeo-blue-600"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}

                {/* Menu dos laboratórios */}
                <li>
                  <details className="group relative">
                    <summary className="flex min-h-11 cursor-pointer list-none items-center gap-1.5 rounded-lg px-3.5 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-50 hover:text-nugeo-blue-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-nugeo-blue-600 [&::-webkit-details-marker]:hidden">
                      Laboratórios

                      <ChevronDown
                        aria-hidden="true"
                        className="h-4 w-4 transition-transform duration-200 group-open:rotate-180"
                      />
                    </summary>

                    <div className="invisible absolute left-1/2 top-[calc(100%+14px)] w-[620px] -translate-x-1/2 translate-y-2 rounded-2xl border border-slate-200 bg-white p-3 opacity-0 shadow-[0_22px_60px_rgba(15,35,65,0.16)] transition duration-200 group-open:visible group-open:translate-y-0 group-open:opacity-100">
                      <div className="grid grid-cols-2 gap-1">
                        {laboratoryNavigation.map((laboratory) => (
                          <a
                            key={laboratory.acronym}
                            href={laboratory.href}
                            className="group/item flex gap-4 rounded-xl p-4 transition-colors hover:bg-slate-50"
                          >
                            <span className="flex h-10 min-w-14 items-center justify-center rounded-lg border border-emerald-100 bg-emerald-50 px-2 text-[0.68rem] font-bold text-nugeo-green-600">
                              {laboratory.acronym}
                            </span>

                            <span className="min-w-0">
                              <strong className="block text-sm font-semibold text-slate-900 transition-colors group-hover/item:text-nugeo-blue-600">
                                {laboratory.label}
                              </strong>

                              <span className="mt-1 block text-xs leading-5 text-slate-500">
                                {laboratory.description}
                              </span>
                            </span>
                          </a>
                        ))}
                      </div>

                      <a
                        href="#laboratorios"
                        className="mt-2 flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-nugeo-navy-950 transition-colors hover:border-blue-200 hover:bg-blue-50 hover:text-nugeo-blue-600"
                      >
                        Ver todos os laboratórios

                        <ArrowRight aria-hidden="true" className="h-4 w-4" />
                      </a>
                    </div>
                  </details>
                </li>

                {mainNavigation.slice(2).map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className="inline-flex min-h-11 items-center rounded-lg px-3.5 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-50 hover:text-nugeo-blue-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-nugeo-blue-600"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Ações desktop */}
            <div className="hidden shrink-0 items-center gap-2 md:flex">
              <button
                type="button"
                onClick={() => setIsSearchOpen((current) => !current)}
                aria-label={
                  isSearchOpen
                    ? "Fechar pesquisa"
                    : "Abrir pesquisa no portal"
                }
                aria-expanded={isSearchOpen}
                className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition-colors hover:border-blue-200 hover:bg-blue-50 hover:text-nugeo-blue-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-nugeo-blue-600"
              >
                {isSearchOpen ? (
                  <X aria-hidden="true" className="h-5 w-5" />
                ) : (
                  <Search aria-hidden="true" className="h-5 w-5" />
                )}
              </button>

              <a
                href="#boletins"
                className="hidden min-h-11 items-center justify-center rounded-lg bg-nugeo-blue-600 px-5 text-sm font-semibold text-white transition-colors hover:bg-nugeo-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-nugeo-blue-600 lg:inline-flex"
              >
                Dados e boletins
              </a>
            </div>

            {/* Botão mobile */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((current) => !current)}
              aria-label={
                isMobileMenuOpen
                  ? "Fechar menu principal"
                  : "Abrir menu principal"
              }
              aria-controls="mobile-navigation"
              aria-expanded={isMobileMenuOpen}
              className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-slate-200 text-nugeo-navy-950 transition-colors hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-nugeo-blue-600 xl:hidden"
            >
              {isMobileMenuOpen ? (
                <X aria-hidden="true" className="h-5 w-5" />
              ) : (
                <Menu aria-hidden="true" className="h-5 w-5" />
              )}
            </button>
          </div>

          {/* Campo de pesquisa */}
          {isSearchOpen && (
            <div className="border-t border-slate-200 bg-white">
              <form
                role="search"
                className="mx-auto flex w-full max-w-[1360px] items-center gap-3 px-6 py-4 sm:px-8 lg:px-16"
                onSubmit={(event) => event.preventDefault()}
              >
                <label htmlFor="portal-search" className="sr-only">
                  Pesquisar no portal do NUGEO
                </label>

                <div className="relative flex-1">
                  <Search
                    aria-hidden="true"
                    className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    id="portal-search"
                    name="search"
                    type="search"
                    autoFocus
                    placeholder="Pesquisar boletins, projetos, notícias e publicações"
                    className="h-12 w-full rounded-xl border border-slate-300 bg-slate-50 pl-12 pr-4 text-sm text-slate-900 outline-none transition focus:border-nugeo-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100"
                  />
                </div>

                <button
                  type="submit"
                  className="hidden h-12 items-center justify-center rounded-[5px] bg-nugeo-blue-600 px-6 text-sm font-semibold text-white transition-colors hover:bg-nugeo-blue-500 sm:inline-flex"
                >
                  Pesquisar
                </button>
              </form>
            </div>
          )}
        </div>

        {/* Menu mobile */}
        {isMobileMenuOpen && (
          <div
            id="mobile-navigation"
            className="fixed inset-x-0 bottom-0 top-[112px] overflow-y-auto border-t border-slate-200 bg-white xl:hidden"
          >
            <nav
              aria-label="Navegação principal para dispositivos móveis"
              className="mx-auto w-full max-w-[1360px] px-6 py-6 sm:px-8"
            >
              <ul className="space-y-1">
                {mainNavigation.slice(0, 2).map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      onClick={closeMobileMenu}
                      className="flex min-h-12 items-center rounded-xl px-4 text-base font-semibold text-slate-700 transition-colors hover:bg-slate-50 hover:text-nugeo-blue-600"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}

                <li className="border-y border-slate-200 py-2">
                  <button
                    type="button"
                    onClick={() =>
                      setIsMobileLabsOpen((current) => !current)
                    }
                    aria-expanded={isMobileLabsOpen}
                    className="flex min-h-12 w-full items-center justify-between rounded-xl px-4 text-left text-base font-semibold text-slate-700 transition-colors hover:bg-slate-50"
                  >
                    Laboratórios

                    <ChevronDown
                      aria-hidden="true"
                      className={[
                        "h-5 w-5 transition-transform duration-200",
                        isMobileLabsOpen ? "rotate-180" : "",
                      ].join(" ")}
                    />
                  </button>

                  {isMobileLabsOpen && (
                    <ul className="mt-1 space-y-1 px-2 pb-2">
                      {laboratoryNavigation.map((laboratory) => (
                        <li key={laboratory.acronym}>
                          <a
                            href={laboratory.href}
                            onClick={closeMobileMenu}
                            className="flex gap-3 rounded-xl px-3 py-3 transition-colors hover:bg-slate-50"
                          >
                            <span className="flex h-9 min-w-14 items-center justify-center rounded-lg bg-emerald-50 px-2 text-[0.65rem] font-bold text-nugeo-green-600">
                              {laboratory.acronym}
                            </span>

                            <span>
                              <strong className="block text-sm font-semibold text-slate-800">
                                {laboratory.label}
                              </strong>

                              <span className="mt-0.5 block text-xs leading-5 text-slate-500">
                                {laboratory.description}
                              </span>
                            </span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>

                {mainNavigation.slice(2).map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      onClick={closeMobileMenu}
                      className="flex min-h-12 items-center rounded-xl px-4 text-base font-semibold text-slate-700 transition-colors hover:bg-slate-50 hover:text-nugeo-blue-600"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>

              <div className="mt-8 grid gap-3">
                <a
                  href="#boletins"
                  onClick={closeMobileMenu}
                  className="flex min-h-12 items-center justify-center rounded-xl bg-nugeo-blue-600 px-5 text-sm font-semibold text-white"
                >
                  Acessar dados e boletins
                </a>

                <button
                  type="button"
                  onClick={() => {
                    closeMobileMenu();
                    setIsSearchOpen(true);
                  }}
                  className="flex min-h-12 items-center justify-center gap-2 rounded-xl border border-slate-300 px-5 text-sm font-semibold text-slate-700"
                >
                  <Search aria-hidden="true" className="h-4 w-4" />
                  Pesquisar no portal
                </button>
              </div>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}