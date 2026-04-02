import React from "react";

const ArchLogo = ({
  className = "",
  lineClass = "stroke-[#2f2926]",
}: {
  className?: string;
  lineClass?: string;
}) => (
  <img
    src="/assets/Image/navada-custom-image.svg"
    alt="navada-logo"
    className={className}
  />
);

const Wordmark = ({
  dark = true,
  className = "",
}: {
  dark?: boolean;
  className?: string;
}) => (
  <div
    className={`tracking-[0.08em] font-light ${
      dark ? "text-[#181512]" : "text-white"
    } ${className}`}
    style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
  >
    NAVADA
  </div>
);

const FontPreview = ({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) => (
  <div>
    <h6 className="text-[14px] text-[#807a75]">{title}</h6>

    <div style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>
      <h3 className="mt-2 text-[18px] leading-[1.5] text-[#555555] md:text-[22px]">
        ABCDEFGHIJKLMNOPQRSTUVWXYZ
      </h3>
      <h4 className="mt-2 text-[16px] leading-[1.5] text-[#555555] md:text-[22px]">
        abcdefghijklmnopqrstuvwxyz
      </h4>
      <h5 className="mt-2 text-[14px] leading-[1.5] text-[#555555] md:text-[22px]">
        0123456789
      </h5>
    </div>
  </div>
);

const NavadaPage = () => {
  const images = {
    hero: "/assets/Image/navada-hero.png",
    tshirt: "/assets/Image/navada-img.png",
    lithograph: "/assets/Image/navada-gallery-img.png",
    cups: "/assets/Image/navada-gallery-img1.png",
    serve: "/assets/Image/navada-gallery-img3.png",
    menu: "/assets/Image/navada-gallery-img4.png",
  };

  return (
    <div className="min-h-screen  text-[#221d19]">
      {/* HERO */}
      <section className="w-full px-3 pt-3 sm:px-5 sm:pt-5">
        <div className="mx-auto container-xl">
          <section className="overflow-hidden rounded-[18px] bg-[#e8e2dc] shadow-[0_10px_40px_rgba(0,0,0,0.04)] sm:rounded-[22px]">
            <div className="grid lg:grid-cols-[1fr_1fr]">
              <div className="flex min-h-[360px] flex-col px-5 py-5 sm:px-8 sm:py-7 lg:min-h-[500px] lg:px-16 lg:py-6">
                <div className="flex flex-wrap items-center gap-2 text-[11px] text-[#7d7772]">
                  {/* <div className="w-[34px] sm:w-[38px]">
                    <ArchLogo className="h-auto w-full" lineClass="stroke-[#2b2622]" />
                    </div> */}
                  <span className="text-[22px] font-semibold text-[#000000]">
                    Work
                  </span>
                  <span className="h-3 w-px bg-[#bcb5af]" />
                  <span className="text-[14px] text-[#000000] italic">
                    Copyright, Branding, &amp; Package Design
                  </span>
                </div>

                <div className="my-auto pt-10 sm:pt-12 lg:pl-0">
                  <div className="mb-6 w-[70px] sm:w-[82px]">
                    <ArchLogo className="h-auto w-full" />
                  </div>

                  <h1
                    className="text-[36px] leading-[1.08] tracking-[-0.03em] text-[#1d1815] sm:text-[44px] lg:text-[48px]"
                    style={{
                      fontFamily: "Georgia, 'Times New Roman', serif",
                    }}
                  >
                    A brand woven with tradition and heritage.
                  </h1>

                  <p className="mt-6 text-[13px] leading-6 text-[#6f6964] sm:text-[16px]">
                    A quiet gratitude for being there at the beginning, shaping
                    both the name and the visual soul of the coffee brand.
                  </p>
                </div>
              </div>

              <div className="relative min-h-[280px] lg:min-h-[500px]">
                <img
                  src={images.hero}
                  alt="Navada coffee packaging"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </section>
        </div>
      </section>


      

      {/* NAME + MEANING */}
      <section className="w-full px-3 py-12 sm:px-5 sm:py-16 lg:py-28">
        <div className="mx-auto container-xl">
          <section className="grid gap-10 px-1 md:grid-cols-2 md:items-center lg:px-16">
            <div className="text-[20px] leading-8 text-[#6f6964]">
              <p>
                'NAVADA' - meaning: noun, feminine (Gen. sg. navade; pl. Nom.
                navade, Gen. navada) archaic: a custom; a way of life, work, or
                behavior that has become established within a human community and
                is transmitted from generation to generation. The term was
                accepted by the client as a brand name.
              </p>
            </div>

            <div className="flex items-center justify-start md:justify-center">
              {/* <Wordmark className="text-[54px] sm:text-[70px] lg:text-[78px]" /> */}
              <img
                src="/assets/Image/navada.svg"
                className="mx-auto w-[200px] md:w-[50%]"
                alt="navada"
              />
            </div>
          </section>
        </div>
      </section>

      {/* SHIRT + STORY */}
      <section className="w-full px-3 sm:px-5">
        <div className="mx-auto container-xl">
          <section className="grid gap-4 lg:grid-cols-[1fr_1fr]">
            <div className="overflow-hidden rounded-[18px] bg-white shadow-[0_8px_28px_rgba(0,0,0,0.03)] sm:rounded-[20px]">
              <img
                src={images.tshirt}
                alt="Navada t-shirt branding"
                className="h-full w-full object-cover"
              />
            </div>

            <div className="grid gap-4">
              <div className="rounded-[18px] bg-[#e8e2dc] px-6 py-8 shadow-[0_8px_28px_rgba(0,0,0,0.02)] sm:rounded-[20px] sm:px-8 sm:py-10 lg:min-h-[274px] lg:px-12 lg:py-12">
                <p className="text-[14px] leading-7 text-[#6f6964] sm:text-[18px]">
                  The custom illustration 'Vrata Samobora' (The Gate of Samobor)
                  by NAVADA brings together recognizable motifs of Samobor in a
                  single composition. An arched gateway opens onto views of the
                  Secession-style concrete bridge over the Gradna creek, the
                  Church of St. Anastasia, and the fountain from King Tomislav
                  Square, forming a visual narrative that connects tradition
                  with the town's architectural symbols.
                </p>
              </div>

              <div className="flex justify-end">
                <img
                  src="/assets/Image/samobar-logo.svg"
                  alt="navada-logo"
                  className="w-[200px]"
                />
              </div>
            </div>
          </section>
        </div>
      </section>

      {/* FONTS */}
      <section className="w-full px-3 pt-10 sm:px-5 sm:pt-14 lg:pt-16">
        <div className="mx-auto container-xl">
          <section>
            <h2
              className="text-[34px] leading-none text-[#1e1a17] sm:text-[38px]"
              style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
            >
              Fonts:
            </h2>

            <div className="mt-6 grid gap-6 rounded-[18px] bg-transparent sm:mt-8 lg:grid-cols-[1fr_1px_1fr] lg:gap-8">
              <FontPreview
                title="Primary Typography: Bangla MN - Regular - Font"
                subtitle=""
              />

              <div className="hidden bg-[#cfc8c2] lg:block" />

              <FontPreview
                title="Secondary Typography: Noto Serif - Regular - Font"
                subtitle=""
              />
            </div>
          </section>
        </div>
      </section>

      {/* BOTTOM GALLERY */}
      <section className="w-full px-3 pt-24 sm:px-5">
        <div className="mx-auto container-xl">
          <section>
            <h6 className="mb-2 text-[14px] text-[#555555]">
              Julie Huebn: 'Samobor after a Photograph', lithograph, 1860 (from
              the I. Sudnik collection)
            </h6>

            <div className="grid gap-4 lg:grid-cols-[1fr_1fr]">
              <div className="grid gap-4">
                <div>
                  <div className="overflow-hidden rounded-[18px] bg-white shadow-[0_8px_28px_rgba(0,0,0,0.03)] sm:rounded-[20px]">
                    <img
                      src={images.lithograph}
                      alt="Samobor lithograph"
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>

                {/* <div className="overflow-hidden rounded-[18px] bg-[#e8e2dc] px-5 py-6 shadow-[0_8px_28px_rgba(0,0,0,0.03)] sm:rounded-[20px] sm:px-6 sm:py-7">
              <div className="text-center">
                <Wordmark className="text-[46px] sm:text-[58px] lg:text-[68px]" />
              </div>

              <img
                src={images.cups}
                alt="Navada cups branding presentation"
                className="mx-auto mt-5 h-auto w-full max-w-[520px] object-contain"
              />

              <div className="mt-5 text-center">
                <Wordmark className="text-[22px] sm:text-[26px]" />
                <p className="mx-auto mt-2 max-w-[220px] text-[11px] leading-5 text-[#6f6964]">
                  A visual identity built on memory, place, and everyday ritual.
                </p>
              </div>
            </div> */}

                <div>
                  <img
                    src="/assets/Image/navada-gallery-img1.png"
                    alt="Navada Image"
                  />
                </div>
              </div>

              <div className="grid gap-4">
                <div className="overflow-hidden rounded-[18px] bg-white shadow-[0_8px_28px_rgba(0,0,0,0.03)] sm:rounded-[20px]">
                  <img
                    src={images.serve}
                    alt="Navada takeaway cup in cafe"
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="w-full sm:max-w-[290px]">
                  <div className="overflow-hidden rounded-[18px] bg-white shadow-[0_8px_28px_rgba(0,0,0,0.03)] sm:rounded-[20px]">
                    <img
                      src={images.menu}
                      alt="Navada menu card"
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </section>

      <section className="w-full px-3 sm:px-5">
        <div className="mx-auto container-xl">
          <div className="h-12 sm:h-16 lg:h-24" />
        </div>
      </section>
    </div>
  );
};

export default NavadaPage;