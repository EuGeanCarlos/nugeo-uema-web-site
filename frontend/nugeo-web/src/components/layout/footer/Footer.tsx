import {
  ArrowUp,
  ExternalLink,
  MapPin,
  Phone,
} from "lucide-react";

import nugeoLogo from "../../../assets/brand/logo-branca.svg";

import {
  footerColumns,
  footerContact,
  institutionalFooterLinks,
  type FooterLink,
} from "../../../data/footer";

interface FooterNavigationLinkProps {
  link: FooterLink;
}

function FooterNavigationLink({
  link,
}: FooterNavigationLinkProps) {
  const externalProps = link.external
    ? {
        target: "_blank" as const,
        rel: "noreferrer",
      }
    : {};

  return (
    <a
      href={link.href}
      {...externalProps}
      className={[
        "group inline-flex w-fit items-center gap-2",
        "text-sm leading-6 text-white/60",
        "transition-colors duration-200",
        "hover:text-white",
        "focus-visible:rounded-sm focus-visible:outline-2",
        "focus-visible:outline-offset-4",
        "focus-visible:outline-emerald-300",
      ].join(" ")}
    >
      <span>{link.label}</span>

      {link.external && (
        <ExternalLink
          aria-hidden="true"
          className="h-3.5 w-3.5 text-white/35 transition-colors group-hover:text-white"
          strokeWidth={1.8}
        />
      )}
    </a>
  );
}

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      id="contato"
      className="relative isolate overflow-hidden bg-nugeo-navy-950 text-white"
    >
      {/* Fundo científico discreto 
      <div
        aria-hidden="true"
        className={[
          "absolute inset-0 -z-20",
          "bg-[radial-gradient(circle_at_8%_10%,rgba(9,103,210,0.16),transparent_28%),radial-gradient(circle_at_92%_88%,rgba(24,184,139,0.12),transparent_30%)]",
        ].join(" ")}
      />

      <div
        aria-hidden="true"
        className={[
          "absolute inset-0 -z-10 opacity-[0.035]",
          "bg-[linear-gradient(rgba(255,255,255,0.8)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.8)_1px,transparent_1px)]",
          "bg-[size:72px_72px]",
        ].join(" ")}
      />*/}

      {/* Faixa superior */}
      

      {/* Conteúdo principal */}
      <div className="mx-auto w-full max-w-[1360px] px-6 py-16 sm:px-8 lg:px-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.25fr_2fr] lg:gap-20">
          {/* Marca e contato */}
          <div className="max-w-md">
            <a
              href="/"
              aria-label="NUGEO — Página inicial"
              className={[
                "inline-flex rounded-[5px]  p-3",
                "transition-opacity duration-200 hover:opacity-90",
                "focus-visible:outline-2",
                "focus-visible:outline-offset-4",
              ].join(" ")}
            >
              <img
                src={nugeoLogo}
                alt="NUGEO — Núcleo Geoambiental da UEMA"
                className="h-12 w-auto max-w-[300px] object-contain sm:h-14"
              />
            </a>

            <p className="mt-6 max-w-sm text-sm leading-7 text-white/60">
              Núcleo técnico-científico dedicado à pesquisa, ao
              monitoramento ambiental e à produção de informações sobre
              o clima, a água e o território do Maranhão.
            </p>

            <address className="mt-8 space-y-5 not-italic">
              <div className="flex items-start gap-3">
                <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-[5px] border border-white/10 bg-white/[0.05] text-emerald-300">
                  <MapPin
                    aria-hidden="true"
                    className="h-4.5 w-4.5"
                    strokeWidth={1.8}
                  />
                </span>

                <div>
                  <strong className="block text-sm font-semibold text-white">
                    {footerContact.campus}
                  </strong>

                  <span className="mt-1 block max-w-xs text-sm leading-6 text-white/55">
                    {footerContact.address}
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-[5px] border border-white/10 bg-white/[0.05] text-emerald-300">
                  <Phone
                    aria-hidden="true"
                    className="h-4.5 w-4.5"
                    strokeWidth={1.8}
                  />
                </span>

                <div>
                  <strong className="block text-sm font-semibold text-white">
                    Telefone institucional
                  </strong>

                  <a
                    href={footerContact.phoneHref}
                    className="mt-1 block text-sm text-white/55 transition-colors hover:text-white"
                  >
                    {footerContact.phone}
                  </a>
                </div>
              </div>
            </address>

            <a
              href={footerContact.uemaHref}
              target="_blank"
              rel="noreferrer"
              className={[
                "group mt-8 inline-flex items-center gap-2",
                "text-sm font-semibold text-white/75",
                "transition-colors hover:text-white",
                "focus-visible:rounded-sm focus-visible:outline-2",
                "focus-visible:outline-offset-4",
                "focus-visible:outline-emerald-300",
              ].join(" ")}
            >
              Portal da UEMA

              <ExternalLink
                aria-hidden="true"
                className="h-4 w-4 text-white/40 transition-colors group-hover:text-white"
                strokeWidth={1.8}
              />
            </a>
          </div>

          {/* Navegação */}
          <nav
            aria-label="Navegação do rodapé"
            className="grid gap-10 sm:grid-cols-2 xl:grid-cols-3"
          >
            {footerColumns.map((column) => (
              <div key={column.id}>
                <h3 className="text-sm font-bold tracking-[-0.01em] text-white">
                  {column.title}
                </h3>

                <span
                  aria-hidden="true"
                  className="mt-4 block h-px w-8 bg-emerald-300"
                />

                <ul className="mt-5 space-y-3">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <FooterNavigationLink link={link} />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>
      </div>

      {/* Barra inferior */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex w-full max-w-[1360px] flex-col gap-5 px-6 py-6 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-16">
          <p className="text-xs leading-5 text-white/45">
            © {currentYear} NUGEO — Núcleo Geoambiental da
            Universidade Estadual do Maranhão. Todos os direitos
            reservados.
          </p>

          <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
            <nav aria-label="Links legais">
              <ul className="flex flex-wrap items-center gap-x-5 gap-y-3">
                {institutionalFooterLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className={[
                        "text-xs text-white/45",
                        "transition-colors hover:text-white",
                        "focus-visible:rounded-sm focus-visible:outline-2",
                        "focus-visible:outline-offset-4",
                        "focus-visible:outline-emerald-300",
                      ].join(" ")}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <a
              href="#inicio"
              aria-label="Voltar ao início da página"
              className={[
                "group inline-flex h-10 w-10 shrink-0 items-center",
                "justify-center rounded-full border border-white/10",
                "bg-white/[0.04] text-white/60",
                "transition duration-200",
                "hover:border-white/20 hover:bg-white/10",
                "hover:text-white",
                "focus-visible:outline-2",
                "focus-visible:outline-offset-4",
                "focus-visible:outline-emerald-300",
              ].join(" ")}
            >
              <ArrowUp
                aria-hidden="true"
                className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5"
                strokeWidth={1.8}
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}