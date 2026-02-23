import { SmoothScroll } from "@/components/smooth-scroll";
import { Navigation } from "@/components/sections/navigation";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Services } from "@/components/sections/services";
import { Process } from "@/components/sections/process";
import { Stack } from "@/components/sections/stack";
import { Projects } from "@/components/sections/projects";
import { Testimonials } from "@/components/sections/testimonials";
import { Faq } from "@/components/sections/faq";
import { CtaBanner } from "@/components/sections/cta-banner";
import { Contact, Footer } from "@/components/sections/contact";
import { I18nProvider } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";
import { CustomCursor } from "@/components/custom-cursor";
import { cookies } from "next/headers";

export default async function Home() {
  const cookieStore = await cookies();
  const localeCookie = cookieStore.get("locale")?.value;
  const initialLocale: Locale =
    localeCookie === "en" || localeCookie === "ru" ? localeCookie : "ru";

  return (
    <I18nProvider initialLocale={initialLocale}>
      <CustomCursor />
      <SmoothScroll>
        <Navigation />
        <main>
          <Hero />
          <About />
          <Services />
          <Process />
          <Projects />
          <Testimonials />
          <Stack />
          <Faq />
          <CtaBanner />
          <Contact />
        </main>
        <Footer />
      </SmoothScroll>
    </I18nProvider>
  );
}
